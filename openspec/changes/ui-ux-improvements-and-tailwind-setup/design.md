## Context

The application's subject management feature is functionally complete but lacks professional UI/UX. There is no global navigation, making it difficult for users to move between sections or log out. The styling is inconsistent and not based on a modern CSS framework, leading to a dated appearance and maintainability issues.

## Goals / Non-Goals

**Goals:**
- To establish a consistent and modern UI by integrating Tailwind CSS.
- To provide clear, persistent navigation for authenticated users.
- To improve the usability of forms by adding cancel/back functionality.
- To refactor all subject-related components to use Tailwind CSS, making them responsive and visually appealing.

**Non-Goals:**
- This design will not introduce any new backend functionality.
- It will not change the existing color palette or branding, but will apply it via Tailwind's configuration.
- It will not cover the UI for any non-authenticated parts of the application (e.g., login, register pages).

## Decisions

1.  **Tailwind CSS Integration:**
    *   **Decision**: We will install and configure Tailwind CSS for the Vite-based frontend. This involves installing `tailwindcss`, `postcss`, and `autoprefixer`.
    *   **Rationale**: Tailwind CSS provides a highly-efficient utility-first workflow, enabling rapid development of modern and responsive UIs. It's highly configurable and will allow us to create a consistent design system.
    *   **Configuration**:
        *   `tailwind.config.js`: Will be created to define the content paths (to scan for classes) and any theme customizations.
        *   `postcss.config.js`: Will be created to include the `tailwindcss` and `autoprefixer` plugins.
        *   `index.css`: The existing `frontend/src/index.css` will be cleared and replaced with the three primary Tailwind directives: `@tailwind base;`, `@tailwind components;`, and `@tailwind utilities;`.

2.  **Layout and Navigation Structure:**
    *   **Decision**: A new `MainLayout.jsx` component will be created. This component will render a `Navbar` and an `<Outlet />` from `react-router-dom`. The `ProtectedRoute` will be modified to render its children within this `MainLayout`.
    *   **Rationale**: This creates a clear separation between the layout (navigation) and the page content. It ensures that any route nested under `ProtectedRoute` automatically gets the global navigation bar.
    *   **Navbar Component**: A new `Navbar.jsx` component will be created. It will contain:
        *   A `NavLink` from `react-router-dom` pointing to `/subjects` (as the new home/dashboard).
        *   A "Logout" button that, when clicked, will clear the auth token from `localStorage` and navigate the user to `/login`.

3.  **Component Refactoring:**
    *   **Decision**: The components `SubjectList`, `SubjectCard`, `SubjectCreate`, and `SubjectEdit` will be completely rewritten to use Tailwind CSS utility classes. The existing CSS in `App.css` related to these components will be removed.
    *   **Rationale**: This is essential for achieving a consistent and modern look and feel. It also centralizes the styling logic within the components themselves, improving maintainability.
    *   **Specifics**:
        *   `SubjectList`: Will use Tailwind's grid utilities (e.g., `grid`, `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, `gap-4`).
        *   `SubjectCard`: Will use utilities for padding (`p-4`), shadows (`shadow-lg`), rounded corners (`rounded-md`), and background colors (`bg-white`).
        *   `SubjectCreate`/`SubjectEdit`: Forms will be styled using Tailwind's form plugin utilities if available, or custom utility classes for inputs, labels, and buttons to ensure they are clean, aligned, and have proper spacing. A "Cancel" button will be added, which will use the `useNavigate` hook to go back to the previous page (`navigate(-1)`).

## Risks / Trade-offs

-   **Risk**: Incorrectly purging CSS classes. Tailwind's production build removes unused classes. If the `content` paths in `tailwind.config.js` are not configured correctly, it could lead to broken styles in the production build.
    -   **Mitigation**: We must ensure that the `content` array in `tailwind.config.js` correctly points to all files containing JSX and HTML (`./src/**/*.{js,jsx,ts,tsx}`).
-   **Trade-off**: The initial setup of Tailwind CSS adds a small amount of configuration complexity.
    -   **Rationale**: The long-term benefits in development speed, maintainability, and UI consistency far outweigh the initial setup cost.
-   **Risk**: Global CSS conflicts. The `@tailwind base` directive resets some default browser styles.
    -   **Mitigation**: This is generally a desired effect for consistency. We will test the application to ensure this doesn't negatively impact any other existing styles that we wish to keep. Since we are refactoring the main components, this risk is low.
