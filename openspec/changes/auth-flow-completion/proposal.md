## Why

The current authentication implementation allows users to register and request password resets, but it lacks the final verification step. To ensure security and valid contact information, the system must verify user emails during registration and require a verification code to reset passwords.

## What Changes

- **Backend (Xano):** Addition of database fields to store verification codes, and creation of endpoints to verify registration and handle password resets using these codes.
- **Frontend:** Updates to `Register.jsx` and `PasswordReset.jsx` to include an additional step where the user enters the verification code sent to their email.

## Capabilities

### Modified Capabilities

- `user-auth`: Upgraded to include email verification via code for both registration and password reset flows.

## Impact

- **Frontend:** Minor UI changes to auth components to add step-based forms (e.g., Step 1: Request, Step 2: Verify Code). Addition of new API functions in `src/api.js`.
- **Backend:** Significant additions to the Xano auth logic, requiring new endpoints and table modifications to store and check codes.
