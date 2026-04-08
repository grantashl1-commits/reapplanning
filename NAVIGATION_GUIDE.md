# REAP Planning Dashboard — Navigation & UX Guide

## What's New

The REAP planning app has been reorganized to make documentation more discoverable and workflows clearer. Here's what changed and how to use it.

---

## 📍 Navigation Changes

### Sidebar Reorganization

The sidebar now has a **DOCUMENTATION** section (instead of scattered "Resources"):

- **Documentation Hub** — New landing page showing collections of related docs
- **Resource Library** — Full searchable catalog of all 45+ documents
- **Media Library** — Brand assets, logos, campaign graphics

This groups documentation centrally so you don't have to hunt for what you need.

---

## 🎯 Documentation Hub _(New Page)_

**Path:** `/docs` or click **Documentation Hub** in the sidebar

The Documentation Hub is the main entry point for all REAP documents. It provides three key views:

### 1. **Critical Path Status**
Shows real-time status of documents needed for launch:
- ✅ Complete / Final (green)
- 🟡 Under Review (amber)
- ⚪ Draft (gray)

**Use this to:** Quickly see what's blocking approval. If all 6 legal/governance docs are complete, you're ready for review.

### 2. **Recent Additions** _(What's New)_
Lists the 5 most recently added documents with one-click access.

**Use this to:** Discover newly created documentation without searching.

### 3. **Collections & Workflows** _(The Heart of It)_
Six smart groupings of related documents:

#### **Legal Sign-Off Bundle**
- Terms & Conditions
- Privacy Policy  
- Refund Policy
- Competition Rules

Use this for legal review. All 4 docs must be "Complete" before Shelley can sign off.

#### **DIA Enquiry Kit**
- DIA Enquiry Letter
- Gambling Act Compliance Analysis
- Gambling Framing Strategy

Use this to prepare for the Department of Internal Affairs submission (May 2026 deadline).

#### **Launch Campaign Pack**
- Onboarding Messages
- Elimination Messages
- Email Sequences
- Support Templates
- Launch Campaign
- Halloween Sequence
- Celebrity Invite
- Funder Briefing

Use this to coordinate all marketing and participant messaging.

#### **Technical Implementation**
- Database Schema
- API Documentation
- Cron Job Spec
- Stripe Webhook Spec

Use this for dev team hand-offs and technical reviews.

#### **Governance Package**
- Board Update Template
- Equity Access Policy
- Welfare Disputes Protocol
- DIA Enquiry Letter

Use this to prepare for board meetings and governance decisions.

#### **Reporting Suite**
- Legal Compliance Audit
- Financial Model (3-Year)
- Board Launch Conditions
- Lovable Build Prompts

Use this for financial and technical reporting.

---

## 📊 Dashboard Updates

The **Dashboard** now includes a **Documentation Status** widget showing:
- Total % complete
- Count of docs: Complete | In Review | Draft

**Why this matters:** You can see at a glance whether the documentation phase is on track without leaving the main view.

---

## 🔍 Resource Library _(Advanced Users)_

**Path:** `/resources` or click **Resource Library** in the sidebar

This is the full searchable catalog with:
- **Search** by title or description
- **Filter** by category (Legal, Technical, Marketing, etc.)
- **Filter** by status (Draft, Under Review, Approved, Complete)
- **View** or **Download** buttons for each doc

Use this when you need to find a specific document and aren't sure which collection it belongs to.

---

## 💡 UX Design Principles

The redesign focuses on three things:

### 1. **Clarity**
- Documents are grouped by workflow, not by random category
- Status is always visible (green = done, amber = review, gray = draft)
- Critical docs for launch are highlighted

### 2. **Discoverability**
- New collections make related docs obvious
- Recent additions are surfaced automatically
- Search and filters work across all 45+ documents

### 3. **Workflow Alignment**
- If you're the legal team → go to Legal Sign-Off Bundle
- If you're marketing → go to Launch Campaign Pack
- If you're dev → go to Technical Implementation
- If you're the board → go to Reporting Suite

---

## 🚀 Quick Workflows

### "I'm Shelley and need to review legal docs"
1. Go to **Documentation Hub**
2. Click **Legal Sign-Off Bundle**
3. Review all 4 docs
4. Mark them "Complete" when ready

### "I'm Ashleigh and coordinating the Season 1 launch"
1. Go to **Documentation Hub**
2. Click **Launch Campaign Pack**
3. Review all 8 marketing docs
4. Share with external partners as needed

### "I'm Leanne and need to brief the board"
1. Go to **Documentation Hub**
2. Click **Reporting Suite** or **Governance Package**
3. Print or export key docs
4. Use stats on the Dashboard to briefing notes

### "I need to find a specific document"
1. Go to **Resource Library**
2. Use search (e.g., "Stripe")
3. Filter by category or status if needed
4. Click "View" to open

---

## 📈 Status Tracking

Every document has one of these statuses:

| Status | Meaning |
|--------|---------|
| **Complete** | ✅ Ready to publish / implement |
| **Final** | ✅ Approved by legal counsel |
| **Approved** | ✅ Signed off |
| **Under Review** | 🟡 With reviewer, awaiting feedback |
| **Draft — Awaiting Legal Review** | 🟡 Needs legal attention |
| **Draft** | ⚪ In progress, not ready |

---

## 🎨 Visual Design

The interface uses colour coding:
- **Green** = Legal / Operations ready
- **Red** = Legal documents
- **Blue** = Documentation hub / governance
- **Purple** = Marketing
- **Cyan** = Technical

This helps you scan quickly without reading labels.

---

## 📱 Mobile Experience

The Documentation Hub is **fully responsive**:
- On phones: single-column layout, collapsible filters
- On tablets: two-column grid
- On desktop: three-column grid with full detail panels

---

## ❓ FAQ

**Q: Where are the old resources?**  
A: They're still in the Resource Library. The Documentation Hub is a new organized layer on top.

**Q: Can I download documents?**  
A: Yes, click the "View" button on any document to open it. Most link to actual files.

**Q: How often is this updated?**  
A: Real-time. Every new document or status change appears immediately.

**Q: What if I can't find a doc?**  
A: Use the Resource Library search. It searches across title, description, and metadata.

**Q: Can I share collections with my team?**  
A: Yes. Each collection has a stable URL; you can bookmark or share the link.

---

## 🔧 Troubleshooting

**Problem:** A document link is broken.  
**Solution:** This means the file hasn't been uploaded yet. Check the status — if it says "PENDING", the doc is still in draft.

**Problem:** I can't find a document in the search.  
**Solution:** Try searching for keywords instead of the full title. The search is case-insensitive but matches word fragments.

**Problem:** The status isn't updating.  
**Solution:** Refresh the page (Ctrl+R). Changes should appear within a few seconds.

---

## 📞 Support

For questions about the dashboard or to request changes:
- Check the **Sidebar → Documentation Hub** for current status
- Use **Sidebar → Resource Library** to find specific docs
- Reach out to Ashleigh (Digital Innovation Lead) for UX feedback

---

**Last Updated:** 9 April 2026  
**Status:** Live  
**Version:** 1.0
