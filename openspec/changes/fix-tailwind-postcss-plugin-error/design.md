## Context

The application build is failing due to an incorrect PostCSS configuration for Tailwind CSS. The current setup is referencing a deprecated package.

## Goals / Non-Goals

**Goals:**
- To fix the build error by updating the PostCSS configuration and dependencies.
- To ensure the Tailwind CSS compilation process works correctly.

**Non-Goals:**
- This design does not cover any changes to the application's UI or functionality.

## Decisions

1.  **Dependency Management:**
    *   **Decision**: We will uninstall the existing `tailwindcss` package and install the new `@tailwindcss/postcss` package, along with the latest compatible version of `tailwindcss`.
    *   **Rationale**: The error message explicitly states that the PostCSS plugin has been moved to a separate package. This ensures we are using the correct and officially supported packages.

2.  **Configuration Update:**
    *   **Decision**: The `postcss.config.js` file will be updated. The `plugins` object will be modified to use `'tailwindcss'` as a key, which the PostCSS runner will automatically resolve to the correct package.
    *   **Rationale**: This is the standard way to configure PostCSS plugins and will resolve the build error.

## Risks / Trade-offs

-   **Risk**: There are no significant risks associated with this change, as it is a standard dependency and configuration update to fix a known issue.
-   **Trade-off**: None. This change is required for the application to build.
