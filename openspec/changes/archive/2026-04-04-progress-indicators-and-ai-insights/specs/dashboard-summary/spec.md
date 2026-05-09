## ADDED Requirements

### Requirement: Display Dashboard Summary
The system SHALL display a summary of the user's academic progress on the dashboard.

#### Scenario: User views dashboard summary
- **WHEN** a user navigates to the dashboard
- **THEN** the system SHALL display the total number of subjects, the number of pending activities, and the overall completion percentage.

### Requirement: Fetch Dashboard Summary Data
The system SHALL provide an API endpoint to fetch the dashboard summary data.

#### Scenario: Frontend fetches summary data
- **WHEN** the frontend sends a GET request to `/api/dashboard/summary`
- **THEN** the backend SHALL return a JSON object containing `totalSubjects`, `pendingActivities`, and `completionPercentage`.
