# REAP Stripe Webhook Specification
**Sport Waikato Incorporated | Technical Reference**

## Overview
REAP uses Stripe to process subscription payments. Stripe webhooks notify the backend of successful payments, failed payments, subscription cancellations, and invoice events.

## Events to Handle
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `checkout.session.completed`

## Webhook Processing Flow
1. Receive event from Stripe.
2. Verify the signature using the webhook secret.
3. Parse the event type and payload.
4. Update the corresponding participant subscription status.
5. Send notification to the operations team for payment issues.

## Payment Success
- On `invoice.payment_succeeded`, mark the participant's subscription as active for the upcoming season or renewal period.
- If the payment is the initial registration fee, create a new season record and allow participant access.

## Payment Failure
- On `invoice.payment_failed`, notify the participant of the failed payment attempt.
- If the subscription is overdue, lock season entry and provide instructions for updating payment information.

## Subscription Cancellation
- On `customer.subscription.deleted`, set the participant's subscription status to cancelled.
- Allow the participant to finish the current season if the cancellation occurs after the season begins, subject to the platform's refund and access policy.

## Security
- Validate Stripe signatures on every webhook.
- Maintain the webhook secret securely in environment configuration.
- Log all webhook events for audit and dispute review.
