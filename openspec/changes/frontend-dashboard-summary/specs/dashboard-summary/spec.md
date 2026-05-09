## ADDED Requirements

### Requirement: Display Dashboard Summary Metrics
The system SHALL display a visual summary of the user's progress on the main dashboard.

#### Scenario: User views the dashboard
- **WHEN** the user navigates to the dashboard page
- **THEN** the system SHALL fetch the user's summary metrics (Total Subjects, Pending Activities, Completion Percentage) from the backend.
- **AND** the system SHALL display a loading indicator while the data is being fetched.
- **AND** upon successful retrieval, the system SHALL display the metrics in clearly separated cards.

#### Scenario: Backend fails to return summary data
- **WHEN** the user navigates to the dashboard page
- **AND** the request to fetch summary metrics fails
- **THEN** the system SHALL display a user-friendly error message within the summary section.
- **AND** the rest of the dashboard SHALL continue to function normally.
