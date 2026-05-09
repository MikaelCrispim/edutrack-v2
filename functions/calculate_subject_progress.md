# Xano Function: calculate_subject_progress

This document outlines the specification for a reusable Xano function.

## Function Details

-   **Name**: `calculate_subject_progress`
-   **Description**: Calculates the progress of a subject based on the completion status of its associated tasks.

## Inputs

| Parameter   | Data Type | Required | Description                            |
| :---------- | :-------- | :------- | :------------------------------------- |
| `subject_id`| Integer   | Yes      | The ID of the subject to calculate progress for. |

## Function Logic

1.  **Get Total Tasks**:
    -   Use `Query Records` on the `academic_tasks` table.
    -   Filter the records where `subject_id` matches the input `subject_id`.
    -   Count the total number of records found. Store this in a variable `total_tasks`.

2.  **Get Completed Tasks**:
    -   Use `Query Records` on the `academic_tasks` table again.
    -   Filter where `subject_id` matches the input `subject_id`.
    -   Add a second filter where `status` is equal to "Completed".
    -   Count the number of records found. Store this in a variable `completed_tasks`.

3.  **Calculate Percentage**:
    -   Check if `total_tasks` is zero. If it is, return `0` to avoid a division-by-zero error.
    -   Otherwise, calculate the percentage: `(completed_tasks / total_tasks) * 100`.
    -   It may be useful to use a `round` filter to return an integer value.

## Outputs

-   **Return Value**: An `Integer` representing the completion percentage (from 0 to 100).
