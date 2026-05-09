# /subjects API Endpoint Tests

This document outlines the test cases for the `/subjects` CRUD API endpoints. All tests must be run with an authenticated user session.

## Security: Data Isolation

A critical test case that applies to **all** endpoints (`GET`, `PUT`, `DELETE`) that take a subject `{id}`.

-   **Test Case: Accessing Another User's Subject**
    -   **Description**: A user should NOT be able to read, update, or delete a subject belonging to another user.
    -   **Steps**:
        1.  Create User A and User B.
        2.  User A creates a subject.
        3.  User B attempts to `GET`, `PUT`, or `DELETE` the subject created by User A.
        4.  Assert that the HTTP response code is `403 Forbidden` or `404 Not Found` for each attempt.

## `POST /subjects` Tests

-   **Test Case 1: Successful Subject Creation**
    -   **Description**: An authenticated user should be able to create a new subject.
    -   **Steps**:
        1.  Authenticate as a user.
        2.  Send a `POST` request to `/subjects` with valid data.
        3.  Assert that the HTTP response code is `200 OK` or `201 Created`.
        4.  Assert that the response body contains the newly created subject, including a `user_id` that matches the authenticated user.

## `GET /subjects` Tests

-   **Test Case 1: List Subjects**
    -   **Description**: A user should see a list of only their own subjects.
    -   **Steps**:
        1.  Create User A and User B.
        2.  User A creates 2 subjects.
        3.  User B creates 1 subject.
        4.  Authenticate as User A and send a `GET` request to `/subjects`.
        5.  Assert that the response contains exactly 2 subjects and that they match the ones created by User A.

## `GET /subjects/{id}` Tests

-   **Test Case 1: Get Own Subject Details**
    -   **Description**: A user should be able to retrieve the details of their own subject.
    -   **Steps**:
        1.  Authenticate as a user and create a subject.
        2.  Send a `GET` request to `/subjects/{id}` using the ID of the created subject.
        3.  Assert that the HTTP response code is `200 OK`.
        4.  Assert that the response body contains the correct subject details.

## `PUT /subjects/{id}` Tests

-   **Test Case 1: Update Own Subject**
    -   **Description**: A user should be able to update their own subject.
    -   **Steps**:
        1.  Authenticate as a user and create a subject.
        2.  Send a `PUT` request to `/subjects/{id}` with updated data.
        3.  Assert that the HTTP response code is `200 OK`.
        4.  Assert that the response body contains the updated subject details.
        5.  (Optional) Send a `GET` request to verify the changes were persisted.

## `DELETE /subjects/{id}` Tests

-   **Test Case 1: Delete Own Subject**
    -   **Description**: A user should be able to delete their own subject.
    -   **Steps**:
        1.  Authenticate as a user and create a subject.
        2.  Send a `DELETE` request to `/subjects/{id}`.
        3.  Assert that the HTTP response code is `200 OK` or `204 No Content`.
        4.  (Optional) Send a `GET` request for that `{id}` and assert that it returns a `404 Not Found`.
        5.  **Cascade Delete Check**: If the subject had associated tasks, verify that those tasks have also been deleted from the `academic_tasks` table.
