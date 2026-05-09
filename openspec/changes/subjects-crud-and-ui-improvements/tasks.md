## 1. API Layer Enhancement

- [x] 1.1 In `frontend/src/api.js`, add a function `updateSubject(id, subjectData)` that sends a `PATCH` request to `/api/subjects/{id}`.
- [x] 1.2 In `frontend/src/api.js`, add a function `deleteSubject(id)` that sends a `DELETE` request to `/api/subjects/{id}`.
- [x] 1.3 In `frontend/src/api.js`, ensure the `createSubject` function includes all required fields: `name`, `professor`, `course_load`, `description`, `start_date`, and `end_date`.

## 2. UI Components - Form Fields

- [x] 2.1 Modify `frontend/src/components/subjects/SubjectCreate.jsx` to include form inputs for `name`, `professor`, `course_load` (number), `description` (textarea), `start_date` (date), and `end_date` (date).
- [x] 2.2 Create a new file `frontend/src/components/subjects/SubjectEdit.jsx`. This component will be very similar to `SubjectCreate.jsx` but will fetch the subject data by ID and pre-populate the form.
- [x] 2.3 Implement the logic in `SubjectEdit.jsx` to fetch the subject's data using the ID from the URL and pre-fill the form fields.
- [x] 2.4 Implement the `onSubmit` handler in `SubjectEdit.jsx` to call the `updateSubject` API function.

## 3. UI Components - List and Card Layout

- [x] 3.1 Create a new component `frontend/src/components/subjects/SubjectCard.jsx`. This component will receive a single `subject` object as a prop and display its details in a card format.
- [x] 3.2 The `SubjectCard.jsx` component must include "Edit" and "Delete" buttons.
- [x] 3.3 Update `frontend/src/components/subjects/SubjectList.jsx` to fetch the list of subjects.
- [x] 3.4 Modify `SubjectList.jsx` to render a `SubjectCard` component for each subject in a responsive grid layout. Use CSS for styling.
- [x] 3.5 Implement the "Edit" button's `onClick` handler in `SubjectCard.jsx` to navigate to the `SubjectEdit` page for the corresponding subject (`/subjects/:id/edit`).
- [x] 3.6 Implement the "Delete" button's `onClick` handler in `SubjectCard.jsx`. It should show a confirmation dialog and then call the `deleteSubject` API function.
- [x] 3.7 In `SubjectList.jsx`, update the state to remove the deleted subject from the list after a successful deletion without reloading the page.

## 4. Routing

- [x] 4.1 In your main App router (`App.jsx` or similar), add the new routes:
    - A route for `/subjects/new` pointing to `SubjectCreate.jsx`.
    - A route for `/subjects/:id/edit` pointing to `SubjectEdit.jsx`.
    - A route for `/subjects` pointing to `SubjectList.jsx`.

## 5. Styling

- [x] 5.1 Add CSS rules to `App.css` or a new dedicated stylesheet to style the subject cards, the grid layout, and the forms to look professional and clean.
- [x] 5.2 Ensure the layout is responsive and works well on different screen sizes.
