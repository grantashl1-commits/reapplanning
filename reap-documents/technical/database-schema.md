# REAP Database Schema
**Sport Waikato Incorporated | Technical Reference**

## Tables

### Participants
- id (PK)
- name
- email
- dateOfBirth
- passwordHash
- consentResearch
- accountStatus
- createdAt
- updatedAt

### Seasons
- id (PK)
- participantId (FK)
- seasonStart
- currentDay
- status
- redemptionDaysUsed
- eliminatedAt
- createdAt
- updatedAt

### ActivityRecords
- id (PK)
- participantId (FK)
- seasonId (FK)
- seasonDay
- durationMinutes
- activityType
- source
- deviceId
- manualSubmission
- recordedAt
- syncedAt

### RedemptionDays
- id (PK)
- participantId (FK)
- seasonId (FK)
- dayUsed
- createdAt

### PrizeDraws
- id (PK)
- seasonId (FK)
- drawNumber
- eligibleCount
- winnerParticipantId (FK)
- drawTimestamp
- wonAmount
- createdAt

### Disputes
- id (PK)
- participantId (FK)
- seasonId (FK)
- seasonDay
- issueType
- description
- status
- reviewedAt
- createdAt

### SupportCases
- id (PK)
- participantId (FK)
- subject
- details
- status
- priority
- assignedTo
- createdAt
- updatedAt

## Relationships
- Participants -> Seasons: one-to-many
- Seasons -> ActivityRecords: one-to-many
- Seasons -> RedemptionDays: one-to-many
- Seasons -> PrizeDraws: one-to-many
- Participants -> Disputes: one-to-many
- Participants -> SupportCases: one-to-many
