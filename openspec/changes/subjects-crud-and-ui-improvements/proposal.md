## Why

The current subjects module lacks complete CRUD functionality and has a basic UI. This change will implement the full set of create, read, update, and delete operations and introduce a more professional and user-friendly card-based layout for displaying subjects, making the module feature-complete and improving the overall user experience.

## What Changes

- Add a form with fields for `name`, `professor`, `course_load`, `description`, `start_date`, and `end_date` for creating and editing subjects.
- Implement a "Delete" button on each subject item in the list to remove it from the system.
- Implement an "Edit" button on each subject item to allow modification of its details.
- Redesign the subject list from a plain text view to a responsive grid of cards.
- Separate the creation/edit form from the list view for a cleaner layout.

## Capabilities

### New Capabilities
- `subjects-crud`: Full create, read, update, and delete functionality for the subjects module.

### Modified Capabilities
- None

## Impact

- **Frontend:**
  - `frontend/src/components/subjects/SubjectList.jsx`: Will be significantly updated to include edit/delete buttons and a card-based UI.
  - `frontend/src/components/subjects/SubjectCreate.jsx`: Will be updated with additional form fields.
  - `frontend/src/components/subjects/SubjectEdit.jsx`: A new component will be created for editing subjects.
  - `frontend/src/api.js`: May require new functions to handle `PATCH`/`PUT` and `DELETE` requests for subjects.
- **Backend:**
  - The `DELETE /subjects/{id}` and `PATCH /subjects/{id}` (or `PUT`) endpoints will be used.
