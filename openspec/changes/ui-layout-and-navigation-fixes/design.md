## Context

This document outlines the technical design for fixing layout and navigation issues reported in the EduTrack MVP.

## Goals / Non-Goals

**Goals:**
- Fix the sidebar width/display issue occurring at 1024px.
- Improve visual feedback (hover, pointer) on Navbar interactive elements.
- Convert the "New Subject" inline form into a centered Modal overlay.

**Non-Goals:**
- Changing the overall color scheme or routing structure.
- Modifying backend APIs for subject creation.

## Decisions

### 1. Sidebar Responsiveness
- **Current Issue:** The `Sidebar` uses `w-64` and transitions to static positioning at the `lg` (1024px) breakpoint, but the main layout might not have enough space, or the mobile toggle doesn't match this breakpoint.
- **Decision:** We will review the `Sidebar.jsx` and `MainLayout.jsx` to ensure they use a consistent breakpoint (e.g., `md` or `lg`) for toggling between the fixed mobile drawer and the static desktop sidebar. We will ensure the `lg:translate-x-0` behaves correctly without overlapping the main content.

### 2. Navbar Interactive Elements
- **Current Issue:** Buttons lack the feeling of interactivity.
- **Decision:** In `Navbar.jsx`, ensure all `<button>` and `<NavLink>` elements have the `cursor-pointer` class (if not implicit) and clear hover styles, like `hover:bg-white/20` for the toggle and logout buttons.

### 3. "New Subject" Modal
- **Current Issue:** `DashboardPage.jsx` renders `SubjectCreate` inline using a simple conditional `showCreateForm && <SubjectCreate />`.
- **Decision:** We will wrap the `SubjectCreate` component inside a fixed full-screen div (`fixed inset-0 z-50 bg-black/50`) that centers the form. This will act as a Modal. We will add a close button (X) to dismiss the modal, and ensure clicking outside the form area also closes it.

## Risks / Trade-offs
- **[Risk] Z-Index Conflicts:** The new modal might conflict with the Sidebar or Navbar `z-index`.
  - **Mitigation:** Ensure the Modal container has a `z-index` (e.g., `z-50`) higher than the Sidebar (`z-40`) and Navbar.
