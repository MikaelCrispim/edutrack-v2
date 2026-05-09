## Context

The user needs a clear, automated way to generate the AI-powered insights for their dashboard. This document provides the technical design for a backend process that generates and stores these insights. We are choosing to store the insights in a table rather than generating them on every page load for several key reasons:

-   **Performance:** AI generation can be slow. Pre-calculating and storing insights ensures the dashboard loads quickly.
-   **Cost:** Most AI services charge per API call. Generating insights only when data changes, rather than on every view, significantly reduces operational costs.
-   **User Experience:** Storing insights allows us to build a history of advice for the user and prevents them from seeing inconsistent or slightly different advice on every page refresh.

## Goals / Non-Goals

**Goals:**

-   Design a new Xano function responsible for generating AI insights.
-   Define a trigger mechanism for when this function should run.
-   Specify the data gathering, prompt construction, and AI service interaction.
-   Propose a rate-limiting strategy to prevent excessive executions.

**Non-Goals:**

-   This design will not specify the exact AI model to use (e.g., GPT-4, Gemini, etc.), but it will assume a standard API interaction.
-   This design will not cover the billing or account setup for the external AI service.

## Decisions

### 1. Insight Generation Trigger

We will use a **webhook-based trigger**. A new API endpoint will be created that, when called, will execute the insight generation logic. The frontend will be responsible for calling this endpoint at an appropriate time.

-   **Decision:** Create a new API endpoint: `POST /ai/generate-insights`.
-   **Rationale:** This approach gives the frontend control over when to trigger a new insight generation. A good place to call this would be after a user completes an academic task. This is more flexible than a rigid database trigger or time-based schedule.

### 2. Rate Limiting

To prevent the `generate-insights` endpoint from being called too frequently, we will implement a time-based rate limit.

-   **Decision:** Add a new timestamp field to the `users` table called `last_insight_generated_at`.
-   **Logic:**
    1.  When the `POST /ai/generate-insights` endpoint is called, it will first check the `last_insight_generated_at` timestamp for the authenticated user.
    2.  If the timestamp is less than a defined period (e.g., 24 hours) in the past, the function will exit early without generating new insights.
    3.  If enough time has passed (or the timestamp is null), the function will proceed with insight generation and update the timestamp to the current time upon completion.

### 3. "Generate Insights" Function Design

This will be a new function in Xano linked to the `POST /ai/generate-insights` endpoint.

**Function Stack:**

1.  **Get User Data:** Get the record for the authenticated user (`auth.id`) and check the `last_insight_generated_at` field. Compare it to the current time and halt execution if not enough time has passed.
2.  **Gather Academic Context:**
    -   Query all records from the `subjects` table belonging to the user.
    -   Query all records from the `academic_tasks` table belonging to the user.
3.  **Construct AI Prompt:**
    -   Create a text variable that will serve as the prompt for the AI. This prompt should be structured to provide clear context.
    -   **Example Prompt:**
        ```
        You are an academic advisor AI for the Edutrack application. A student needs personalized insights based on their current academic load.

        Here is the student's data:
        - Subjects: [Insert a formatted list of the user's subjects]
        - Academic Tasks: [Insert a formatted list of the user's tasks, including their status (e.g., pending, complete) and due dates]

        Please generate 2-3 brief, actionable insights for this student. Focus on upcoming deadlines, subjects where they are falling behind, or subjects where they are excelling. Frame the advice in a positive and encouraging tone. Return the insights as a JSON array of strings.
        ```
4.  **Call External AI Service:**
    -   Use the **External API Request** feature in Xano.
    -   Configure it to make a `POST` request to your chosen AI provider's API endpoint (e.g., OpenAI's chat completions endpoint).
    -   The request body will contain the prompt you constructed.
    -   **CRITICAL:** The API key for the AI service must be stored securely in your Xano environment variables, not hardcoded in the function.
5.  **Process and Store the Response:**
    -   The AI will return a response (e.g., a JSON object with the insights). Parse this response to extract the array of insight strings.
    -   Use a **Loop** to iterate through the array of insights.
    -   Inside the loop, for each insight string, use an **Add Record** step to create a new entry in the `ai_insights` table, linking it to the current user's ID.
6.  **Update User Timestamp:**
    -   After the loop, use an **Edit Record** step to update the `last_insight_generated_at` field for the user to the current timestamp.
7.  **Return Success Message:** Return a success message to the frontend.

## Risks / Trade-offs

-   **[Risk] External AI Service Failure:** The external API could be down or return an error.
    -   **Mitigation:** The "Generate Insights" function must include error handling for the external API call. If the call fails, the function should log the error and exit gracefully without updating the user's timestamp.
-   **[Risk] Slow AI Response:** The AI generation might take several seconds.
    -   **Mitigation:** This is an asynchronous process. The frontend will call the endpoint and not wait for a response. The user will see the new insights the *next* time they load their dashboard, not instantly. This is acceptable because the process is not user-blocking.
