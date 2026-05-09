## ADDED Requirements

### Requirement: User Registration
The system SHALL allow a new user to register with an email and password.

#### Scenario: Successful Registration
- **WHEN** a user submits the registration form with a valid, unique email and a strong password
- **THEN** a new user account is created
- **AND** the user is logged into the application.

#### Scenario: Registration with Existing Email
- **WHEN** a user submits the registration form with an email that already exists
- **THEN** the system SHALL show an error message indicating the email is already in use.

### Requirement: User Login
The system SHALL allow a registered user to log in with their email and password.

#### Scenario: Successful Login
- **WHEN** a user submits the login form with correct credentials
- **THEN** the user is authenticated
- **AND** a session token (JWT) is issued.

#### Scenario: Login with Incorrect Credentials
- **WHEN** a user submits the login form with an incorrect email or password
- **THEN** the system SHALL show an error message indicating invalid credentials.

### Requirement: Password Recovery
The system SHALL provide a mechanism for users to reset their password.

#### Scenario: Password Reset Request
- **WHEN** a user requests a password reset for a valid email address
- **THEN** the system SHALL send an email with a password reset link.

#### Scenario: Successful Password Reset
- **WHEN** a user follows the reset link and submits a new password
- **THEN** the user's password SHALL be updated.
