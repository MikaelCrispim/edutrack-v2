## Why

The application uses the Xano free tier for its backend, which enforces an API rate limit of 10 requests every 20 seconds. Currently, the main dashboard page triggers multiple simultaneous API calls when loading various components. This frequently causes requests to fail with a `429 Too Many Requests` error, preventing the page from loading correctly and severely impacting the user experience.

Addressing this issue is critical for the stability of the application on the free tier.

## What Changes

- **API Request Caching:** Implement a caching mechanism (using `axios-cache-interceptor` or a custom in-memory cache) in `frontend/src/api.js` to cache `GET` requests for a short duration. This will prevent redundant calls if multiple components request the same data simultaneously.
- **Automatic Retries:** Add an interceptor (like `axios-retry`) to automatically catch `429` errors and retry the request after a delay, smoothing over rate-limit spikes without showing an error to the user.
- **Optimized Data Fetching:** Review the main page (`DashboardPage.jsx` and its children) to ensure data is fetched efficiently, potentially passing data down as props instead of having each child make its own request.

## Capabilities

### Modified Capabilities

- `dashboard`: Improved stability and loading reliability.
- `global-api`: Enhanced API client with caching and retry logic.

## Impact

- **Frontend:** Modifications to `frontend/src/api.js` to add caching and retry interceptors. Potential minor refactoring in `DashboardPage.jsx` and related components to optimize data fetching.
- **Backend:** None. These changes mitigate the limitation purely on the frontend.
