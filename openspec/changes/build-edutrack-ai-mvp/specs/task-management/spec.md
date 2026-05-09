## ADDED Requirements

### Requirement: Create Task
The system SHALL allow a user to create a new task and associate it with a subject.

#### Scenario: Successful Task Creation
- **WHEN** a user submits the form to create a new task with a title, description, due date, and associated subject
- **THEN** a new task record is created and linked to the specified subject.

### Requirement: View Tasks for a Subject
The system SHALL allow a user to view all tasks associated with a specific subject.

#### Scenario: Display Tasks
- **WHEN** a user selects a subject
- **THEN** the system SHALL display a list of all tasks for that subject.

### Requirement: Update Task Status
The system SHALL allow a user to update the status of a task (e.g., "Pending", "In Progress", "Completed").

#### Scenario: Mark Task as Completed
- **WHEN** a user marks a task as "Completed"
- **THEN** the task's status SHALL be updated to "Completed".

### Requirement: Delete Task
The system SHALL allow a user to delete a task.

#### Scenario: Successful Task Deletion
- **WHEN** a user chooses to delete a task
- **THEN** the task record SHALL be removed from the system.
