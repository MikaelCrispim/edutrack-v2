## ADDED Requirements

### Requirement: Persistent Navigation Bar
The system SHALL display a persistent navigation bar at the top of the screen for all authenticated user routes.

#### Scenario: Viewing the Navbar
- **WHEN** an authenticated user navigates to any protected page (e.g., `/subjects`).
- **THEN** the system SHALL display a navigation bar.
- **AND** the navigation bar SHALL contain a visible link to the "Subjects" or "Dashboard" page.
- **AND** the navigation bar SHALL contain a "Logout" button.

### Requirement: User Logout
The system SHALL allow an authenticated user to log out.

#### Scenario: Successful Logout
- **WHEN** a user clicks the "Logout" button in the navigation bar.
- **THEN** the authentication token SHALL be removed from `localStorage`.
- **AND** the user SHALL be redirected to the `/login` page.

### Requirement: Form Cancellation
The system SHALL provide a way for users to cancel out of a form and return to the previous page.

#### Scenario: Cancel Subject Creation
- **WHEN** a user is on the "Create Subject" form.
- **THEN** a "Cancel" or "Back" button SHALL be visible.
- **WHEN** the user clicks the "Cancel" or "Back" button.
- **THEN** the user SHALL be navigated back to the subject list page.
