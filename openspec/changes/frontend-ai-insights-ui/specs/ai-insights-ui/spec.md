## ADDED Requirements

### Requirement: Display Existing AI Insights
The system SHALL display a list of previously generated AI insights on the user's dashboard.

#### Scenario: User views the dashboard with existing insights
- **GIVEN** the user has previously generated insights
- **WHEN** the user navigates to the dashboard page
- **THEN** the system SHALL fetch the insights from the backend.
- **AND** the system SHALL display each insight with its text and creation timestamp.

#### Scenario: User views the dashboard with no insights
- **GIVEN** the user has never generated insights
- **WHEN** the user navigates to the dashboard page
- **THEN** the system SHALL display a welcoming empty state indicating that no insights are available yet.

### Requirement: Manual Insight Generation
The system SHALL allow the user to manually trigger the generation of new AI insights from the dashboard.

#### Scenario: User triggers insight generation successfully
- **WHEN** the user clicks the "Generate Insights" button
- **THEN** the system SHALL display a loading indicator and disable the button.
- **AND** the system SHALL send a request to the backend to generate insights.
- **AND** upon successful generation, the system SHALL automatically refresh the list of displayed insights.

#### Scenario: User triggers insight generation but backend fails
- **WHEN** the user clicks the "Generate Insights" button
- **AND** the backend request fails (e.g., due to rate limiting or service error)
- **THEN** the system SHALL display an error message to the user.
- **AND** the system SHALL re-enable the "Generate Insights" button.
