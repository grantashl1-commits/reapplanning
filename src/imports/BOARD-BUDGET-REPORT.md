# Survive the Reap — Board Budget Report
**Prepared:** April 2026 | Sport Waikato / The Living Lab

---

## Summary

Survive the Reap is a 30-day fitness accountability app charging **$13.00 NZD per month** per participant. This report covers anticipated development costs, ongoing operational costs, the prize fund commitment under the Gambling Act compliance structure, marketing allowances, and projected income scenarios.

**Note on subscription model:** The $13/month subscription is a recurring monthly charge (via Stripe) that continues until the participant cancels. Eliminated participants retain access and are encouraged to re-enter the following season without cancelling.

---

## 1. Development Setup Costs (One-Time)

The app has been built using **Lovable** (AI-assisted React development) plus **Supabase** (database and backend). This approach dramatically reduces traditional custom development cost.

| Item | AI-Assisted Approach | Traditional Custom Dev |
|------|---------------------|----------------------|
| App development | $5,000 – $8,000 | $30,000 – $60,000 |
| Design & assets | $500 – $1,000 | $4,000 – $8,000 |
| Deployment & configuration | $800 – $1,500 | $2,000 – $4,000 |
| Testing & QA | $500 – $1,000 | $3,000 – $6,000 |
| **Total** | **$6,800 – $11,500** | **$39,000 – $78,000** |

> **Note:** Using the Lovable/AI approach saves an estimated **$30,000 – $65,000** in development costs.

### Remaining setup tasks (developer hours still needed)

| Task | Est. Hours | Est. Cost @ $130/hr NZD |
|------|-----------|------------------------|
| Deploy Supabase edge functions (payment webhook, midnight elimination) | 3 hrs | $390 |
| Configure Stripe webhook endpoint | 1 hr | $130 |
| Set production environment secrets | 1 hr | $130 |
| Create `prize_awards` database table | 1 hr | $130 |
| Final testing on production environment | 4 hrs | $520 |
| **Total remaining** | **~10 hrs** | **~$1,300** |

### Legal compliance setup (one-time)

| Item | Estimated Cost (NZD) |
|------|---------------------|
| Shelley — legal review, Terms redraft, DIA enquiry preparation (~15–20 hrs @ $350/hr) | $5,250 – $7,000 |
| DIA informal enquiry admin and follow-up | Included above |
| Prize draw documentation protocol | Included above |
| **Legal compliance budget** | **~$6,000** |

---

## 2. Ongoing Infrastructure Costs (Monthly)

| Service | Purpose | Monthly Cost (NZD) |
|---------|---------|-------------------|
| Lovable (Pro) | App hosting & deployment | ~$85 |
| Supabase (Pro) | Database, auth, edge functions | ~$42 |
| Resend | Email (registration, alerts) | $0 (free tier, up to 3,000/mo) |
| Domain (.nz) | survivethereap.nz or similar | ~$3 |
| **Monthly total** | | **~$130 NZD/month** |
| **Annual total** | | **~$1,560 NZD/year** |

> **Stripe payment processing:** No monthly fee. Charges **2.9% + $0.30 NZD** per transaction.
> On a $13.00 subscription: ~$0.68 in fees, so **net revenue per subscription = ~$12.32 NZD/month**.

---

## 3. Prize Fund — Gambling Act Compliance Structure

Under the Gambling Act 2003 compliance strategy, prizes are funded entirely from **Sport Waikato's general operational funds** — separate from subscription revenue at the accounting level. This separation is legally necessary and must be maintained.

REAP runs **7 prize draws per season**, each awarding **$666 NZD**:

| | Per Season | Year 1 (2 seasons) | Year 2+ (4 seasons/yr) |
|-|-----------|-------------------|----------------------|
| Number of draws | 7 | 14 | 28 |
| Prize per draw | $666 | $666 | $666 |
| **Prize fund commitment** | **$4,662** | **$9,324** | **$18,648/year** |

> This cost is a Sport Waikato operational commitment funded independently of the app's subscription revenue. It is presented separately from the app P&L below to preserve the legal separation required under the compliance structure.
>
> **Prize sponsorship opportunity:** A commercial partner (e.g., Garmin NZ, health insurer, corporate group client) could offset some or all of this cost via a sponsorship arrangement paid to Sport Waikato's operational funds. Estimated value: $5,000–$20,000 per season.

---

## 4. Ongoing Maintenance Costs (Annual)

| Item | Annual Estimate (NZD) |
|------|----------------------|
| Developer maintenance (bug fixes, updates, ~10 hrs/yr) | $1,300 |
| Infrastructure | $1,560 |
| **Total annual app operating costs** | **~$2,860/year** |

---

## 5. Marketing Budget

### Per Season (recommended allowance)

| Activity | Conservative | Recommended |
|----------|-------------|-------------|
| Social media advertising (Meta/Instagram — Waikato targeting) | $300 | $700 |
| Content creation (copy, graphics, video clips) | $200 | $400 |
| Local ambassador / influencer (1–2 people) | $0 | $400 |
| Gym/community flyers & print | $100 | $200 |
| **Per season total** | **$600** | **$1,700** |

### Annual Marketing Budget

| Scenario | Annual Marketing (NZD) |
|----------|----------------------|
| Conservative | $2,400 |
| Recommended | $6,800 |
| Launch year (includes one-off brand launch push +$1,000) | $7,800 |

> **Advantage:** Sport Waikato's existing network (email lists, events, club relationships) provides significant free reach. The October celebrity soft launch is designed to generate organic media attention at minimal cost.

---

## 6. Revenue Projections

**Subscription price:** $13.00 NZD/month (recurring)
**Net after Stripe fees:** ~$12.32 NZD/month per subscriber

> **GST note:** Confirm with accountant whether $13.00 is GST-inclusive or exclusive. If inclusive, ex-GST revenue per subscription = ~$11.30 NZD/month. Projections below use the face value net of Stripe fees only.

### Subscriber Growth Assumptions (active paying subscribers)

The board report (Section 3) targets 150–400 participants in Year 1 (2 seasons: November and December 2026).

| Scenario | Year 1 Avg Subscribers | Year 2 Avg Subscribers | Year 3 Avg Subscribers |
|----------|----------------------|----------------------|----------------------|
| Conservative | 150 | 250 | 400 |
| Base Case | 250 | 400 | 650 |
| Optimistic | 400 | 700 | 1,100 |

> Note: "Average subscribers" accounts for ongoing monthly churn (cancellations after elimination) and new sign-ups at each season start. Eliminated participants who stay subscribed contribute to revenue between seasons.

### Annual Gross Revenue (monthly recurring model)

| Scenario | Avg Subscribers | Annual Gross ($13 × 12) | Net after Stripe (~94.8%) |
|----------|----------------|------------------------|--------------------------|
| Conservative | 150 | $23,400 | $22,176 |
| Base Case | 250 | $39,000 | $36,960 |
| Optimistic | 400 | $62,400 | $59,136 |

---

## 7. Profit & Loss — App Operations (Excluding Prize Fund)

The prize fund is shown separately as it must be accounted for independently of subscription revenue for legal compliance purposes.

### Annual App Operating Costs

| Cost Item | Annual (NZD) |
|-----------|-------------|
| Infrastructure | $1,560 |
| Developer maintenance | $1,300 |
| Marketing (recommended) | $6,800 |
| **Total annual app operating costs** | **$9,660** |

### App Net Contribution (before prize fund)

| Scenario | Net Revenue | App Operating Costs | **App Contribution** |
|----------|------------|---------------------|---------------------|
| Conservative (150 subscribers) | $22,176 | $9,660 | **$12,516** |
| Base Case (250 subscribers) | $36,960 | $9,660 | **$27,300** |
| Optimistic (400 subscribers) | $59,136 | $9,660 | **$49,476** |

### Total Sport Waikato Position (including prize fund)

| | Conservative | Base Case | Optimistic |
|-|------------|----------|----------|
| App contribution | $12,516 | $27,300 | $49,476 |
| Less: Prize fund (4 seasons) | ($18,648) | ($18,648) | ($18,648) |
| **Net annual position** | **($6,132)** | **$8,652** | **$30,828** |

> **Note:** Prize sponsorship from a commercial partner could fully offset the prize fund. At $15,000 in prize sponsorship per year, the Base Case net position improves from $8,652 to $23,652.

### Break-Even Analysis

**App operations only (before prize fund):**
- Break-even at: $9,660 ÷ $12.32/month = **785 subscriber-months** = ~65 average subscribers needed

**Including prize fund (annual commitment $18,648):**
- Total costs: $9,660 + $18,648 = $28,308
- Break-even at: $28,308 ÷ ($12.32 × 12) = **191 subscribers** on average across the year

> Break-even at 191 active subscribers is achievable in Year 1 at base case projections (250 target). With any prize sponsorship offsetting part of the prize fund, this threshold drops further.

---

## 8. Three-Year Financial Outlook (Base Case)

| | Year 1 | Year 2 | Year 3 |
|-|--------|--------|--------|
| Avg active subscribers | 250 | 400 | 650 |
| Annual gross revenue | $39,000 | $62,400 | $101,400 |
| Net revenue (after Stripe) | $36,960 | $59,136 | $96,228 |
| App operating costs | $9,660 | $10,200 | $10,800 |
| **App contribution** | **$27,300** | **$48,936** | **$85,428** |
| Prize fund (4 seasons/yr) | ($18,648) | ($18,648) | ($18,648) |
| **Net Sport Waikato position** | **$8,652** | **$30,288** | **$66,780** |
| Setup + legal costs (Year 1 only) | ($13,300) | — | — |
| **Cumulative position** | ($4,648) | $25,640 | $92,420 |

> Setup and legal costs amortised in Year 1. Cumulative break-even expected **mid-Year 2**.

---

## 9. Key Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Gambling Act classification | Legal / reputational | Two-layer compliance structure (skill-based draws + financial separation); DIA informal enquiry; formal legal sign-off by Shelley September 2026 |
| Prize fund unsupported | Cash flow | Seek prize sponsorship to offset ($5,000–$20,000/season); board to approve operational budget allocation |
| Low Season 1 uptake | Revenue shortfall | Celebrity soft launch (October 2026); Sport Waikato network promotion; RST partner distribution |
| High subscriber churn | Revenue underperformance | In-app re-enrol prompts; elimination card sharing; Season 2 early bird access for existing subscribers |
| Prize structure challenged by DIA | Legal compliance | DIA informal enquiry (May 2026); Shelley sign-off; performance-based draw mechanics remove random chance element |
| Stripe fees increase | Margin erosion | Monitor; price review available (current $13 has headroom to $15–$16 with minimal demand impact) |
| Developer costs exceed estimate | Cost overrun | Fixed-scope remaining tasks (~10 hrs); contingency included in budget ask |

---

## 10. Recommended Budget Ask

| Item | Amount (NZD) |
|------|-------------|
| Final development & launch setup | $1,300 |
| Year 1 infrastructure (12 months) | $1,560 |
| Legal compliance (Shelley + DIA) | $6,000 |
| Year 1 marketing (launch year) | $7,800 |
| Contingency (10%) | $1,666 |
| **Total Year 1 App Budget Ask** | **$18,326** |

**Separate prize fund ask (Sport Waikato operational funds):**

| | Amount (NZD) |
|--|-------------|
| Year 1 prize fund (2 seasons: Nov + Dec 2026) | $9,324 |
| **Total Year 1 prize commitment** | **$9,324** |

**Total Year 1 Sport Waikato commitment: $27,650**

Expected Year 1 net revenue at base case (250 subscribers): **$36,960**

> At base case subscriber numbers, **Year 1 subscription revenue covers the full Year 1 budget ask and prize fund**, with a projected surplus of ~$9,310. Cumulative break-even (including setup costs) is expected in mid-Year 2.

---

## 11. Price Comparison Note

The subscription price has been set at **$13.00 NZD/month** (revised from an earlier draft figure of $14.99). This reflects:

- A cleaner price point with stronger psychological appeal ($13 fits the REAP brand — an unlucky number)
- Slightly lower Stripe fee in absolute terms
- Positioning below the $14.99–$15.99 band occupied by mainstream fitness apps, keeping REAP accessible
- Headroom to price up to $15–$16 in Year 2 if product-market fit is demonstrated

The reduction from $14.99 to $13.00 reduces annual net revenue by approximately **$2,520 per 250 subscribers** — a modest trade-off for a stronger brand fit and market positioning.

---

*All figures in NZD. USD service costs converted at 1 USD = 1.70 NZD (April 2026). Stripe fees modelled at NZ standard rate (2.9% + $0.30). Prize fund figures are gross; no tax treatment applied. GST treatment to be confirmed with accountant. Legal cost estimates are indicative — actual costs subject to scope of Shelley's engagement.*
