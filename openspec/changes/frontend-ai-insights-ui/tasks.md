## 1. API Integration

- [x] 1.1 In `frontend/src/api.js`, add the `getAIInsights` function to make a `GET` request to the `/ai_insights` endpoint.

## 2. Component Implementation

- [x] 2.1 Create the `AIInsights.jsx` file in `frontend/src/components/dashboard/`.
- [x] 2.2 Implement state management for `insights`, `loading`, `generating`, and `error`.
- [x] 2.3 Create the `fetchInsights` function and call it via `useEffect` on mount.
- [x] 2.4 Create the `handleGenerateInsights` function that calls the generation API and then refetches insights.
- [x] 2.5 Build the UI for the loading state (spinning robot).
- [x] 2.6 Build the UI for the error state (dismissible alert box).
- [x] 2.7 Build the UI for the empty state (no insights yet).
- [x] 2.8 Build the UI for the populated state, iterating over the `insights` array to render styled cards.
- [x] 2.9 Style the "Generate Insights" button, ensuring it responds to the `generating` state.

## 3. Dashboard Integration

- [x] 3.1 Open `frontend/src/pages/DashboardPage.jsx`.
- [x] 3.2 Import the `AIInsights` component.
- [x] 3.3 Add the component to the page layout, positioned below the `DashboardSummary` component.
