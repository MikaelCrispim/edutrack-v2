# API Endpoint: /auth/signup

This document outlines the specification for the user signup API endpoint.

## Endpoint Details

-   **Method**: `POST`
-   **Endpoint**: `/auth/signup`
-   **Description**: Registers a new user in the system.

## Inputs

The endpoint expects a JSON object in the request body with the following fields:

| Field Name | Data Type | Required | Description                   |
| :--------- | :-------- | :------- | :---------------------------- |
| `name`     | Text      | Yes      | The user's full name.         |
| `email`    | Email     | Yes      | The user's email address.     |
| `password` | Password  | Yes      | The user's chosen password.   |

## Function Logic

1.  **Get Input**: Retrieve the `name`, `email`, and `password` from the request body.
2.  **Check for Existing User**: Query the `users` table to check if a user with the provided email already exists.
3.  **Handle Existing User**: If a user with that email is found, return an error response (e.g., HTTP 409 Conflict) with a message like "User with this email already exists."
4.  **Create User**: If the email is unique, use Xano's `Add Record` function to create a new record in the `users` table with the provided `name`, `email`, and `password`.
5.  **Return Auth Token**: Upon successful user creation, use Xano's authentication functions to create a session for the new user and return the authentication token (JWT) in the response body.

## Outputs

### Success Response (HTTP 200 OK)

A JSON object containing the authentication token.

```json
{
    "authToken": "your.jwt.token.here"
}
```

### Error Response (HTTP 409 Conflict)

A JSON object with an error message.

```json
{
    "message": "User with this email already exists."
}
```
