## Context

The user dashboard requires a summary section that highlights key metrics: Total Subjects, Pending Activities, and Completion Rate. This design outlines how the frontend component is structured to fetch and display this data dynamically.

## Goals / Non-Goals

**Goals:**
- Design a React component that fetches data from the backend `/summary` endpoint.
- Provide a visually appealing layout with gradient cards and icons for each metric.
- Include a progress bar for the completion rate.
- Handle loading and error states gracefully.

**Non-Goals:**
- Modifying or implementing the backend logic for calculating the summary (this is assumed to be handled by an existing endpoint).

## Decisions

### 1. Component Structure

We will create a new component `DashboardSummary.jsx` in the `src/components/dashboard` directory.

- **State Management:** The component will use React `useState` to manage `summaryData`, `loading`, and `error` states.
- **Data Fetching:** It will use `useEffect` to call the `getDashboardSummary` API function on mount.

### 2. UI Design

- **Layout:** The summary will use a CSS Grid layout (`grid-cols-1 md:grid-cols-3`) to display the three metrics responsively.
- **Visuals:** Each metric will be displayed inside a card with a subtle gradient background, an icon, and a large, bold value text. The Completion Rate card will additionally feature a horizontal progress bar.
- **Feedback:** 
  - A loading spinner will be shown while fetching data.
  - An error message block will be shown if the API call fails.

### 3. API Integration

- **Decision:** Add a function `getDashboardSummary` to `src/api.js` to handle the `GET /summary` request using the existing Axios client.

## Risks / Trade-offs

- **[Risk] API Dependency:** The component relies on the `/summary` endpoint. If the endpoint is slow or down, the dashboard experience degrades.
  - **Mitigation:** Proper loading states and error handling ensure the UI doesn't break, informing the user of the issue.
