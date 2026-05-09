# API Endpoint: /auth/password-reset

This document outlines the specification for initiating the password reset process.

## Endpoint Details

-   **Method**: `POST`
-   **Endpoint**: `/auth/password-reset`
-   **Description**: Initiates the password reset process for a user by sending a reset link via email.

## Inputs

The endpoint expects a JSON object in the request body with the following field:

| Field Name | Data Type | Required | Description                   |
| :--------- | :-------- | :------- | :---------------------------- |
| `email`    | Email     | Yes      | The email of the user requesting the reset. |

## Function Logic

1.  **Get Input**: Retrieve the `email` from the request body.
2.  **Find User**: Query the `users` table to find the user with the matching email address.
3.  **Handle Non-existent User**: If no user is found, the endpoint should still return a success message to prevent user enumeration (a security best practice). The response should be generic, like "If a user with that email exists, a password reset link has been sent."
4.  **Send Reset Email**: If a user is found, use Xano's built-in `Password Reset` functions (e.g., from the "Authentication" function group) to generate a reset token and send an email to the user. The email should contain a link to the password reset page on the frontend (e.g., `https://yourapp.com/reset-password?token=...`).

## Outputs

### Success Response (HTTP 200 OK)

A generic success message is returned regardless of whether the user was found.

```json
{
    "message": "If a user with that email exists, a password reset link has been sent."
}
```
