# TERRA API Decision & Integration

**Prepared by:** Ashleigh  
**Date:** April 9, 2026  
**Status:** Draft

## Purpose
This document defines the decision process and integration requirements for using TERRA as the unified wearable integration layer for Survive the Reap.

## Requirements
- Unified access to Apple Health, Garmin Connect, Fitbit, Strava, Google Fit, Polar, Whoop, Samsung Health
- Ability to fetch heart rate and movement session data for daily Zone 2 validation
- Support for NZT daily cut-off and midnight elimination window
- Secure OAuth flow for participant wearable connections
- Data privacy compliant with Privacy Act 2020

## Decision Criteria
- Coverage of supported wearable platforms
- Accuracy of heart rate and session data
- Ease of integration with React/Vite frontend and Supabase backend
- Cost per active participant and scalability
- Latency and reliability for daily verification
- Alignment with REAP’s non-gambling promotional competition model

## Integration Approach
1. Evaluate TERRA API documentation and pilot a proof of concept
2. Implement participant wearable connect flow
3. Store wearable provider tokens securely in Supabase
4. Build nightly data sync job to fetch heart rate sessions
5. Validate each participant’s Zone 2 minutes against daily requirement

## Outputs
- Decision memo on TERRA adoption
- Integration technical spec
- Privacy impact notes
- Data model for wearable session imports

## Notes
- TERRA is preferred to avoid maintaining multiple device-specific integrations
- The decision should be made before June 30, 2026
