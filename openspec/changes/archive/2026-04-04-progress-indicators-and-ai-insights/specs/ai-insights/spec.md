## ADDED Requirements

### Requirement: Display AI-Generated Insights
The system SHALL display AI-generated insights on the user's dashboard.

#### Scenario: User views AI insights
- **WHEN** a user navigates to the dashboard
- **THEN** the system SHALL display a list of personalized, AI-generated insights related to their academic progress.

### Requirement: Fetch AI-Generated Insights
The system SHALL provide an API endpoint to fetch AI-generated insights.

#### Scenario: Frontend fetches AI insights
- **WHEN** the frontend sends a GET request to `/api/ai/insights`
- **THEN** the backend SHALL return a JSON object containing a list of AI-generated insights, each with text and a creation date.
