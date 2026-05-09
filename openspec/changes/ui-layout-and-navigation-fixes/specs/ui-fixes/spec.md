## ADDED Requirements

### Requirement: Responsive Navigation
The system SHALL provide a navigation sidebar that adapts to the user's screen size without overlapping content inappropriately.

#### Scenario: User views app on desktop
- **WHEN** the user views the application on a screen wider than 1024px
- **THEN** the sidebar SHALL be statically positioned alongside the main content, not overlapping it.

### Requirement: Modal Subject Creation
The system SHALL allow users to create new subjects via a modal overlay to preserve the dashboard context.

#### Scenario: User clicks "New Subject"
- **WHEN** the user clicks the "New Subject" button on the dashboard
- **THEN** a modal overlay SHALL appear over the dashboard content, dimming the background.
- **AND** the subject creation form SHALL be displayed in the center of the modal.

#### Scenario: User dismisses the modal
- **GIVEN** the "New Subject" modal is open
- **WHEN** the user clicks the close button or successfully creates a subject
- **THEN** the modal SHALL close, revealing the fully interactive dashboard.
