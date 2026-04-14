# Research Consent Checkbox (Registration)

**Prepared by:** Ashleigh  
**Date:** April 9, 2026  
**Status:** Draft

## Purpose
Define the user experience and legal requirements for a separate research consent checkbox during registration.

## Requirements
- Consent must be explicit, separate from Terms & Conditions acceptance
- Checkbox must be unchecked by default
- Text must explain the research use of health and activity data
- User must be able to withdraw consent later

## Suggested Copy
```
[ ] I consent to my activity and health data being used for REAP improvement research and aggregate analysis.
(Research data will not be shared with third parties without additional consent.)
```

## Implementation
- Add separate checkbox field on registration form
- Persist consent status in Supabase
- Track consent timestamp and version of consent text
- Display a management option in participant settings

## Compliance Notes
- Align with Privacy Act 2020 requirements for informed consent
- Avoid bundling this consent with subscription purchase or general app access
- Provide clear explanation of data uses and retention
