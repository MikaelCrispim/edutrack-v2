## ADDED Requirements

### Requirement: Display Subject Progress
The system SHALL display a list of all subjects with a calculated progress percentage.

#### Scenario: View Progress
- **WHEN** a user navigates to the dashboard
- **THEN** the system SHALL display each subject along with a progress bar.
- **AND** the progress percentage SHALL be calculated based on the ratio of completed tasks to total tasks for that subject.

### Requirement: Display Time-Spent-Per-Subject
The system SHALL display a simple chart (pie or bar) showing the time spent per subject.

#### Scenario: View Time Chart
- **WHEN** a user navigates to the dashboard
- **THEN** the system SHALL display a chart representing the distribution of time spent across all subjects.
- **NOTE**: The MVP will rely on manual time entry per task. A future enhancement will introduce a timer.
