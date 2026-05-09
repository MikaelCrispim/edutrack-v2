# API Endpoints: /tasks

This document outlines the specifications for the CRUD API endpoints for managing academic tasks.

**Authentication**: All endpoints must be protected. A user can only manage tasks that belong to subjects they own.

---

## 1. Create Task

-   **Method**: `POST`
-   **Endpoint**: `/tasks`
-   **Description**: Creates a new task for a given subject.

### Inputs
JSON body with:
- `title` (Text, required)
- `description` (Text)
- `due_date` (Timestamp)
- `status` (Text, default: "Pending")
- `subject_id` (Integer, required): The ID of the subject this task belongs to.

### Function Logic
1.  Get the authenticated user's ID (`auth.id`).
2.  Verify that the user owns the subject specified by `subject_id`. (Query `subjects` table where `id` is `subject_id` and `user_id` is `auth.id`). If not, return a 403 Forbidden error.
3.  Use `Add Record` to create a new entry in the `academic_tasks` table.
4.  Return the newly created task object.

---

## 2. List Tasks for a Subject

-   **Method**: `GET`
-   **Endpoint**: `/tasks`
-   **Description**: Retrieves all tasks for a specific subject.

### Inputs
- `subject_id` (Integer, required, from query parameter): The ID of the subject.

### Function Logic
1.  Get the authenticated user's ID (`auth.id`).
2.  Verify that the user owns the subject specified by `subject_id`. If not, return an empty list or a 403 Forbidden error.
3.  Use `Query Records` on the `academic_tasks` table, filtering by `subject_id`.
4.  Return the list of task objects.

---

## 3. Update Task

-   **Method**: `PUT` or `PATCH`
-   **Endpoint**: `/tasks/{id}`
-   **Description**: Updates the details of a specific task.

### Inputs
- `{id}` (Integer, from URL path): The ID of the task to update.
- JSON body with fields to update (e.g., `title`, `status`, `due_date`).

### Function Logic
1.  Get the authenticated user's ID (`auth.id`).
2.  Get the task record by its `{id}` and perform a lookup (addon) to get the parent subject's `user_id`.
3.  Verify that the subject's `user_id` matches the authenticated user's ID. If not, return a 403 Forbidden error.
4.  Use `Edit Record` to update the task.
5.  Return the updated task object.

---

## 4. Delete Task

-   **Method**: `DELETE`
-   **Endpoint**: `/tasks/{id}`
-   **Description**: Deletes a specific task.

### Inputs
- `{id}` (Integer, from URL path): The ID of the task to delete.

### Function Logic
1.  Get the authenticated user's ID (`auth.id`).
2.  Get the task record by its `{id}` and perform a lookup (addon) to get the parent subject's `user_id`.
3.  Verify that the subject's `user_id` matches the authenticated user's ID. If not, return a 403 Forbidden error.
4.  Use `Delete Record` to delete the task.
5.  Return a success message or a 204 No Content response.
