## 1. API Integration

- [x] 1.1 In `frontend/src/api.js`, add the `getDashboardSummary` function to make a `GET` request to the `/summary` endpoint.

## 2. Component Implementation

- [x] 2.1 Create the `DashboardSummary.jsx` file in `frontend/src/components/dashboard/`.
- [x] 2.2 Implement state management for `summaryData`, `loading`, and `error`.
- [x] 2.3 Implement the `useEffect` hook to fetch data on component mount.
- [x] 2.4 Build the UI for the loading state (spinner).
- [x] 2.5 Build the UI for the error state (red alert box).
- [x] 2.6 Build the main grid layout for the statistics.
- [x] 2.7 Create the cards for Total Subjects, Pending Activities, and Completion Rate, incorporating styling and the progress bar.

## 3. Dashboard Integration

- [x] 3.1 Open `frontend/src/pages/DashboardPage.jsx`.
- [x] 3.2 Import the `DashboardSummary` component.
- [x] 3.3 Add the component to the page layout, positioned below the header and above the Subjects list.
