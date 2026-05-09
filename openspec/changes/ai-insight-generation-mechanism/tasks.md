## 1. Xano Backend Setup

- [x] 1.1 Add the `last_insight_generated_at` timestamp field to the `users` table in your Xano database.
- [x] 1.2 Create a new API endpoint in Xano: `POST /ai/generate-insights`.
- [x] 1.3 Secure your external AI service API key in your Xano environment variables.

## 2. "Generate Insights" Function Implementation

- [x] 2.1 In the `/ai/generate-insights` endpoint, implement the logic to check the `last_insight_generated_at` timestamp and enforce the 24-hour rate limit.
- [x] 2.2 Add the logic to gather all `subjects` and `academic_tasks` for the authenticated user.
- [x] 2.3 Implement the prompt construction logic, formatting the user's data into a clear prompt for the AI.
- [x] 2.4 Add the **External API Request** step to call your chosen AI service with the constructed prompt.
- [x] 2.5 Implement error handling for the external API call.
- [x] 2.6 Implement the logic to parse the AI's response and loop through the returned insights.
- [x] 2.7 Inside the loop, add the **Add Record** logic to save each insight to the `ai_insights` table.
- [x] 2.8 After the loop, add the **Edit Record** logic to update the `last_insight_generated_at` timestamp for the user.

<!-- 
Task 1.2: Create the POST /ai/generate-insights Endpoint
In your Xano project, go to the API section.
Click the Add API Endpoint button.
Select Start from scratch.
Define the endpoint:
HTTP Verb: POST
Path: /ai/generate-insights
Click Save.
You should now have a new, empty endpoint. Make sure you also go into the endpoint's settings and enable authentication.

Task 1.3: Secure Your AI Service API Key
It's very important not to hardcode your AI service's API key. You need to store it in Xano's Environment Variables.

Go to the Settings section of your Xano project.
Find the Environment Variables tab.
Click Manage.
Add a new variable. Name it something clear, like OPENAI_API_KEY.
Paste your actual API key into the value field.
Click Save.
When you need to use this key in your function stack, you can access it through the ENV object (e.g., ENV.OPENAI_API_KEY).

Task 2.1: Implement Rate Limiting
Now, let's add the first part of the logic to the /ai/generate-insights endpoint's function stack. This will stop the function from running if it has already been run in the last 24 hours.

Go back to the API section and click on your new POST /ai/generate-insights endpoint.
The first step in your function stack is to check the last_insight_generated_at timestamp.
Add a Precondition step. This allows you to check a condition and stop execution if it's not met.
In the Precondition setup:
For the First Value, you'll need to use an expression. Click the + button and add a now filter to get the current timestamp in milliseconds, then subtract 24 hours in milliseconds (24 * 60 * 60 * 1000 = 86,400,000). The expression might look something like this in Xano's filter syntax (you may need to adjust it): now | subtract_ms(86400000).
Set the Operator to < (less than).
For the Second Value, select the authenticated user's timestamp: auth.last_insight_generated_at.
In the Then block (which runs if the condition is true, meaning not enough time has passed), add a Utility Function -> Stop & Debug. You can put a custom error message here, like "Insights can only be generated once every 24 hours."
This will ensure the rest of the function only runs if the user's last insight was generated more than 24 hours ago.

Please complete these setup steps in your Xano backend. Once you're done, I'll provide the instructions for Task 2.2. Let me know how it goes.
 -->

## 3. Frontend Integration

- [x] 3.1 In the `frontend/src/api.js` file, add a new function `generateAIInsights` that makes a `POST` request to the `/api/ai/generate-insights` endpoint.
- [x] 3.2 Decide where to call the `generateAIInsights` function. A good place would be in the `SubjectDetail.jsx` component after a user marks a task as complete.
- [x] 3.3 Call the `generateAIInsights` function from the chosen frontend component. This is a "fire-and-forget" call; you do not need to handle the response.
