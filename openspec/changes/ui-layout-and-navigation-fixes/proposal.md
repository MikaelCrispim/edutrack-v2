## Why

The application currently has some UI and UX issues that hinder the user experience:
1. The sidebar behaves unpredictably on screens around 1024px, overlapping or displacing content incorrectly.
2. The navbar icons (e.g., the sidebar toggle and logout button) lack proper visual feedback (hover effects, pointer cursor), making them feel unresponsive.
3. The "New Subject" functionality simply injects a form inline at the bottom of the dashboard, which clutters the UI and is easy to miss.

Addressing these issues will result in a more polished, responsive, and intuitive interface.

## What Changes

- **Sidebar Responsiveness:** Adjust the Tailwind CSS breakpoints (`lg:` to `md:` or ensure proper static/fixed behavior) in `Sidebar.jsx` and `MainLayout.jsx` to ensure a smooth transition between mobile overlay and desktop side-by-side layout.
- **Navbar Interactivity:** Add proper hover states (`hover:bg-opacity-20`), background colors, and cursor styles to buttons in `Navbar.jsx`.
- **New Subject Modal:** Refactor `DashboardPage.jsx` so that clicking "New Subject" opens the `SubjectCreate` component in an overlay modal (pop-up) that dims the background, rather than pushing content down inline.

## Capabilities

### Modified Capabilities

- `dashboard`: Enhanced with better layout responsiveness and a modal-based subject creation flow.
- `global-ui`: Improved navigation elements (Sidebar and Navbar).

## Impact

- **Frontend:** Modifications to `Sidebar.jsx`, `Navbar.jsx`, and `DashboardPage.jsx`. The layout logic will be more robust and the subject creation flow will be centralized.
- **Backend:** None. These are purely frontend UI/UX changes.
