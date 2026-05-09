# Authentication Endpoint Tests

This document outlines the test cases for the `/auth` API endpoints.

## `/auth/signup` Tests

-   **Test Case 1: Successful Signup**
    -   **Description**: A new user should be able to register successfully.
    -   **Steps**:
        1.  Send a `POST` request to `/auth/signup` with a unique email and valid data.
        2.  Assert that the HTTP response code is `200 OK`.
        3.  Assert that the response body contains an `authToken`.
        4.  Assert that a new record exists in the `users` table with the provided email.

-   **Test Case 2: Signup with Existing Email**
    -   **Description**: The system should prevent registration with an email that is already in use.
    -   **Steps**:
        1.  Create a user.
        2.  Send a `POST` request to `/auth/signup` using the same email.
        3.  Assert that the HTTP response code is `409 Conflict`.
        4.  Assert that the response body contains an appropriate error message.

## `/auth/login` Tests

-   **Test Case 1: Successful Login**
    -   **Description**: A registered user should be able to log in.
    -   **Steps**:
        1.  Create a user.
        2.  Send a `POST` request to `/auth/login` with the correct credentials.
        3.  Assert that the HTTP response code is `200 OK`.
        4.  Assert that the response body contains an `authToken`.

-   **Test Case 2: Login with Invalid Credentials**
    -   **Description**: The system should not authenticate a user with an incorrect password.
    -   **Steps**:
        1.  Create a user.
        2.  Send a `POST` request to `/auth/login` with the correct email but an incorrect password.
        3.  Assert that the HTTP response code is `401 Unauthorized`.
        4.  Assert that the response body contains an "Invalid login credentials" message.

## `/auth/password-reset` Tests

-   **Test Case 1: Password Reset Request for Existing User**
    -   **Description**: The system should initiate the password reset flow for a valid user.
    -   **Steps**:
        1.  Create a user.
        2.  Send a `POST` request to `/auth/password-reset` with the user's email.
        3.  Assert that the HTTP response code is `200 OK`.
        4.  Assert that the response is the generic success message.
        5.  (Manual Check) Verify that an email was sent to the user's email address with a reset link.

-   **Test Case 2: Password Reset Request for Non-existent User**
    -   **Description**: The system should return a generic success message to prevent user enumeration.
    -   **Steps**:
        1.  Send a `POST` request to `/auth/password-reset` with an email address that does not exist in the `users` table.
        2.  Assert that the HTTP response code is `200 OK`.
        3.  Assert that the response body contains the same generic success message as the successful case.
