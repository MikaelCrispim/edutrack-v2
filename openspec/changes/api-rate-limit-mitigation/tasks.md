## 1. API Client Enhancements
- [ ] 1.1 Install `axios-retry` and `axios-cache-interceptor` via npm in the `frontend` directory.
- [ ] 1.2 In `frontend/src/api.js`, configure `axios-retry` to intercept `429` status codes and retry with a delay.
- [ ] 1.3 In `frontend/src/api.js`, wrap the `axios.create` instance with `setupCache` from `axios-cache-interceptor`, configuring a short TTL (e.g., 5-10 seconds) for `GET` requests to handle the initial dashboard load burst.

## 2. Cache Invalidation Strategy
- [ ] 2.1 Ensure that mutation methods (e.g., `createSubject`, `updateTask`) are configured to clear or ignore the cache so subsequent `GET` requests fetch fresh data.

## 3. Dashboard Component Review
- [ ] 3.1 Review `DashboardPage.jsx` to ensure loading spinners are present while data is being fetched (especially during retries).
- [ ] 3.2 Identify any deeply nested components that are making unnecessary duplicate calls and refactor them to use props or rely on the cached API client if necessary.
