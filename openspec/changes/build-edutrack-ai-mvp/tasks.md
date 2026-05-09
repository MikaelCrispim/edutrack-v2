## 1. Backend Setup (Xano)

- [x] 1.1 **[Xano Table Designer]** Create the `users` table. (Note: Xano's default user table should be used and extended if necessary, as per `xanoscript-dev-guide.md`).
- [x] 1.2 **[Xano Table Designer]** Create the `subjects` table with fields: `name` (text), `professor` (text), `course_load` (integer), `description` (text), `start_date` (timestamp), `end_date` (timestamp), and a relationship to the `users` table.
- [x] 1.3 **[Xano Table Designer]** Create the `academic_tasks` table with fields: `title` (text), `description` (text), `due_date` (timestamp), `status` (text), and a relationship to the `subjects` table.

## 2. User Authentication (Xano)

- [x] 2.1 **[Xano API Query Writer]** Implement the `/auth/signup` API endpoint as per the `user-auth` spec.
- [x] 2.2 **[Xano API Query Writer]** Implement the `/auth/login` API endpoint as per the `user-auth` spec.
- [x] 2.3 **[Xano API Query Writer]** Implement the `/auth/password-reset` API endpoint as per the `user-auth` spec.
- [x] 2.4 **[Xano Unit Test Writer]** Write unit tests for the authentication endpoints.

## 3. Subject Management (Xano)

- [x] 3.1 **[Xano API Query Writer]** Create CRUD API endpoints for `/subjects` (Create, Read, Update, Delete) as per the `subject-management` spec. Endpoints must be authenticated.
- [x] 3.2 **[Xano Unit Test Writer]** Write unit tests for the `/subjects` endpoints, ensuring users can only access their own subjects.

## 4. Task Management (Xano)

- [x] 4.1 **[Xano API Query Writer]** Create CRUD API endpoints for `/tasks` (Create, Read, Update, Delete) as per the `task-management` spec. Endpoints must be authenticated.
- [x] 4.2 **[Xano Unit Test Writer]** Write unit tests for the `/tasks` endpoints.

## 5. Dashboard Logic (Xano & Node.js)

- [x] 5.1 **[Xano Function Writer]** Create a Xano function `calculate_subject_progress` that takes a `subject_id` and returns the completion percentage based on its tasks.
- [x] 5.2 **[Xano API Query Writer]** Create a `/dashboard` API endpoint that aggregates data for the user, calling `calculate_subject_progress` for each subject.
- [x] 5.3 **[Node.js]** (Future) Set up a Node.js service for more complex calculations (out of scope for initial MVP tasks, but preparing for it).

## 6. Frontend Implementation (React/React Native)

- [x] 6.1 **[Frontend Developer]** Initialize a new React/React Native project.
- [x] 6.2 **[Frontend Developer]** Build the UI components for login, registration, and password reset.
- [x] 6.3 **[Frontend Developer]** Integrate the UI with the `/auth` API endpoints.
- [x] 6.4 **[Frontend Developer]** Build the UI components for creating, viewing, editing, and deleting subjects.
- [x] 6.5 **[Frontend Developer]** Integrate the subject UI with the `/subjects` API endpoints.
- [ ] 6.6 **[Frontend Developer]** Build the UI components for task management within a subject.
- [ ] 6.7 **[Frontend Developer]** Integrate the task UI with the `/tasks` API endpoints.
- [ ] 6.8 **[Frontend Developer]** Build the dashboard UI to display subject progress and charts.
- [ ] 6.9 **[Frontend Developer]** Integrate the dashboard UI with the `/dashboard` API endpoint.
