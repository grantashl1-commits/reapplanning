# T028 — Payment Gateway Testing Plan
**Sport Waikato — Survive the Reap: Season 1**
**Owner:** Dev Team | **Due:** 2026-07-01 | **Priority:** Critical
**Stack:** Stripe (subscriptions), Supabase Edge Functions, React/TypeScript frontend

---

## Table of Contents

1. [Overview and Objectives](#1-overview-and-objectives)
2. [Test Environment Setup](#2-test-environment-setup)
3. [Test Case Matrix](#3-test-case-matrix)
4. [Stripe Webhook Event Checklist](#4-stripe-webhook-event-checklist)
5. [Acceptance Criteria — Go/No-Go](#5-acceptance-criteria--gono-go)
6. [Regression Test Schedule](#6-regression-test-schedule)
7. [Defect Management](#7-defect-management)
8. [Sign-Off](#8-sign-off)

---

## 1. Overview and Objectives

### Purpose

This test plan defines the complete end-to-end testing strategy for the Stripe $13/month subscription integration for Survive the Reap Season 1. All test scenarios must pass before the Stripe account is switched to production (live) mode, and before public registration opens.

### Scope

| In Scope | Out of Scope |
|---|---|
| Stripe Checkout / Payment Links subscription creation | Stripe Connect (not used) |
| Stripe Customer Portal | Apple Pay / Google Pay wallet testing (handled by Stripe; not custom code) |
| Webhook delivery and processing (Supabase Edge Function: `stripe-webhook`) | Stripe Billing invoicing edge cases (tested by Stripe) |
| Subscription metadata (participant_id, season_id) | NZ GST calculations (Sport Waikato's accounting system, not in scope for dev) |
| Admin refund via `process-refund` Edge Function | Stripe Radar fraud scoring (Stripe managed) |
| Stripe dunning / failed payment retry | |
| 3D Secure authentication flows | |
| Chargeback simulation | |
| Customer portal subscription management | |

### Test Principles

- All payment testing uses **Stripe Test Mode** exclusively until production go/no-go is confirmed.
- No real payment cards are used at any point during testing.
- Test environment uses a dedicated Stripe test API key (separate from production key).
- Stripe webhook signing secret for test environment is separate from production.
- All webhook processing is via the `stripe-webhook` Supabase Edge Function; tests confirm the function sets `paid_at` correctly in the `participants` or `subscriptions` table.

---

## 2. Test Environment Setup

### 2.1 Stripe Test Mode Configuration

```
Environment:   Stripe Test Mode
Dashboard URL: https://dashboard.stripe.com/test/
Test API Key:  sk_test_[stored in Supabase secrets — never in codebase]
Publishable:   pk_test_[stored in frontend .env.test — never in .env.production]
Webhook Secret: whsec_test_[stored in Supabase secrets]
Webhook URL:   https://[staging-project-ref].supabase.co/functions/v1/stripe-webhook
```

**Checklist before starting tests:**
- [ ] Stripe test mode is active (dashboard shows "TEST DATA" banner in orange)
- [ ] Supabase staging project is active (separate from production project)
- [ ] `STRIPE_SECRET_KEY` secret in Supabase staging = `sk_test_...` value
- [ ] `STRIPE_WEBHOOK_SECRET` secret in Supabase staging = `whsec_test_...` value
- [ ] Frontend `VITE_STRIPE_PUBLISHABLE_KEY` = `pk_test_...` value
- [ ] Product ID in Stripe test mode matches `STRIPE_PRODUCT_ID` in Supabase config
- [ ] Price ID ($13/month recurring) in test mode matches `STRIPE_PRICE_ID` in Supabase config
- [ ] Stripe CLI installed locally for webhook forwarding during local testing: `stripe listen --forward-to localhost:54321/functions/v1/stripe-webhook`
- [ ] Supabase staging database is freshly seeded with test data

### 2.2 Stripe Test Card Numbers

Use these standard Stripe test cards. Full list: https://stripe.com/docs/testing#cards

| Card Number | Brand | Scenario |
|---|---|---|
| `4242 4242 4242 4242` | Visa | Successful payment, no authentication required |
| `4000 0025 0000 3155` | Visa | Requires 3D Secure authentication |
| `4000 0000 0000 9995` | Visa | Declined — insufficient funds |
| `4000 0000 0000 0069` | Visa | Declined — expired card |
| `4000 0000 0000 0002` | Visa | Declined — generic decline |
| `4100 0000 0000 0019` | Visa | Declined — stolen card (blocked by Radar) |
| `4000 0000 0000 3220` | Visa | 3DS2 required — authenticated |
| `4000 0000 0000 3063` | Visa | 3DS2 — authentication failed |
| `5555 5555 5555 4444` | Mastercard | Successful payment |
| `6011 1111 1111 1117` | Discover | Successful payment |

**Test expiry date:** Any future date (e.g., `12/29`)
**Test CVC:** Any 3-digit number (e.g., `123`)
**Test postal code:** Any (e.g., `0001`)

### 2.3 Test User Accounts

Create the following test participants in the Supabase staging database before beginning testing:

| Test User ID | Name | Email | Scenario |
|---|---|---|---|
| test-user-001 | Alex Test | alex.test@reap-testing.nz | Primary happy path user |
| test-user-002 | Briar Test | briar.test@reap-testing.nz | Cancellation / reactivation |
| test-user-003 | Casey Test | casey.test@reap-testing.nz | Refund scenario |
| test-user-004 | Dana Test | dana.test@reap-testing.nz | Failed payment / dunning |
| test-user-005 | Eli Test | eli.test@reap-testing.nz | Duplicate subscription prevention |
| test-admin-001 | Admin User | admin@reap-testing.nz | Admin refund testing (must be in admin_users table) |

---

## 3. Test Case Matrix

### Key

- **ID:** Unique test case identifier
- **Preconditions:** State that must be true before executing the test
- **Steps:** Sequential actions to perform
- **Expected Result:** What must happen for the test to pass
- **Pass/Fail:** To be completed during test execution

---

### Group A: Successful Subscription Creation

#### TC-001: New Subscription — Happy Path

| Field | Detail |
|---|---|
| **ID** | TC-001 |
| **Scenario** | A new participant completes registration and subscribes successfully using a valid Visa card |
| **Preconditions** | test-user-001 exists in Supabase auth; Season 1 is in "registration open" state; Stripe price ID is active |
| **Steps** | 1. Log in as test-user-001 on staging site. 2. Navigate to registration/payment page. 3. Enter card `4242 4242 4242 4242`, expiry `12/29`, CVC `123`. 4. Click "Subscribe and Join". 5. Observe redirect after payment. |
| **Expected Result** | (a) Stripe creates a `customer` and `subscription` object. (b) Subscription status = `active`. (c) Stripe fires `customer.subscription.created` and `invoice.payment_succeeded` webhooks. (d) Supabase `stripe-webhook` function processes both events within 10 seconds. (e) `participants.paid_at` is set to the current UTC timestamp. (f) `participants.subscription_status` = `active`. (g) `participants.stripe_customer_id` is populated. (h) `participants.stripe_subscription_id` is populated. (i) User is redirected to Dashboard. (j) Welcome email dispatched via Resend. |
| **Pass/Fail** | [ ] Pass [ ] Fail |
| **Notes** | |

---

#### TC-002: New Subscription — Mastercard

| Field | Detail |
|---|---|
| **ID** | TC-002 |
| **Scenario** | Successful subscription using a Mastercard |
| **Preconditions** | Same as TC-001 but using test-user-002 (fresh account, no existing Stripe customer) |
| **Steps** | 1. Register as test-user-002. 2. Use card `5555 5555 5555 4444`. 3. Complete checkout. |
| **Expected Result** | Same expected results as TC-001. Stripe customer created with Mastercard payment method. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### Group B: Card Declined Scenarios

#### TC-003: Declined — Insufficient Funds

| Field | Detail |
|---|---|
| **ID** | TC-003 |
| **Scenario** | Participant attempts to subscribe but card is declined for insufficient funds |
| **Preconditions** | test-user-001 does not have an active subscription (or use fresh test account) |
| **Steps** | 1. Navigate to payment page. 2. Enter card `4000 0000 0000 9995`. 3. Click "Subscribe". |
| **Expected Result** | (a) Stripe returns a decline. (b) User sees a clear error message on the payment form: "Your card has insufficient funds. Please use a different payment method." (c) No subscription object created in Stripe. (d) No webhook fired. (e) `participants.paid_at` remains null. (f) `participants.subscription_status` remains null or `inactive`. (g) User remains on payment page. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

#### TC-004: Declined — Expired Card

| Field | Detail |
|---|---|
| **ID** | TC-004 |
| **Scenario** | Card is expired |
| **Preconditions** | Fresh test account |
| **Steps** | 1. Navigate to payment page. 2. Enter card `4000 0000 0000 0069`, expiry `01/20` (past date). 3. Click "Subscribe". |
| **Expected Result** | (a) Stripe or frontend validation rejects the card before submission, or Stripe declines post-submission. (b) Error message shown: "Your card has expired. Please use a different payment method." (c) No subscription created. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

#### TC-005: Declined — Stolen/Fraudulent Card

| Field | Detail |
|---|---|
| **ID** | TC-005 |
| **Scenario** | Stripe Radar blocks a stolen card |
| **Preconditions** | Fresh test account |
| **Steps** | 1. Navigate to payment page. 2. Enter card `4100 0000 0000 0019`. 3. Click "Subscribe". |
| **Expected Result** | (a) Stripe Radar blocks the payment. (b) User sees generic decline error (do not expose "stolen card" to user; show "Your card was declined"). (c) No subscription created. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

#### TC-006: Declined — Generic Decline

| Field | Detail |
|---|---|
| **ID** | TC-006 |
| **Scenario** | Generic bank decline (card_declined error) |
| **Preconditions** | Fresh test account |
| **Steps** | 1. Enter card `4000 0000 0000 0002`. 2. Click "Subscribe". |
| **Expected Result** | User sees: "Your card was declined. Please use a different payment method or contact your bank." No subscription created. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### Group C: 3D Secure Authentication

#### TC-007: 3DS — Successful Authentication

| Field | Detail |
|---|---|
| **ID** | TC-007 |
| **Scenario** | Card requires 3D Secure; participant completes authentication successfully |
| **Preconditions** | Fresh test account |
| **Steps** | 1. Navigate to payment page. 2. Enter card `4000 0025 0000 3155`. 3. Click "Subscribe". 4. Stripe 3DS modal appears. 5. Click "Authenticate" (in test mode, this is a button in the Stripe 3DS test dialog). |
| **Expected Result** | (a) 3DS authentication completes. (b) Payment succeeds. (c) Subscription created and active. (d) `paid_at` set correctly. (e) User redirected to Dashboard. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

#### TC-008: 3DS — Authentication Failed

| Field | Detail |
|---|---|
| **ID** | TC-008 |
| **Scenario** | Card requires 3D Secure; participant fails authentication |
| **Preconditions** | Fresh test account |
| **Steps** | 1. Enter card `4000 0000 0000 3063`. 2. Click "Subscribe". 3. In 3DS test modal, click "Fail authentication". |
| **Expected Result** | (a) Payment declined with `authentication_required` or `payment_intent.authentication_failure`. (b) User shown error: "Authentication failed. Please try again or use a different card." (c) No subscription created. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

#### TC-009: 3DS — User Cancels Authentication

| Field | Detail |
|---|---|
| **ID** | TC-009 |
| **Scenario** | 3DS modal appears; user closes it without authenticating |
| **Preconditions** | Fresh test account |
| **Steps** | 1. Enter card `4000 0025 0000 3155`. 2. Click "Subscribe". 3. Close 3DS modal without completing authentication. |
| **Expected Result** | (a) Payment does not complete. (b) User remains on payment page with message: "Payment incomplete. Please complete authentication to subscribe." (c) No subscription created. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### Group D: Webhook Delivery and Processing

#### TC-010: Webhook — invoice.payment_succeeded Sets paid_at

| Field | Detail |
|---|---|
| **ID** | TC-010 |
| **Scenario** | Verify the `stripe-webhook` Edge Function correctly sets `paid_at` on `invoice.payment_succeeded` event |
| **Preconditions** | TC-001 has been completed; test-user-001 has active subscription |
| **Steps** | 1. In Stripe test dashboard, navigate to Webhooks → select the staging webhook endpoint. 2. Click "Send test event". 3. Select event type `invoice.payment_succeeded`. 4. Click "Send". 5. Check Supabase staging database: `SELECT paid_at FROM participants WHERE stripe_customer_id = '[test-user-001 customer ID]'`. |
| **Expected Result** | (a) Edge Function log shows successful processing (HTTP 200). (b) `paid_at` is set to the timestamp from the Stripe event's `created` field, converted to UTC. (c) No duplicate processing on webhook retry. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

#### TC-011: Webhook — Signature Verification Rejects Invalid Payload

| Field | Detail |
|---|---|
| **ID** | TC-011 |
| **Scenario** | Webhook endpoint rejects a request with an invalid or missing Stripe signature |
| **Preconditions** | Staging webhook endpoint is active |
| **Steps** | 1. Using curl or Postman, send a POST request to the staging `stripe-webhook` Edge Function URL. 2. Include a fake JSON body mimicking a `invoice.payment_succeeded` event. 3. Do NOT include a `stripe-signature` header (or include an incorrect one). |
| **Expected Result** | (a) Edge Function returns HTTP 400. (b) No database changes are made. (c) Edge Function log shows: "Webhook signature verification failed". |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

#### TC-012: Webhook — Idempotency (Duplicate Event Handling)

| Field | Detail |
|---|---|
| **ID** | TC-012 |
| **Scenario** | Stripe resends a webhook event (e.g., due to a temporary endpoint failure); verify the Edge Function does not process it twice |
| **Preconditions** | TC-001 completed; test-user-001 has `paid_at` set |
| **Steps** | 1. In Stripe test dashboard, find the `invoice.payment_succeeded` event for test-user-001. 2. Click "Resend" to replay the event. 3. Check database — does `paid_at` change? Check Edge Function logs. |
| **Expected Result** | (a) Edge Function detects the event has already been processed (via `stripe_event_id` idempotency key or timestamp comparison). (b) Edge Function returns HTTP 200 (acknowledge receipt). (c) `paid_at` is NOT updated to a new timestamp. (d) No duplicate email sent. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### Group E: Subscription Lifecycle

#### TC-013: Subscription Cancellation Mid-Cycle (Participant-Initiated)

| Field | Detail |
|---|---|
| **ID** | TC-013 |
| **Scenario** | Participant cancels their subscription mid-season via the Customer Portal |
| **Preconditions** | test-user-002 has an active subscription (complete TC-002 first) |
| **Steps** | 1. Log in as test-user-002. 2. Navigate to Account/Subscription page. 3. Click "Manage Subscription" (opens Stripe Customer Portal). 4. In Customer Portal, click "Cancel subscription". 5. Confirm cancellation. |
| **Expected Result** | (a) Stripe sets subscription to `cancel_at_period_end = true`. (b) `customer.subscription.updated` webhook fires. (c) Edge Function processes webhook. (d) `participants.subscription_status` updated to `cancelled_at_period_end`. (e) Per Refund Policy: no refund issued (cancellation mid-season). (f) Participant retains access until period end. (g) Cancellation confirmation email sent via Resend. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

#### TC-014: Reactivation After Cancellation (Before Period End)

| Field | Detail |
|---|---|
| **ID** | TC-014 |
| **Scenario** | Participant reactivates their cancelled subscription before the period ends |
| **Preconditions** | TC-013 completed; test-user-002 subscription is `cancel_at_period_end = true` |
| **Steps** | 1. Log in as test-user-002. 2. Navigate to Subscription page. 3. Click "Reactivate Subscription" (or via Customer Portal). 4. Confirm reactivation. |
| **Expected Result** | (a) Stripe sets `cancel_at_period_end = false`. (b) `customer.subscription.updated` webhook fires. (c) `participants.subscription_status` = `active`. (d) Reactivation confirmation email sent. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

#### TC-015: Pre-Season Refund — Within 7-Day Window

| Field | Detail |
|---|---|
| **ID** | TC-015 |
| **Scenario** | Participant requests a refund before Season 1 starts (within the 7-day refund window per Refund Policy) |
| **Preconditions** | test-user-003 has an active subscription created less than 7 days ago; Season 1 has not started; admin-user-001 exists in admin_users table |
| **Steps** | 1. Log in as admin-user-001 to Admin Panel. 2. Navigate to participant management. 3. Find test-user-003 and initiate refund via the `process-refund` Edge Function. 4. Confirm refund amount = $13.00 NZD. |
| **Expected Result** | (a) Admin Panel calls the `process-refund` Edge Function. (b) Edge Function calls `stripe.refunds.create` with the correct `payment_intent` or `charge` ID. (c) Stripe creates a refund of $13.00. (d) `charge.refunded` webhook fires. (e) `participants.subscription_status` = `refunded`. (f) `participants.paid_at` = null (or `refunded_at` set). (g) Stripe subscription is cancelled immediately. (h) Confirmation email sent to participant. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

#### TC-016: Refund Rejection — After Season Start

| Field | Detail |
|---|---|
| **ID** | TC-016 |
| **Scenario** | Admin attempts to issue a refund after Season 1 has started; system should reject per Refund Policy |
| **Preconditions** | test-user-003 has active subscription; Season 1 status = `active` in database |
| **Steps** | 1. Log in as admin-user-001. 2. Navigate to participant management. 3. Find test-user-003. 4. Attempt to initiate refund via `process-refund` Edge Function. |
| **Expected Result** | (a) `process-refund` Edge Function checks season status. (b) Function returns HTTP 422 with error: "Refunds cannot be processed after season has commenced." (c) No Stripe refund created. (d) Admin sees error message in Admin Panel. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### Group F: Failed Payment and Dunning

#### TC-017: Failed Payment — First Retry (Stripe Dunning)

| Field | Detail |
|---|---|
| **ID** | TC-017 |
| **Scenario** | Monthly renewal payment fails; Stripe dunning begins |
| **Preconditions** | test-user-004 has an active subscription; update their payment method to `4000 0000 0000 9995` (insufficient funds) via Stripe test dashboard |
| **Steps** | 1. In Stripe test dashboard, find test-user-004's subscription. 2. Trigger a test invoice by clicking "Create invoice" or using Stripe's clock feature to advance time. 3. Ensure the attached payment method is the insufficient funds card. |
| **Expected Result** | (a) Invoice payment attempt fails. (b) `invoice.payment_failed` webhook fires. (c) Edge Function processes webhook and sets `participants.subscription_status` = `past_due`. (d) Stripe schedules retry per Smart Retries / dunning config. (e) Email notification sent to participant: "Payment failed — please update your payment method." |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

#### TC-018: Failed Payment — Subscription Cancelled After Dunning Exhausted

| Field | Detail |
|---|---|
| **ID** | TC-018 |
| **Scenario** | All Stripe dunning retries exhausted; subscription is cancelled |
| **Preconditions** | TC-017 completed; test-user-004 subscription is `past_due` |
| **Steps** | 1. In Stripe dashboard, manually mark all invoices as uncollectable or configure Stripe subscription settings to cancel after first failure. 2. Trigger cancellation. |
| **Expected Result** | (a) `customer.subscription.deleted` webhook fires. (b) Edge Function processes webhook. (c) `participants.subscription_status` = `cancelled`. (d) `participants.paid_at` = null (subscription expired). (e) Access to season features revoked if season is still active. (f) Final cancellation email sent. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### Group G: Duplicate Subscription Prevention

#### TC-019: Duplicate Subscription — Same User, Active Subscription

| Field | Detail |
|---|---|
| **ID** | TC-019 |
| **Scenario** | A user with an active subscription attempts to subscribe again |
| **Preconditions** | test-user-005 has an active subscription from TC-001 equivalent |
| **Steps** | 1. Log in as test-user-005. 2. Navigate to registration/payment page. 3. Attempt to initiate a new Stripe checkout session. |
| **Expected Result** | (a) Frontend or backend detects existing active subscription for this user. (b) User is redirected to Dashboard with message: "You already have an active subscription." (c) No new Stripe checkout session is created. (d) No second subscription is created. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

#### TC-020: Duplicate Prevention — Same Email, Different Account

| Field | Detail |
|---|---|
| **ID** | TC-020 |
| **Scenario** | A user creates a second Supabase auth account with the same email address to attempt to get a second subscription |
| **Preconditions** | test-user-001 has active subscription linked to alex.test@reap-testing.nz |
| **Steps** | 1. Log out. 2. Attempt to create a new Supabase auth account with the same email (alex.test@reap-testing.nz). |
| **Expected Result** | (a) Supabase auth rejects duplicate email registration. (b) User is shown: "An account already exists with this email address." (c) No second account created. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### Group H: Customer Portal

#### TC-021: Customer Portal — Access and Authentication

| Field | Detail |
|---|---|
| **ID** | TC-021 |
| **Scenario** | Participant accesses the Stripe Customer Portal to manage their subscription |
| **Preconditions** | test-user-001 has active subscription |
| **Steps** | 1. Log in as test-user-001. 2. Navigate to Account page. 3. Click "Manage Billing" / "Manage Subscription". 4. Observe redirect to Stripe Customer Portal. |
| **Expected Result** | (a) Stripe Customer Portal loads correctly. (b) Portal shows test-user-001's subscription ($13/month). (c) Portal shows current period end date. (d) Options available: "Cancel subscription", "Update payment method". |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

#### TC-022: Customer Portal — Update Payment Method

| Field | Detail |
|---|---|
| **ID** | TC-022 |
| **Scenario** | Participant updates their payment method via the Customer Portal |
| **Preconditions** | TC-021 completed |
| **Steps** | 1. In Customer Portal, click "Update payment method". 2. Enter new card `5555 5555 5555 4444`. 3. Save. |
| **Expected Result** | (a) New card saved as default payment method in Stripe. (b) `customer.updated` webhook fires. (c) Subscription continues unaffected. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### Group I: Subscription Metadata

#### TC-023: Metadata — participant_id and season_id

| Field | Detail |
|---|---|
| **ID** | TC-023 |
| **Scenario** | Verify Stripe subscription metadata contains correct participant_id and season_id values |
| **Preconditions** | TC-001 completed |
| **Steps** | 1. In Stripe test dashboard, navigate to Customers → [test-user-001 customer]. 2. Open the subscription. 3. Check the "Metadata" section. |
| **Expected Result** | (a) `participant_id` metadata key = test-user-001's UUID from Supabase `participants` table. (b) `season_id` metadata key = Season 1's UUID from Supabase `seasons` table. (c) No other sensitive data in metadata (no email, no name). |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### Group J: Admin Refund Edge Function

#### TC-024: Admin Refund — Unauthorised User Cannot Call Edge Function

| Field | Detail |
|---|---|
| **ID** | TC-024 |
| **Scenario** | A non-admin authenticated user attempts to call the `process-refund` Edge Function directly |
| **Preconditions** | test-user-001 is authenticated but is NOT in the `admin_users` table |
| **Steps** | 1. Obtain test-user-001's JWT from the staging Supabase session. 2. Send a POST request directly to the `process-refund` Edge Function URL with the JWT in the Authorization header and a valid participant ID in the body. |
| **Expected Result** | (a) Edge Function checks JWT claims against `admin_users` table. (b) Returns HTTP 403: "Forbidden — admin access required." (c) No Stripe refund is created. |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

### Group K: Chargeback

#### TC-025: Chargeback Simulation — Dispute Created

| Field | Detail |
|---|---|
| **ID** | TC-025 |
| **Scenario** | A participant disputes a charge (chargeback); verify system handles the dispute event |
| **Preconditions** | test-user-001 has completed payment (TC-001). Use Stripe's chargeback simulation card |
| **Steps** | 1. In Stripe test dashboard, find test-user-001's payment. 2. Click "Dispute payment" (or use Stripe's simulated dispute via the API). 3. Observe webhook events. |
| **Expected Result** | (a) `charge.dispute.created` webhook fires. (b) Edge Function (or a new `handle-dispute` function) logs the dispute. (c) `participants.subscription_status` = `disputed`. (d) Admin Panel flags the participant account. (e) Automated alert sent to admin email via Resend. (f) No automatic refund issued (dispute handling is manual). |
| **Pass/Fail** | [ ] Pass [ ] Fail |

---

## 4. Stripe Webhook Event Checklist

The following Stripe webhook events must be registered and handled by the `stripe-webhook` Edge Function. Verify each is listed in the Stripe test webhook configuration.

| Event | Handler Required | Tested By | Status |
|---|---|---|---|
| `checkout.session.completed` | Create participant subscription record, set `paid_at` | TC-001, TC-002 | [ ] Registered [ ] Tested |
| `customer.subscription.created` | Confirm subscription active status | TC-001 | [ ] Registered [ ] Tested |
| `customer.subscription.updated` | Handle status changes (cancellation, reactivation, pause) | TC-013, TC-014 | [ ] Registered [ ] Tested |
| `customer.subscription.deleted` | Cancel access, update status to `cancelled` | TC-018 | [ ] Registered [ ] Tested |
| `invoice.payment_succeeded` | Set `paid_at`, confirm subscription renewal | TC-010 | [ ] Registered [ ] Tested |
| `invoice.payment_failed` | Set `past_due`, trigger dunning email | TC-017 | [ ] Registered [ ] Tested |
| `charge.refunded` | Update `subscription_status` to `refunded` | TC-015 | [ ] Registered [ ] Tested |
| `charge.dispute.created` | Flag account, alert admin | TC-025 | [ ] Registered [ ] Tested |
| `customer.updated` | Log payment method update | TC-022 | [ ] Registered [ ] Tested |

---

## 5. Acceptance Criteria — Go/No-Go

All of the following conditions must be true before the Stripe account is switched to production mode and public registration opens.

### Mandatory Pass Criteria (All Must Pass)

| # | Criterion | Status |
|---|---|---|
| 1 | TC-001 (happy path subscription) passes without defects | [ ] Pass [ ] Fail |
| 2 | TC-003 through TC-006 (all decline scenarios) pass | [ ] Pass [ ] Fail |
| 3 | TC-007 (3DS success) passes | [ ] Pass [ ] Fail |
| 4 | TC-010 (paid_at set on invoice.payment_succeeded) passes | [ ] Pass [ ] Fail |
| 5 | TC-011 (webhook signature rejection) passes — SECURITY CRITICAL | [ ] Pass [ ] Fail |
| 6 | TC-012 (idempotency) passes — no duplicate processing | [ ] Pass [ ] Fail |
| 7 | TC-015 (pre-season refund) passes | [ ] Pass [ ] Fail |
| 8 | TC-019 (duplicate subscription prevention) passes | [ ] Pass [ ] Fail |
| 9 | TC-023 (metadata populated correctly) passes | [ ] Pass [ ] Fail |
| 10 | TC-024 (admin function access control) passes — SECURITY CRITICAL | [ ] Pass [ ] Fail |
| 11 | All webhook events in Section 4 are registered and tested | [ ] Pass [ ] Fail |
| 12 | Zero P1 (Critical) defects outstanding | [ ] Pass [ ] Fail |
| 13 | Zero P2 (High) defects outstanding | [ ] Pass [ ] Fail |
| 14 | Stripe account details reviewed and production keys are correctly stored in Supabase production secrets | [ ] Pass [ ] Fail |
| 15 | Production webhook URL registered in Stripe production dashboard (not test) | [ ] Pass [ ] Fail |

### Go/No-Go Decision

| Decision | Condition |
|---|---|
| GO | All 15 mandatory criteria pass; P3/P4 defects documented and have accepted workaround or are non-blocking |
| NO-GO | Any single mandatory criterion fails |

**Go/No-Go Decision Date:** 2026-07-01 (or earlier if all tests complete)
**Decision Authority:** Dev Team Lead + CEO
**Decision recorded:** _______________________________

---

## 6. Regression Test Schedule

Run the following regression subset after any change to:
- `stripe-webhook` Edge Function
- `process-refund` Edge Function
- Frontend payment flow (Checkout component)
- Stripe product/price configuration

### Regression Subset (Run After Each Relevant Code Change)

| TC | Test Case | Run Time (Est.) |
|---|---|---|
| TC-001 | Happy path subscription | 3 min |
| TC-003 | Declined — insufficient funds | 2 min |
| TC-010 | Webhook sets paid_at | 3 min |
| TC-011 | Webhook signature rejection | 2 min |
| TC-012 | Idempotency | 3 min |
| TC-015 | Pre-season refund | 5 min |
| TC-019 | Duplicate prevention | 2 min |
| TC-024 | Admin function access control | 3 min |
| **Total** | | **~23 min** |

### Full Regression (Run Before Production Switch and After Major Changes)

All 25 test cases. Estimated time: 3–4 hours.

### Scheduled Regression Runs

| Run | When | Who |
|---|---|---|
| Full regression #1 | 2026-06-15 (first pass) | Dev Team |
| Full regression #2 | 2026-06-25 (post-fixes) | Dev Team |
| Full regression #3 | 2026-06-30 (pre-go/no-go) | Dev Team Lead sign-off |
| Regression subset | After each PR merged to main (automated where possible) | CI/CD |
| Pre-production regression | 2026-10-15 (production switch day) | Dev Team Lead |

---

## 7. Defect Management

### Severity Definitions

| Severity | Definition | Resolution SLA |
|---|---|---|
| P1 — Critical | Payment cannot be completed; data loss; security vulnerability; incorrect financial processing | Block go/no-go; fix immediately |
| P2 — High | Core flow broken for a specific scenario; webhook not processed; incorrect status set | Fix before go/no-go |
| P3 — Medium | Non-critical UX issue; non-blocking error message defect; minor email formatting | Fix before production switch if possible |
| P4 — Low | Cosmetic issue; minor copy error; non-functional improvement | Log and fix in next sprint |

### Defect Log

| ID | TC | Description | Severity | Assignee | Status | Resolution |
|---|---|---|---|---|---|---|
| (complete during testing) | | | | | | |

---

## 8. Sign-Off

All sign-offs required before switching Stripe to production mode.

| Role | Name | Signature | Date |
|---|---|---|---|
| Dev Team Lead (testing complete, all criteria met) | | | |
| CEO (authorises production switch) | | | |
| LL Lead / Leanne (operational readiness confirmed) | | | |

---

*Document prepared by: Dev Team*
*Version: 1.0 — For execution June–July 2026*
*Classification: Internal — Technical*
*Related tasks: T028, T015 (Board Approval), T011, T012*
