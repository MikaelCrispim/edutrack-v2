# Table: academic_tasks

This document outlines the schema for the `academic_tasks` table.

## Fields

| Field Name  | Data Type | Description                                          |
| :---------- | :-------- | :--------------------------------------------------- |
| `id`        | Integer   | Unique identifier for the task (Primary Key).        |
| `title`     | Text      | The title or name of the task.                       |
| `description` | Text      | A detailed description of the task.                  |
| `due_date`  | Timestamp | The date when the task is due.                       |
| `status`    | Text      | The current status of the task (e.g., "Pending", "In Progress", "Completed"). |
| `created_at`| Timestamp | Timestamp of when the record was created.            |

## Relationships

-   **`subject_id`**: A relationship to the `subjects` table. This field links the task to the subject it belongs to. This should be a "one-to-many" relationship where one subject can have many tasks.
