# /tasks API Endpoint Tests

This document outlines the test cases for the `/tasks` CRUD API endpoints. All tests must be run with an authenticated user session.

## Security: Data Isolation

The primary security concern is ensuring a user can only interact with tasks belonging to subjects they own.

-   **Test Case: Accessing Another User's Tasks**
    -   **Description**: A user should NOT be able to create, read, update, or delete tasks associated with a subject they do not own.
    -   **Steps**:
        1.  Create User A and User B.
        2.  User A creates a subject (Subject A).
        3.  User B attempts to:
            -   Create a task for Subject A.
            -   List tasks for Subject A.
            -   Update or delete a task belonging to Subject A (after one is created by User A).
        4.  Assert that each attempt results in a `403 Forbidden` or similar authorization error.

## `POST /tasks` Tests

-   **Test Case 1: Successful Task Creation**
    -   **Description**: An authenticated user should be able to create a task for a subject they own.
    -   **Steps**:
        1.  Authenticate as a user and create a subject.
        2.  Send a `POST` request to `/tasks` with valid data, including the `subject_id`.
        3.  Assert that the HTTP response is `200 OK` or `201 Created`.
        4.  Assert that the response body contains the newly created task.

## `GET /tasks` Tests

-   **Test Case 1: List Tasks for a Subject**
    -   **Description**: A user should get a list of tasks for a subject they own.
    -   **Steps**:
        1.  Authenticate as a user, create a subject, and create several tasks for it.
        2.  Send a `GET` request to `/tasks` with the `subject_id` as a query parameter.
        3.  Assert that the response contains the correct list of tasks for that subject.

## `PUT /tasks/{id}` Tests

-   **Test Case 1: Update Own Task**
    -   **Description**: A user should be able to update a task that belongs to one of their subjects.
    -   **Steps**:
        1.  Authenticate, create a subject, and create a task.
        2.  Send a `PUT` request to `/tasks/{id}` with an updated status or title.
        3.  Assert that the HTTP response is `200 OK`.
        4.  Assert that the response body contains the updated task details.

## `DELETE /tasks/{id}` Tests

-   **Test Case 1: Delete Own Task**
    -   **Description**: A user should be able to delete a task that belongs to one of their subjects.
    -   **Steps**:
        1.  Authenticate, create a subject, and create a task.
        2.  Send a `DELETE` request to `/tasks/{id}`.
        3.  Assert that the HTTP response is `200 OK` or `204 No Content`.
        4.  (Optional) Verify the task is no longer listed when querying for that subject's tasks.
