## Why

While the backend logic for generating AI insights exists, the frontend requires an interface to display these insights to the user. Additionally, giving the user the ability to manually request new insights enhances interactivity and ensures they can get immediate feedback when needed.

## What Changes

- A new `AIInsights` component is added to the dashboard.
- The component fetches previously generated insights via the `/ai_insights` endpoint and displays them.
- A "Generate Insights" button is provided to call the `/generate_insights` endpoint manually, triggering the backend process and refreshing the displayed insights.
- The dashboard layout is updated to feature this component.

## Capabilities

### New Capabilities

- `ai-insights-ui`: Provides a user interface for viewing personalized AI recommendations and an interactive element to trigger the generation process.

### Modified Capabilities

- `dashboard`: Enhanced to include the AI Insights component.

## Impact

- **Frontend**: A new `AIInsights.jsx` component is implemented. The `DashboardPage.jsx` is updated to include it. An API call function `getAIInsights` is added to `api.js` (the `generateAIInsights` function was previously defined in the backend implementation tasks).
- **Backend**: Relies on the endpoints defined in the `ai-insight-generation-mechanism` change.
