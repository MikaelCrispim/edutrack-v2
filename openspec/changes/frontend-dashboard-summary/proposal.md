## Why

The application dashboard needs clear indicators to help users quickly understand their academic progress. Without an at-a-glance summary, users have to manually count their subjects, pending tasks, and completion rates. Displaying these metrics provides immediate, valuable feedback and improves the overall user experience.

## What Changes

- A new `DashboardSummary` component is added to the dashboard.
- The component fetches progress data (total subjects, pending activities, completion percentage) from the backend API `/summary`.
- The dashboard layout is updated to accommodate this new section at the top of the page.

## Capabilities

### New Capabilities

- `dashboard-summary`: Provides a visual summary of the user's progress, including statistics for subjects and tasks.

### Modified Capabilities

- `dashboard`: Enhanced to include the new summary metrics component.

## Impact

- **Frontend**: A new `DashboardSummary.jsx` component is implemented. The `DashboardPage.jsx` is updated to render this component. An API call function `getDashboardSummary` is added to `api.js`.
- **Backend**: Assumes the existence of a `/summary` endpoint that calculates and returns these metrics.
