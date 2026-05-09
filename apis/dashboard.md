# API Endpoints: /dashboard

This document outlines the specifications for the API endpoints for the user dashboard.

**Authentication**: All endpoints listed here MUST be protected and require a valid user authentication token.

---

## 1. Get Dashboard Summary

-   **Method**: `GET`
-   **Endpoint**: `/dashboard/summary`
-   **Description**: Retrieves a summary of the user's academic progress.

### Inputs
None.

### Function Logic
1.  Get the authenticated user's ID (`auth.id`).
2.  Query the `subjects` table to get the total count of subjects for the user.
3.  Query the `academic_tasks` table to get the count of pending activities for the user.
4.  Calculate the overall completion percentage of activities.
5.  Return a JSON object with `totalSubjects`, `pendingActivities`, and `completionPercentage`.

---

## 2. Get AI Insights

-   **Method**: `GET`
-   **Endpoint**: `/dashboard/insights`
-   **Description**: Retrieves AI-generated insights for the user.

### Inputs
None.

### Function Logic
1.  Get the authenticated user's ID (`auth.id`).
2.  Query the `ai_insights` table to get the latest insights for the user.
3.  Return a JSON object containing a list of AI-generated insights.
