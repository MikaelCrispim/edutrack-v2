## Why

The application is failing to start due to a PostCSS configuration error with Tailwind CSS. The error message indicates that the Tailwind CSS PostCSS plugin has been moved to a separate package, `@tailwindcss/postcss`. This change is necessary to fix the build error and allow the application to run.

## What Changes

- Install the new `@tailwindcss/postcss` package.
- Update the `postcss.config.js` file to correctly reference the new plugin.
- Uninstall the old `tailwindcss` package and install the new one to ensure version compatibility.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `tailwind-config`: The Tailwind CSS and PostCSS configuration will be updated to use the correct packages and fix the build error.

## Impact

- **Project Configuration:**
  - `package.json`: Will be updated to remove `tailwindcss` and add `@tailwindcss/postcss` and the correct `tailwindcss` version.
  - `postcss.config.js`: Will be updated to use the new plugin.
