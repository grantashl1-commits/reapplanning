# REAP Cron Job Specification
**Sport Waikato Incorporated | Technical Operations**

## Purpose
Define the scheduled backend tasks that support REAP season management, eliminations, prize draws, and reporting.

## Daily Elimination Job
- Schedule: daily at 23:50 NZST
- Task: evaluate each active participant's Day N activity status and redemption day declarations
- Actions:
  - mark participants as eliminated if no valid activity or redemption day is recorded
  - update season status and send elimination notifications
  - generate a summary of survivorship metrics for the day

## Daily Sync Verification Job
- Schedule: daily at 00:30 NZST
- Task: verify successful device syncs that were expected before the cutoff
- Actions:
  - detect participants with missing or incomplete sync data
  - generate follow-up support alerts for unresolved sync issues

## Prize Draw Trigger Job
- Schedule: configured for each draw milestone (Day 7, 13, 14, 21, 24, 28, 30)
- Task: compile eligible survivors and execute the draw process
- Actions:
  - lock eligible pool at draw time
  - randomly select winner(s)
  - record draw details and notify winners

## Reporting Job
- Schedule: weekly on Monday at 08:00 NZST
- Task: produce operational and compliance reports
- Actions:
  - summarise active participant counts
  - report redemption day usage, elimination rates, and support inquiries
  - export anonymised research data for Living Lab review

## Error Handling
- Job failures are logged with timestamp, error stack, and affected season(s).
- Alerts are sent to the operations team for critical failures.
- Retry policy: failed jobs retry once after 15 minutes for transient issues.
