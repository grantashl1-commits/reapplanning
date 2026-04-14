# Zone 2 Heart Rate Detection Algorithm

**Prepared by:** Dev Team  
**Date:** April 9, 2026  
**Status:** Draft

## Purpose
Define the algorithm for calculating each participant’s Zone 2 range and verifying sustained movement minutes.

## Requirements
- Zone 2 defined as 50–70% of max heart rate
- Max heart rate estimate by formula, with manual override
- Continuous movement session defined as at least 21 uninterrupted minutes in Zone 2
- Allow small gaps for sampling delays, but not session breaks

## Calculation Steps
1. Calculate max HR:
   - Default: 220 − age
   - Alternative: 208 − (0.7 × age)
   - Allow manual participant input if provided
2. Determine Zone 2 range:
   - Lower bound: 0.50 × max HR
   - Upper bound: 0.70 × max HR
3. Process wearable session data:
   - Identify heart rate data points within Zone 2
   - Recognize contiguous intervals of 21 minutes
   - Exclude rest periods or data gaps > 60 seconds

## Validation
- Record whether daily requirement is met by 23:59 NZT
- Store evidence of the session and data source
- Flag suspicious data for manual review

## Notes
- Manual submission may require Sport Waikato review
- Use transactional logs for audit purposes
