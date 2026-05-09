## 1. Backend Implementation

- [x] 1.1 Create the `ai_insights` table in the database with the schema defined in the design document.
- [x] 1.2 Implement the `GET /api/dashboard/summary` endpoint. This includes creating the service to calculate the progress metrics.
- [x] 1.3 Implement the `GET /api/ai/insights` endpoint. This includes the logic to fetch the latest insights from the `ai_insights` table.
- [ ] 1.4 (Optional) Implement the AI insight generation logic. This can be a scheduled task or a trigger-based system that calls an AI service and stores the results in the `ai_insights` table. (skipped)

## 2. Frontend Implementation

- [x] 2.1 Create the `DashboardSummary.jsx` component.
- [x] 2.2 Connect the `DashboardSummary.jsx` component to the `/api/dashboard/summary` endpoint.
- [x] 2.3 Create the `AIInsights.jsx` component.
- [x] 2.4 Connect the `AIInsights.jsx` component to the `/api/ai/insights` endpoint.
- [x] 2.5 Update the `DashboardPage.jsx` to integrate the `DashboardSummary.jsx` and `AIInsights.jsx` components.

## 3. Testing

- [ ] 3.1 Write unit tests for the new backend endpoints. (skipped)
- [x] 3.2 Write unit tests for the new frontend components.
- [ ] 3.3 Perform end-to-end testing to ensure the new dashboard features work as expected. (skipped)
