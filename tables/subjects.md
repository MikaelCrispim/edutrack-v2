# Table: subjects

This document outlines the schema for the `subjects` table.

## Fields

| Field Name    | Data Type | Description                                        |
| :------------ | :-------- | :------------------------------------------------- |
| `id`          | Integer   | Unique identifier for the subject (Primary Key).   |
| `name`          | Text      | The name of the academic subject.                  |
| `professor`     | Text      | The name of the professor or instructor.           |
| `course_load`   | Integer   | The credit hours or workload of the subject.       |
| `description`   | Text      | A brief description of the subject.                |
| `start_date`    | Timestamp | The starting date of the subject.                  |
| `end_date`      | Timestamp | The ending date of the subject.                    |
| `created_at`    | Timestamp | Timestamp of when the record was created.          |

## Relationships

-   **`user_id`**: A relationship to the `users` table. This field links the subject to the user who owns it. This should be a "one-to-many" relationship where one user can have many subjects.
