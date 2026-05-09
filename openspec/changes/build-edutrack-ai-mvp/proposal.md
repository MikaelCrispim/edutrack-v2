## Why

This change initiates the development of the EduTrack AI application, a personalized educational assistant. The goal is to provide students with a tool to manage disciplines, track tasks, and monitor academic progress, as detailed in the project specification. This work follows the user's request to begin production based on the provided documentation.

## What Changes

- **New Application**: Scaffolding and development of the EduTrack AI MVP.
- **Backend Setup**: Implementation of the database schema and APIs in Xano.
- **Frontend Setup**: Creation of a React/React Native application for the user interface.
- **Core Features**:
  - User authentication (signup, login).
  - Management of academic disciplines (subjects).
  - Management of tasks associated with disciplines.
  - A dashboard to visualize progress.

## Capabilities

### New Capabilities
- `user-auth`: Handles user registration, login, and session management.
- `subject-management`: Covers creating, reading, updating, and deleting academic subjects.
- `task-management`: Manages tasks linked to subjects, including their status and deadlines.
- `dashboard`: Provides a visual overview of a student's progress, including completion percentages and other metrics.

### Modified Capabilities
- None

## Impact

- **Codebase**: This will create a new, fully functional application.
- **Backend**: A new Xano backend will be built, including database tables, APIs, and business logic using XanoScript.
- **Frontend**: A new React/React Native application will be developed to interact with the backend.
- **Custom Logic**: Node.js scripts will be created for complex calculations and data processing as specified in the project docs.
- **Tooling**: The development process will be guided by OpenSpec and the agent-based workflow defined in `docs/xanoscript-dev-guide.md`.
