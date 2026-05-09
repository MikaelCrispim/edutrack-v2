# API Endpoints: /subjects

This document outlines the specifications for the CRUD (Create, Read, Update, Delete) API endpoints for managing subjects.

**Authentication**: All endpoints listed here MUST be protected and require a valid user authentication token.

---

## 1. Create Subject

-   **Method**: `POST`
-   **Endpoint**: `/subjects`
-   **Description**: Creates a new subject for the authenticated user.

### Inputs
JSON body with:
- `name` (Text, required)
- `professor` (Text)
- `course_load` (Integer)
- `description` (Text)
- `start_date` (Timestamp)
- `end_date` (Timestamp)

### Function Logic
1.  Get the authenticated user's ID (`auth.id`).
2.  Use `Add Record` to create a new entry in the `subjects` table, populating the fields from the input and setting `user_id` to the authenticated user's ID.
3.  Return the newly created subject object.

---

## 2. List Subjects

-   **Method**: `GET`
-   **Endpoint**: `/subjects`
-   **Description**: Retrieves all subjects for the authenticated user.

### Inputs
None.

### Function Logic
1.  Get the authenticated user's ID (`auth.id`).
2.  Use `Query Records` on the `subjects` table, filtering by `user_id` equal to the authenticated user's ID.
3.  Return the list of subject objects.

---

## 3. Get Subject Details

-   **Method**: `GET`
-   **Endpoint**: `/subjects/{id}`
-   **Description**: Retrieves the details of a single subject.

### Inputs
- `{id}` (Integer, from URL path): The ID of the subject to retrieve.

### Function Logic
1.  Get the authenticated user's ID (`auth.id`).
2.  Use `Get Record` on the `subjects` table to find the subject by its `id`.
3.  Verify that the `user_id` of the found subject matches the authenticated user's ID. If not, return a 403 Forbidden or 404 Not Found error.
4.  Return the subject object.

---

## 4. Update Subject

-   **Method**: `PUT` or `PATCH`
-   **Endpoint**: `/subjects/{id}`
-   **Description**: Updates the details of a specific subject.

### Inputs
- `{id}` (Integer, from URL path): The ID of the subject to update.
- JSON body with the fields to update (e.g., `name`, `professor`, etc.).

### Function Logic
1.  Get the authenticated user's ID (`auth.id`).
2.  Use `Get Record` to find the subject by its `id`.
3.  Verify that the `user_id` of the subject matches the authenticated user's ID. If not, return a 403 Forbidden or 404 Not Found error.
4.  Use `Edit Record` to update the subject with the new data from the request body.
5.  Return the updated subject object.

---

## 5. Delete Subject

-   **Method**: `DELETE`
-   **Endpoint**: `/subjects/{id}`
-   **Description**: Deletes a specific subject.

### Inputs
- `{id}` (Integer, from URL path): The ID of the subject to delete.

### Function Logic
1.  Get the authenticated user's ID (`auth.id`).
2.  Use `Get Record` on the `subjects` table to find the subject by its `id`.
3.  Verify that the `user_id` of the subject matches the authenticated user's ID. If not, return a 403 Forbidden or 404 Not Found error.
4.  **Cascade Delete**: Before deleting the subject, delete all associated records in the `academic_tasks` table where `subject_id` matches.
5.  Use `Delete Record` to delete the subject.
6.  Return a success message or a 204 No Content response.
