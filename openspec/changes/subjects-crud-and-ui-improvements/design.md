## Context

The current implementation of the subjects module in the frontend is incomplete. It only allows for listing and creating subjects with a minimal set of fields. The UI is basic and does not provide a good user experience. This design document outlines the technical approach to extend the functionality to full CRUD and improve the user interface.

## Goals / Non-Goals

**Goals:**
- To implement full CRUD (Create, Read, Update, Delete) functionality for subjects.
- To improve the UI/UX of the subjects module by introducing a card-based layout and separating the form from the list.
- To ensure the frontend correctly communicates with the existing backend API endpoints for all CRUD operations.

**Non-Goals:**
- This design does not cover any changes to the backend API. It assumes the necessary endpoints (`GET`, `POST`, `PATCH`/`PUT`, `DELETE` for `/subjects`) are already available and functional.
- It does not include the implementation of real-time updates (e.g., via WebSockets).
- It does not cover authentication or authorization aspects, which are handled by `ProtectedRoute.jsx`.

## Decisions

1.  **Component Structure:**
    *   `SubjectList.jsx`: This component will be responsible for fetching and displaying the list of subjects. It will render individual `SubjectCard` components and will also contain the "Add Subject" button that navigates to the creation page.
    *   `SubjectCard.jsx`: A new presentational component to display a single subject's details in a card format. It will include "Edit" and "Delete" buttons.
    *   `SubjectCreate.jsx`: This component will host the form for creating a new subject. It will be a separate page/route.
    *   `SubjectEdit.jsx`: This new component will host the form for editing an existing subject. It will be pre-filled with the subject's current data.
    *   `api.js`: This file will be updated to include functions for `updateSubject(id, data)` and `deleteSubject(id)`.

2.  **Routing:**
    *   `/subjects`: The main route, handled by `SubjectList.jsx`.
    *   `/subjects/new`: The route for `SubjectCreate.jsx`.
    *   `/subjects/:id/edit`: The route for `SubjectEdit.jsx`.

3.  **Data Flow for Edit:**
    *   User clicks the "Edit" button on a `SubjectCard`.
    *   The application navigates to `/subjects/:id/edit`.
    *   `SubjectEdit.jsx` fetches the subject's data using the `id` from the URL parameters.
    *   The form is pre-populated with the fetched data.
    *   User modifies the data and submits the form.
    *   The `updateSubject` API call is made.
    *   Upon successful update, the user is navigated back to the `/subjects` list.

4.  **Data Flow for Delete:**
    *   User clicks the "Delete" button on a `SubjectCard`.
    *   A confirmation dialog will be shown to prevent accidental deletion.
    *   If confirmed, the `deleteSubject` API call is made.
    *   Upon successful deletion, the subject is removed from the local state in `SubjectList.jsx`, causing the UI to re-render without the deleted item.

5.  **Styling:**
    *   Simple, clean CSS will be used to create the card layout. Flexbox or CSS Grid will be used for responsiveness.
    *   No new CSS frameworks will be introduced. The styling will be consistent with the existing `App.css` and `index.css`.

## Risks / Trade-offs

-   **Risk**: The backend API endpoints might have slightly different request/response formats than anticipated.
    -   **Mitigation**: The frontend code will be written with clear API interaction modules (`api.js`) that can be easily adjusted if the backend contract differs. Thorough testing during implementation will be crucial.
-   **Trade-off**: Creating a separate `SubjectEdit.jsx` component versus using a modal for editing.
    -   **Rationale**: A separate page (`SubjectEdit.jsx`) provides a more focused user experience for editing, especially on smaller screens, and simplifies the state management of `SubjectList.jsx`. A modal would add complexity to the list component.
