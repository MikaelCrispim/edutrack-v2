## 1. Xano Backend Setup (Manual Configuration)

Please follow these exact steps in your Xano workspace to configure the code verification routes.

### 1.1 Update the `users` Table
1. Go to your **Database** in Xano and select the `users` table.
2. Add a new field: type **Text**, name it `verification_code`.
3. Add a new field: type **Boolean**, name it `is_verified` (Default: `false`).

### 1.2 Update `/auth/signup` Endpoint
1. Go to your `/auth/signup` endpoint.
2. After the step where you "Add Record" to the `users` table, add a new **Utility -> Generate Random String/Number** step to create a 6-digit code.
3. Add an **Edit Record** step to save this code to the `verification_code` field for the newly created user.
4. *(Optional)* Add a step to send an email with this code (using SendGrid or similar).

### 1.3 Create `/auth/verify` Endpoint
1. Create a new API Endpoint: `POST /auth/verify`.
2. Add Inputs: `email` (Text) and `code` (Text).
3. **Function Stack:**
   - **Query Record:** Find the user in the `users` table where `email` matches the input.
   - **Precondition:** Check if `user.verification_code` equals the input `code`. If not, throw an error ("Invalid code").
   - **Edit Record:** Update the user, setting `is_verified` to `true` and clearing `verification_code` (set to null/empty).
   - **Create Auth Token:** Generate a token for this user and return it.

### 1.4 Update `/auth/password-reset` Endpoint
1. In your existing `/auth/password-reset` endpoint, after finding the user, generate a 6-digit code.
2. Save this code to the user's `verification_code` field.
3. Send this code via email.

### 1.5 Create `/auth/reset-password-verify` Endpoint
1. Create a new API Endpoint: `POST /auth/reset-password-verify`.
2. Add Inputs: `email` (Text), `code` (Text), and `new_password` (Password).
3. **Function Stack:**
   - **Query Record:** Find the user by `email`.
   - **Precondition:** Check if `user.verification_code` equals the input `code`.
   - **Edit Record:** Update the user's password with the `new_password` input, and clear the `verification_code`.

---

## 2. Frontend Integration

- [x] 2.1 In `frontend/src/api.js`, add functions for the new verification endpoints (`verifyRegistration` and `verifyPasswordReset`).
- [x] 2.2 In `frontend/src/components/auth/Register.jsx`, add a state for `step` (1 or 2).
- [x] 2.3 Update `Register.jsx` so that on successful signup, it moves to step 2 and displays an input for the verification code.
- [x] 2.4 Handle the submit for step 2 by calling `verifyRegistration` and logging the user in upon success.
- [x] 2.5 In `frontend/src/components/auth/PasswordReset.jsx`, add a state for `step`.
- [x] 2.6 Update `PasswordReset.jsx` so that on successful email submission, it moves to step 2 and displays inputs for the Verification Code and New Password.
- [x] 2.7 Handle the submit for step 2 by calling `verifyPasswordReset` and redirecting to login upon success.
