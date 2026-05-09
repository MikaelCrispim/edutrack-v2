## Why

The current subjects module, while functional, suffers from a poor user experience and a dated look. Key navigation elements are missing, and the styling is inconsistent. This change will address these issues by implementing a global navigation bar, setting up Tailwind CSS for a modern design system, and refactoring the subject-related components to use Tailwind for a professional and responsive UI.

## What Changes

- Create a persistent `Navbar` component for authenticated users with links to the dashboard and a functional logout button.
- Add "Cancel/Back" buttons to the `SubjectCreate` and `SubjectEdit` forms.
- **BREAKING**: Remove the previously added CSS for subjects from `App.css`.
- Install and configure Tailwind CSS, PostCSS, and Autoprefixer for the Vite project.
- Refactor `SubjectList`, `SubjectCard`, `SubjectCreate`, and `SubjectEdit` components to use Tailwind CSS utility classes exclusively for styling.
- The `SubjectList` will be redesigned as a responsive grid of modern cards.
- Forms will be restyled to be professional and user-friendly.

## Capabilities

### New Capabilities
- `global-navigation`: Provides a consistent navigation bar for authenticated users.

### Modified Capabilities
- `subjects-crud`: The UI/UX of the existing subjects CRUD functionality will be significantly improved with a modern, responsive design using Tailwind CSS.

## Impact

- **Project Configuration:**
  - `package.json`: Will be updated with new dev dependencies (`tailwindcss`, `postcss`, `autoprefixer`).
  - `tailwind.config.js`: New file will be created.
  - `postcss.config.js`: New file might be created.
  - `frontend/src/index.css`: Will be updated to include Tailwind directives.
- **Frontend Components:**
  - `Navbar.jsx`: A new component will be created.
  - `App.jsx`: Will be modified to include the `Navbar` in the layout for protected routes.
  - `SubjectList.jsx`, `SubjectCard.jsx`, `SubjectCreate.jsx`, `SubjectEdit.jsx`: Will be heavily refactored to use Tailwind CSS instead of plain CSS classes.
- **CSS:**
  - `App.css`: The CSS rules for the subjects module will be removed.
