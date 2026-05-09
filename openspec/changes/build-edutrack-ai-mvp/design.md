## Context

This document outlines the technical design for implementing the EduTrack AI application, as specified in the `proposal.md`. The project will create a hybrid mobile/web application using React/React Native for the frontend and a Xano-based backend. Complex business logic will be handled by custom Node.js services.

The entire development process will be guided by the principles of Spec-Driven Development using OpenSpec and will adhere to the agent-based workflow detailed in `docs/xanoscript-dev-guide.md`. This orchestrator agent will delegate all XanoScript implementation to specialized agents.

## Goals / Non-Goals

**Goals:**
- Define the high-level architecture for the EduTrack AI MVP.
- Clarify the role of each technology component (React, Xano, Node.js).
- Establish the development process, including the handoff of tasks to specialized agents for Xano development.
- Provide a clear technical foundation for the implementation tasks.

**Non-Goals:**
- This design does not cover features beyond the defined MVP, such as AI-driven insights or PDF generation.
- It does not include detailed UI/UX specifications, which will be based on existing Figma templates.
- It will not specify the exact implementation details of each function or API endpoint, which will be defined in the `tasks.md` and subsequent development.

## Decisions

1.  **Backend Platform:**
    - **Decision**: Use Xano for the primary backend, including user authentication, database schema, and standard CRUD APIs.
    - **Rationale**: Xano provides rapid development capabilities for common backend services. The `xanoscript-dev-guide.md` provides a clear framework for building robustly on the platform using an agent-based approach.

2.  **Custom Business Logic:**
    - **Decision**: Implement complex, non-standard business logic (e.g., weighted progress calculations) in separate Node.js services.
    - **Rationale**: Node.js offers greater flexibility and a broader ecosystem for computationally intensive or specialized tasks that are not a natural fit for Xano's core functionality.

3.  **Frontend Framework:**
    - **Decision**: Develop the client application using React/React Native.
    - **Rationale**: This allows for a single codebase to serve both web and mobile platforms, maximizing efficiency as per the project specification.

4.  **Development Workflow:**
    - **Decision**: Strictly follow the specialized agent workflow outlined in `docs/xanoscript-dev-guide.md`.
    - **Rationale**: This enforces a separation of concerns and leverages expert agents for each part of the Xano backend (database, APIs, functions), ensuring consistency and adherence to best practices. The orchestrator will plan and delegate, not implement.

## Risks / Trade-offs

- **Risk**: The distributed, agent-based workflow can be complex to manage.
  - **Mitigation**: The implementation plan in `tasks.md` will be highly detailed, with clear instructions and expected outcomes for each delegated task. Each step will be verified upon completion.

- **Risk**: Potential for inconsistencies between the frontend and the Xano backend API contract.
  - **Mitigation**: The frontend development process will begin only after the backend APIs are defined and their specifications are retrieved. The `Xano Frontend Developer` agent's critical rule to use `get_xano_api_specifications` will be enforced.
