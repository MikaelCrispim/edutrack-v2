## Context

This design outlines the technical approach to finalize the Registration and Password Reset flows by introducing an OTP (One Time Password) / verification code mechanism.

## Goals / Non-Goals

**Goals:**
- Add an intermediate UI step in Registration for users to input a code.
- Add an intermediate UI step in Password Reset for users to input a code and new password.
- Define the exact Xano backend requirements so the user can configure them manually.

**Non-Goals:**
- Implementing complex multi-factor authentication (MFA) apps.

## Decisions

### 1. Registration Flow
- **Step 1:** User enters name, email, password and submits. Frontend calls `POST /auth/signup`.
- **Backend Action:** Xano creates the user (status: unverified), generates a 6-digit code, stores it in the `users` table, and simulates sending an email (or actually sends via SendGrid/Magic Link addon).
- **Step 2:** Frontend displays a "Enter Code" form. User enters code and submits.
- **Backend Action:** Frontend calls `POST /auth/verify`. Xano checks the code. If valid, marks user as verified and returns an auth token.

### 2. Password Reset Flow
- **Step 1:** User enters email and submits. Frontend calls `POST /auth/password-reset`.
- **Backend Action:** Xano finds the user, generates a reset code, stores it, and sends an email.
- **Step 2:** Frontend displays a form for "Verification Code" and "New Password".
- **Backend Action:** Frontend calls `POST /auth/reset-password-verify`. Xano validates the code and updates the password.

### 3. Frontend Architecture
- Modify `Register.jsx` and `PasswordReset.jsx` to use a `step` state variable (`step === 1` for initial form, `step === 2` for code verification).
- Add new endpoints to `api.js`: `verifyRegistration(email, code)` and `verifyPasswordReset(email, code, newPassword)`.

## Risks / Trade-offs
- **[Risk] Email Delivery:** If emails fail to send from Xano, users are locked out.
  - **Mitigation:** Ensure the Xano step-by-step instructions clearly state how to verify the code generation in the database even if the email addon isn't fully configured.
