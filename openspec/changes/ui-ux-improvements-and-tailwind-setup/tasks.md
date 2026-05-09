## 1. Tailwind CSS Setup

- [x] 1.1 In the `frontend` directory, install `tailwindcss`, `postcss`, and `autoprefixer` as dev dependencies.
- [x] 1.2 Create a `tailwind.config.js` file in the `frontend` directory with the correct content paths for the Vite project.
- [x] 1.3 Create a `postcss.config.js` file in the `frontend` directory to include the Tailwind and Autoprefixer plugins.
- [x] 1.4 Clear the contents of `frontend/src/index.css` and replace them with the `@tailwind` directives.
- [x] 1.5 Remove the subject-related CSS from `frontend/src/App.css`.

## 2. Global Navigation and Layout

- [x] 2.1 Create a new component `frontend/src/components/Navbar.jsx`.
- [x] 2.2 Implement the `Navbar` component with a link to `/subjects` and a "Logout" button. The logout button must clear `localStorage` and redirect to `/login`.
- [x] 2.3 Create a new layout component `frontend/src/components/MainLayout.jsx` that renders the `Navbar` and an `<Outlet />`.
- [x] 2.4 Modify `frontend/src/App.jsx` to use the `MainLayout` for all protected routes. The root path should redirect to `/subjects`.

## 3. Component Refactoring with Tailwind CSS

- [x] 3.1 Refactor `frontend/src/components/subjects/SubjectCard.jsx` to use only Tailwind CSS utility classes for a modern card design (shadows, rounded corners, padding).
- [x] 3.2 Refactor `frontend/src/components/subjects/SubjectList.jsx` to use Tailwind CSS for a responsive grid layout.
- [x] 3.3 Refactor `frontend/src/components/subjects/SubjectCreate.jsx` to style the form and its elements using Tailwind CSS. Add a "Cancel" button that navigates back to the previous page.
- [x] 3.4 Refactor `frontend/src/components/subjects/SubjectEdit.jsx` to style the form and its elements using Tailwind CSS. Add a "Cancel" button that navigates back to the previous page.

## 4. Final Cleanup

- [x] 4.1 Review all modified components to ensure no plain `className` attributes are used for styling and that all styling is done via Tailwind CSS.
- [x] 4.2 Verify that the application is fully responsive.
