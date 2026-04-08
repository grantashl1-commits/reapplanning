# REAP API Documentation
**Sport Waikato Incorporated | Technical Reference**

## Overview
The REAP API supports participant registration, activity submission, season status checks, and administration of prize draws. The API is designed to integrate with the React front end, device sync services, and backend rule engine.

## Authentication
- API calls require a bearer token issued at login.
- Tokens expire after a defined session period and may be refreshed.

## Endpoints

### POST /api/register
Request body:
- name
- email
- dateOfBirth
- password
- consentResearch

Response:
- participantId
- seasonId
- nextAction

### POST /api/login
Request body:
- email
- password

Response:
- token
- participantId

### POST /api/activity/submit
Request body:
- participantId
- seasonDay
- durationMinutes
- activityType
- source
- deviceId (optional)
- manualSubmission (boolean)

Response:
- status
- message
- updatedSeasonStatus

### GET /api/season/status
Query parameters:
- participantId
- seasonId

Response:
- currentDay
- activeStatus
- redemptionDaysRemaining
- nextEliminationCheck

### GET /api/draws/eligible
Query parameters:
- seasonId
- drawNumber

Response:
- eligibleCount
- drawDate
- eligibilityCriteria

### POST /api/draws/winner
Request body:
- seasonId
- drawNumber
- selectedWinnerId
- confirmationTimestamp

Response:
- status
- winnerId
- notificationSent

## Error Handling
Common error responses:
- 400 Bad Request: invalid or missing fields
- 401 Unauthorized: invalid or expired token
- 404 Not Found: participant or season not found
- 500 Internal Server Error: platform error

## Data Model Notes
- Participant records include account status, movement history, device sync metadata, and eligibility flags.
- Season records include daily completion status, Redemption Day usage, and elimination timestamps.
- Draw records include eligible pool size, selection metadata, and winner notification history.
