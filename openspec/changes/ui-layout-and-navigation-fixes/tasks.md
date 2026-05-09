## 1. Navbar UI Fixes
- [x] 1.1 In `frontend/src/components/Navbar.jsx`, update the "Toggle sidebar" button classes to ensure visible hover effects (e.g., add `hover:bg-white/10`).
- [x] 1.2 Update the "Logout" button to have a visible background on hover (`hover:bg-white/20`).

## 2. Sidebar Responsiveness
- [x] 2.1 In `frontend/src/components/Sidebar.jsx`, verify and adjust the tailwind breakpoints so the sidebar doesn't awkwardly take up the entire screen or overlap at 1024px. Ensure the transition between mobile (`fixed`) and desktop (`static`) is smooth.
- [x] 2.2 In `frontend/src/components/MainLayout.jsx`, ensure the container flex layout respects the sidebar width correctly at all breakpoints.

## 3. Modal "New Subject"
- [x] 3.1 In `frontend/src/pages/DashboardPage.jsx`, modify the conditional rendering of `showCreateForm`.
- [x] 3.2 Wrap the `<SubjectCreate>` component in a `fixed inset-0 z-50 bg-black/50` overlay container.
- [x] 3.3 Add layout classes to center the form within the overlay (`flex items-center justify-center`).
- [x] 3.4 Ensure the close button inside the modal correctly triggers `setShowCreateForm(false)`.
