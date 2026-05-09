## ADDED Requirements

### Requirement: Create Subject
The system SHALL allow users to create a new subject by providing a name, professor, course load, description, start date, and end date.

#### Scenario: Successful Subject Creation
- **WHEN** a user fills out the new subject form with valid data and clicks "Create".
- **THEN** a `POST` request is sent to the `/subjects` endpoint.
- **AND** the system navigates the user to the subjects list page.
- **AND** the newly created subject appears in the list.

#### Scenario: Invalid Data for Subject Creation
- **WHEN** a user attempts to create a subject with missing required fields (e.g., name).
- **THEN** the form SHALL display validation errors next to the invalid fields.
- **AND** no `POST` request is sent to the server.

### Requirement: View Subjects
The system SHALL display a list of all subjects to the user.

#### Scenario: View Subject List
- **WHEN** a user navigates to the subjects page.
- **THEN** a `GET` request is sent to the `/subjects` endpoint.
- **AND** the system SHALL display the subjects in a responsive grid of cards.
- **AND** each card SHALL display the subject's name, professor, and other key details.

### Requirement: Update Subject
The system SHALL allow users to edit the details of an existing subject.

#### Scenario: Successful Subject Update
- **WHEN** a user clicks the "Edit" button on a subject card.
- **THEN** the user is navigated to the edit page for that subject.
- **AND** the form is pre-populated with the subject's current details.
- **WHEN** the user modifies the details and clicks "Save".
- **THEN** a `PATCH` (or `PUT`) request is sent to the `/subjects/{id}` endpoint with the updated data.
- **AND** the user is navigated back to the subjects list page.
- **AND** the list reflects the updated subject information.

### Requirement: Delete Subject
The system SHALL allow users to delete a subject.

#### Scenario: Successful Subject Deletion
- **WHEN** a user clicks the "Delete" button on a subject card.
- **THEN** a confirmation prompt SHALL be displayed.
- **WHEN** the user confirms the deletion.
- **THEN** a `DELETE` request is sent to the `/subjects/{id}` endpoint.
- **AND** the subject is removed from the list in the UI without a page reload.

#### Scenario: Cancel Subject Deletion
- **WHEN** a user clicks the "Delete" button on a subject card.
- **THEN** a confirmation prompt SHALL be displayed.
- **WHEN** the user cancels the deletion.
- **THEN** no `DELETE` request is sent.
- **AND** the subject remains in the list.
