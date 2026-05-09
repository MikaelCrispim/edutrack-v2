## Why

The current implementation of the AI insights feature lacks a clear mechanism for generating and populating the insights. This proposal outlines a concrete strategy for how the AI will analyze user data and why storing these insights in a dedicated table is a necessary and efficient approach.

## What Changes

-   A detailed explanation of why the `ai_insights` table is beneficial for performance, cost, and user experience.
-   A new, trigger-based Xano function will be designed to generate AI insights.
-   The new function will gather user data, construct a prompt for an AI service, and store the generated insights in the `ai_insights` table.

## Capabilities

### New Capabilities

-   `ai-insight-generation`: A backend capability that analyzes a user's academic progress, interfaces with an AI service to generate personalized advice, and stores the results.

### Modified Capabilities

-   None

## Impact

-   **Backend**: A new Xano function will need to be created. This will be the core of the insight generation logic.
-   **External Services**: This implementation will require an API key and integration with an external AI service, such as OpenAI.
-   **Database**: The `ai_insights` table will be actively used. We may also consider adding a new field to the `users` table (e.g., `last_insight_generated_at`) to manage the frequency of insight generation.
