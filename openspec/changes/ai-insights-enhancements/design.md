## Context

This document covers the design for adding deletion functionality and visual improvements to the AI Insights feature.

## Goals / Non-Goals

**Goals:**
- Allow users to delete specific AI insights.
- Refresh the insight list automatically upon successful deletion.
- Improve the spacing, typography, or visual grouping of insights in the UI.

**Non-Goals:**
- Implementing "Edit" functionality for insights (insights are AI-generated and shouldn't be edited by the user).

## Decisions

### 1. API Integration
- **Decision:** Add a `deleteAIInsight(id)` function to `src/api.js` that calls `DELETE /ai_insights/{id}`.

### 2. UI Updates in `AIInsights.jsx`
- **Delete Button:** Add a small, discrete trash can icon button to the top-right corner of each insight card.
- **Confirmation (Optional but recommended):** When clicked, the button will immediately trigger the delete action and show a loading state on the specific card or the whole container, then refetch the list.
- **Visual Improvements:** Adjust padding, borders, or colors to ensure each insight card stands out clearly, preventing visual fatigue if the user has many insights.

## Risks / Trade-offs
- **[Risk] Accidental Deletion:** Without a confirmation dialog, a user might accidentally delete an insight.
  - **Mitigation:** The impact is low since insights are dynamically generated advice. We will prioritize a fast, click-to-delete interaction over a slow confirmation dialog.
