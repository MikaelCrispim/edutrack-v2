## Context

The current dashboard is minimalist and does not provide users with aggregated data on their academic progress. The proposal outlines the need for a more informative dashboard with progress indicators and AI-driven insights. This design document details the technical approach to implement these new features.

## Goals / Non-Goals

**Goals:**

-   Design the frontend components for the `DashboardSummary` and `AIInsights`.
-   Define the API endpoints required to support the new frontend components.
-   Outline the backend logic for calculating progress metrics and generating AI insights.
-   Propose a database schema for storing AI-generated insights.

**Non-Goals:**

-   This design does not cover the specific implementation details of the AI model for generating insights. It will focus on the integration with a hypothetical AI service.
-   The UI/UX design will be functional, with a focus on clear data presentation. A full-fledged visual design is out of scope.

## Decisions

### 1. Frontend Components

-   **`DashboardSummary.jsx`**: A new component will be created to display the progress indicators. It will fetch data from the `/api/dashboard/summary` endpoint. The component will be a simple display of stats like "Total Subjects", "Pending Activities", and "Completion Rate".
-   **`AIInsights.jsx`**: A new component to display insights from the `/api/ai/insights` endpoint. It will render the AI-generated text in a clear and readable format.
-   **`DashboardPage.jsx`**: The main dashboard page will be updated to include the `DashboardSummary` and `AIInsights` components. They will be arranged to provide a comprehensive overview at the top of the page.

### 2. Backend API Endpoints

-   **`GET /api/dashboard/summary`**: This endpoint will return a JSON object with the user's progress metrics.
    -   **Request**: None
    -   **Response**:
        ```json
        {
          "totalSubjects": 5,
          "pendingActivities": 10,
          "completionPercentage": 45.5
        }
        ```
-   **`GET /api/ai/insights`**: This endpoint will return AI-generated insights for the user.
    -   **Request**: None
    -   **Response**:
        ```json
        {
          "insights": [
            {
              "id": "insight-1",
              "text": "You are doing great in 'Introduction to Programming'! Consider exploring advanced topics.",
              "createdAt": "2026-04-04T10:00:00Z"
            },
            {
              "id": "insight-2",
              "text": "You have a few pending tasks in 'Data Structures'. Try to complete them this week to stay on track.",
              "createdAt": "2026-04-03T15:30:00Z"
            }
          ]
        }
        ```

### 3. Backend Logic

-   **Progress Calculation**: The backend will need to query the `subjects` and `academic_tasks` tables to calculate the total number of subjects, pending tasks, and the overall completion percentage. This logic will be encapsulated in a service that the `/api/dashboard/summary` endpoint will use.
-   **AI Insight Generation**: The `/api/ai/insights` endpoint will be responsible for generating and retrieving insights.
    -   **Generation**: A scheduled task or a trigger on task completion could initiate the AI insight generation process. This process would involve sending the user's progress data to an AI service (e.g., a custom model or a third-party API) and storing the result in the `ai_insights` table.
    -   **Retrieval**: The endpoint will fetch the latest insights for the user from the `ai_insights` table.

### 4. Database Schema

-   A new table `ai_insights` will be created to store the generated insights.

    | Column      | Type      | Description                               |
    |-------------|-----------|-------------------------------------------|
    | `id`        | `uuid`    | Primary key                               |
    | `user_id`   | `uuid`    | Foreign key to the `users` table          |
    | `text`      | `text`    | The AI-generated insight text             |
    | `created_at`| `timestamp`| When the insight was generated            |

## Risks / Trade-offs

-   **AI Service Dependency**: The AI insights feature is dependent on an external or internal AI service. If the service is unavailable or slow, it will impact the user experience.
    -   **Mitigation**: Implement caching for the AI insights to reduce the number of calls to the AI service and to have stale data available if the service is down. Implement proper error handling and display a graceful message to the user if insights cannot be fetched.
-   **Performance**: The calculation of progress metrics could be slow if there is a large amount of data.
    -   **Mitigation**: The progress summary can be pre-calculated and cached. The calculation can be updated via triggers when underlying data changes, or run as a periodic background job.
