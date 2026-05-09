## Why

The application currently lacks key indicators for users to track their academic progress effectively. Displaying metrics like subject counts, pending tasks, and completion percentages will provide immediate, valuable feedback. Furthermore, incorporating AI-generated insights will offer personalized guidance, helping users identify areas for improvement and focus their efforts more strategically.

## What Changes

-   A new dashboard summary section will be added to display key progress indicators.
-   An AI-powered insights section will be introduced to provide users with personalized feedback and suggestions.
-   Backend services will be developed to calculate progress metrics and generate AI insights.

## Capabilities

### New Capabilities

-   `dashboard-summary`: Provides users with a clear, at-a-glance view of their academic progress, including the number of subjects, pending activities, and completion rates.
-   `ai-insights`: Delivers personalized, AI-driven feedback and recommendations to help users understand their progress, identify strengths and weaknesses, and discover opportunities for improvement.

### Modified Capabilities

-   None

## Impact

-   **Frontend**: New components will be created for the dashboard summary and AI insights. The main dashboard page will be updated to include these new components.
-   **Backend**: New API endpoints will be required to serve the data for the new dashboard features. This will likely involve new logic for calculating progress and integrating with an AI service.
-   **Database**: A new table may be needed to store the AI-generated insights for each user.
