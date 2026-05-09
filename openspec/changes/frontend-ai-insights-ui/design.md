## Context

This document outlines the design for the frontend interface of the AI Insights feature. The goal is to provide a clean, engaging UI where users can read past insights and trigger the generation of new ones directly from the dashboard.

## Goals / Non-Goals

**Goals:**
- Design a React component that fetches and displays a list of insights.
- Implement an interactive "Generate Insights" button.
- Provide clear visual feedback for loading, generating, and error states.
- Display a fallback "empty state" when no insights exist.

**Non-Goals:**
- Modifying the AI generation prompt or the backend rate-limiting logic.

## Decisions

### 1. Component Structure

We will create `AIInsights.jsx` in the `src/components/dashboard` directory.

- **State Management:**
  - `insights` (Array): Stores the list of insights.
  - `loading` (Boolean): Controls the initial fetch spinner.
  - `generating` (Boolean): Controls the spinner and disabled state of the "Generate Insights" button during generation.
  - `error` (String | null): Stores error messages for display.
- **Data Fetching:** On mount, `useEffect` calls `fetchInsights()` (which uses `getAIInsights`).

### 2. UI Design

- **Main Layout:** A styled container with a header ("AI Insights" + Robot icon) and a "Generate Insights" button on the top right.
- **Empty State:** If `insights.length === 0`, display a welcoming empty state with an invitation to complete tasks and a prominent "Generate First Insight" button.
- **Insights List:** Insights are displayed as a vertical list of visually distinct cards. Each card shows the insight text and the timestamp of creation. Emojis (⭐ for the latest, 💡 for older ones) are used to add visual interest.
- **Feedback Mechanisms:**
  - A large spinning robot emoji (`🤖`) during initial load.
  - A spinning hourglass (`⏳`) and updated text on the button during generation.
  - A dismissible red alert box for errors.

### 3. API Integration

- **Fetching:** Adds `getAIInsights` to `src/api.js` to call `GET /ai_insights`.
- **Generating:** Uses the existing `generateAIInsights` function to call `POST /generate_insights`. When generation succeeds, `fetchInsights()` is immediately called again to refresh the list.

## Risks / Trade-offs

- **[Risk] Long Generation Time:** AI generation can take a few seconds. If the user navigates away, the UI won't update.
  - **Mitigation:** The `generating` state provides immediate feedback, and the button is disabled to prevent multiple rapid clicks. The backend's 24-hour rate limit (designed previously) prevents abuse.
