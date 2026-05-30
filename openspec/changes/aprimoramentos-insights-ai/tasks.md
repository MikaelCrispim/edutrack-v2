## 1. API Integration
- [x] 1.1 In `frontend/src/api.js`, add `deleteAIInsight(id)` that makes a `DELETE` request to `/ai_insights/${id}`.

## 2. Component Implementation (`AIInsights.jsx`)
- [x] 2.1 Import `deleteAIInsight` in `AIInsights.jsx`.
- [x] 2.2 Add a new state `deletingId` to track which insight is currently being deleted (to show a spinner on that specific card).
- [x] 2.3 Create a function `handleDeleteInsight(id)` that calls the API, handles errors, and then calls `fetchInsights()` to refresh the list.
- [x] 2.4 Update the insight card JSX to include a delete button (e.g., a trash can icon `🗑️`).
- [x] 2.5 Style the delete button to be visually distinct but unobtrusive (e.g., positioned absolute top-right, visible on hover, or simply grayed out until hovered).
- [x] 2.6 Refine the overall CSS classes for the insight cards to improve readability (e.g., adjusting margins, padding, or shadow).
