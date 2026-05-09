## ADDED Requirements

### Requirement: Verify Registration via Code
The system SHALL require users to verify their registration using a code sent to their email.

#### Scenario: User registers successfully
- **WHEN** the user submits valid registration details
- **THEN** the system SHALL transition to a verification step.
- **AND** the system SHALL prompt the user for a verification code.
- **AND** upon entering the correct code, the user SHALL be logged in.

### Requirement: Verify Password Reset via Code
The system SHALL require a verification code to authorize a password reset.

#### Scenario: User requests a password reset
- **WHEN** the user submits their email for a password reset
- **THEN** the system SHALL transition to a verification step.
- **AND** the system SHALL prompt the user for a verification code and a new password.
- **AND** upon entering the correct code and a valid new password, the system SHALL update the password and direct the user to log in.
