# Table: users

This document outlines the schema for the `users` table.

## Strategy

As per the project's development guide and the requirements for the MVP, the default `user` table provided by Xano will be used. This table is automatically created with new Xano instances and includes all necessary fields for authentication.

No additional custom fields are required for the MVP.

## Default Schema (for reference)

The standard Xano `user` table includes the following key fields:

-   `id` (Integer): Unique identifier for the user.
-   `name` (Text): The user's full name.
-   `email` (Email): The user's email address (must be unique).
-   `password` (Password): The user's encrypted password.
-   `created_at` (Timestamp): Timestamp of when the user account was created.
-   `last_insight_generated_at` (Timestamp): Timestamp of when the last AI insight was generated for the user.
