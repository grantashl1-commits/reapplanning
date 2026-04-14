# 21-Minute Movement Verification System

**Prepared by:** Dev Team  
**Date:** April 9, 2026  
**Status:** Draft

## Purpose
Document the system for verifying that participants achieve 21 continuous minutes in Zone 2 before midnight NZT.

## Requirements
- Track participant’s daily movement data from wearables
- Validate 21 continuous minutes in Zone 2
- Apply a NZT daily cutoff at 23:59
- Provide participant feedback on pass/fail status

## Design
- Nightly job evaluates participant activity
- If requirement met: mark participant active for next day
- If requirement not met: participant is at risk of elimination
- If using manual entry: require admin review

## Tolerance rules
- A session may include short sampling gaps up to 60 seconds
- Discontinuous sessions do not count
- Participant must complete at least one full qualifying interval

## Output
- Daily status flag in participant record
- Activity summary shown on dashboard
- Elimination eligibility calculation for midnight

## Notes
- Ensure timezone conversions are handled correctly for NZT
- Log each verification event for audit and dispute resolution
