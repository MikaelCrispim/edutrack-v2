# Table: ai_insights

This document outlines the schema for the `ai_insights` table.

## Fields

| Field Name | Data Type | Description |
| :--- | :--- | :--- |
| `id` | Integer | Unique identifier for the AI insight (Primary Key). |
| `text` | Text | The AI-generated insight text. |
| `created_at` | Timestamp | Timestamp of when the record was created. |

## Relationships

- **`user_id`**: A relationship to the `users` table. This field links the AI insight to the user for whom it was generated. This should be a "one-to-many" relationship where one user can have many insights.
