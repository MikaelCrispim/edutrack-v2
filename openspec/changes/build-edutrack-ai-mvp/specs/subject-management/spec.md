## ADDED Requirements

### Requirement: Create Subject
The system SHALL allow a logged-in user to create a new academic subject.

#### Scenario: Successful Subject Creation
- **WHEN** a user submits the form to create a new subject with all required fields (name, professor, course load, description, start/end dates)
- **THEN** a new subject record is created and associated with the current user.

### Requirement: View Subjects
The system SHALL allow a user to view a list of all their subjects.

#### Scenario: Display Subjects
- **WHEN** a user navigates to the subjects list
- **THEN** the system SHALL display all subjects created by that user.

### Requirement: Edit Subject
The system SHALL allow a user to edit the details of an existing subject they own.

#### Scenario: Successful Subject Update
- **WHEN** a user updates the details of a subject and saves the changes
- **THEN** the subject's record SHALL be updated with the new information.

### Requirement: Delete Subject
The system SHALL allow a user to delete a subject they own.

#### Scenario: Successful Subject Deletion
- **WHEN** a user chooses to delete a subject
- **THEN** the subject record SHALL be removed from the system.
- **AND** all associated tasks SHALL also be deleted.
