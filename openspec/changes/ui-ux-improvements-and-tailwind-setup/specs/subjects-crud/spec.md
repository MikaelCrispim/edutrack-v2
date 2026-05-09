## MODIFIED Requirements

### Requirement: View Subjects with Modern UI
The system SHALL display a list of all subjects to the user using a modern, responsive card-based layout built with Tailwind CSS.

#### Scenario: View Subject List
- **WHEN** a user navigates to the subjects page.
- **THEN** a `GET` request is sent to the `/subjects` endpoint.
- **AND** the system SHALL display the subjects in a responsive grid of cards styled with Tailwind CSS.
- **AND** each card SHALL have rounded corners, a shadow, and appropriate padding.
- **AND** the plain CSS for subjects in `App.css` SHALL be removed.

### Requirement: Create Subject with Modern Form
The system SHALL allow users to create a new subject using a form styled with Tailwind CSS.

#### Scenario: View Create Subject Form
- **WHEN** a user navigates to the "Create Subject" page.
- **THEN** a form with fields for all subject attributes SHALL be displayed.
- **AND** all form elements (labels, inputs, buttons) SHALL be styled using Tailwind CSS utility classes for a professional appearance.
- **AND** a "Cancel" button SHALL be present that navigates the user back to the subjects list.

### Requirement: Update Subject with Modern Form
The system SHALL allow users to edit the details of an existing subject using a form styled with Tailwind CSS.

#### Scenario: View Edit Subject Form
- **WHEN** a user navigates to the "Edit Subject" page.
- **THEN** a form pre-populated with the subject's details SHALL be displayed.
- **AND** all form elements SHALL be styled using Tailwind CSS.
- **AND** a "Cancel" button SHALL be present that navigates the user back to the subjects list.
