# API Endpoint: /auth/login

This document outlines the specification for the user login API endpoint.

## Endpoint Details

-   **Method**: `POST`
-   **Endpoint**: `/auth/login`
-   **Description**: Authenticates a user and returns a session token.

## Inputs

The endpoint expects a JSON object in the request body with the following fields:

| Field Name | Data Type | Required | Description                |
| :--------- | :-------- | :------- | :------------------------- |
| `email`    | Email     | Yes      | The user's email address.  |
| `password` | Password  | Yes      | The user's password.       |

## Function Logic

1.  **Get Input**: Retrieve the `email` and `password` from the request body.
2.  **Authenticate User**: Use Xano's built-in `login` function from the "Authentication" group. This function handles checking the credentials against the `users` table.
3.  **Handle Invalid Credentials**: If authentication fails, the `login` function will typically throw an error. The endpoint should return an appropriate error response (e.g., HTTP 401 Unauthorized) with a message like "Invalid login credentials."
4.  **Return Auth Token**: If authentication is successful, the `login` function will return the authentication token. This token should be returned in the response body.

## Outputs

### Success Response (HTTP 200 OK)

A JSON object containing the authentication token.

```json
{
    "authToken": "your.jwt.token.here"
}
```

### Error Response (HTTP 401 Unauthorized)

A JSON object with an error message.

```json
{
    "message": "Invalid login credentials."
}
```
