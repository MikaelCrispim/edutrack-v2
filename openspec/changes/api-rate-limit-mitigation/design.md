## Context

This document outlines the technical design for mitigating Xano's API rate limits (10 requests / 20 seconds) on the frontend application, specifically to prevent failures on the main dashboard page.

## Goals / Non-Goals

**Goals:**
- Prevent the application from breaking when hitting the Xano 429 rate limit.
- Reduce the total number of redundant API calls made on initial load.
- Implement an automatic retry mechanism for failed requests due to rate limiting.

**Non-Goals:**
- Upgrading the Xano backend plan.
- Rewriting the entire state management to a complex tool like Redux or React Query (we aim for a lighter, quicker mitigation first).

## Decisions

### 1. API Request Caching
- **Decision:** We will implement simple caching for `GET` requests in `frontend/src/api.js`. We can use `axios-cache-interceptor` to cache responses for a short period (e.g., 5-10 seconds). If two components request `/subjects` at the same time, only one network request will be made; the other will receive the cached promise or result.

### 2. Automatic Retries
- **Decision:** We will integrate `axios-retry` into the `apiClient`. It will be configured to intercept responses with a `429 Too Many Requests` status code and automatically retry the request with an exponential backoff strategy (or a fixed delay).

### 3. Dashboard Fetch Optimization
- **Decision:** We will review `DashboardPage.jsx` and components like `TasksList`, `SubjectsList`, and `AIInsights`. If they are independently fetching the same data (e.g., `getAllTasks` and `getSubjects`), we will hoist the fetching logic to `DashboardPage.jsx` and pass the data as props, or rely entirely on the new axios cache. Given the time constraints, relying on the `axios-cache-interceptor` is the least intrusive and most effective immediate fix.

## Risks / Trade-offs
- **[Risk] Stale Data:** Caching `GET` requests might lead to users seeing stale data immediately after a mutation (e.g., adding a subject).
  - **Mitigation:** Ensure that mutations (`POST`, `PUT`, `DELETE`, `PATCH`) automatically invalidate the relevant cache entries, or keep the cache TTL (Time To Live) very short (e.g., 5 seconds) just enough to survive the initial page load burst.
- **[Risk] Slower Perceived Load on Retry:** If a request hits the rate limit and retries after a few seconds, the user will experience a delay.
  - **Mitigation:** Ensure loading states are properly displayed in the UI so the user knows the app is still working.
