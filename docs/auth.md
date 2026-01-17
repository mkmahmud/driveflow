
 # 🔐 Authentication Documentation

This document outlines the security architecture, data flow, and implementation details of the authentication system in DriveFlow.

---

## 1. Overview
DriveFlow implements a **Hybrid Authentication Strategy**. It combines traditional credential-based login (Email/Password) with OAuth 2.0 (Google), using a unified session management system based on secure cookies.



---

## 2. Technical Stack
- **Library**: `google-auth-library` (Server-side verification)
- **Encryption**: `bcryptjs` (Password hashing)
- **Validation**: `Zod` (Schema-based input validation)
- **Transport**: `tRPC` (Type-safe API procedures)
- **Storage**: `httpOnly` Cookies (Session persistence)

---

## 3. Authentication Flows

### A. Credentials Flow (Email/Password)
1. **Hashing**: During signup, passwords are processed using **Bcrypt** with 12 salt rounds. Plaintext passwords are never stored.
2. **Verification**: During login, the system retrieves the hashed password from PostgreSQL via Prisma and uses `bcrypt.compare()` to authorize the session.

### B. Google OAuth Flow
1. **Handshake**: The client uses the Google Identity Services SDK to trigger a login popup.
2. **Identity Token**: Google returns a JWT (Identity Token) to the client.
3. **Backend Validation**: The client sends the JWT to the tRPC `googleAuth` procedure.
4. **Verification**: The server verifies the JWT using the `GOOGLE_CLIENT_ID`.
5. **Sync (Upsert)**: 
   - If the user is new: A record is created.
   - If the user exists: The record is updated with the latest profile data from Google.



---

## 4. Session & Security

### Secure Cookies
Once a user is authenticated, the server issues a `user-id` cookie. This cookie is configured for maximum security:

| Feature | Setting | Security Benefit |
| :--- | :--- | :--- |
| **HttpOnly** | `true` | Prevents Cross-Site Scripting (XSS) from stealing the session. |
| **Secure** | `process.env.NODE_ENV === 'production'` | Ensures cookies are only sent over encrypted HTTPS. |
| **SameSite** | `Lax` | Protects against Cross-Site Request Forgery (CSRF). |
| **MaxAge** | 7 Days | Balanced persistent session length. |

---

## 5. Global State Management
To ensure the UI is always in sync with the Auth state, we use **tRPC Cache Invalidation**:

1. After a successful login/signup, `utils.auth.me.invalidate()` is called.
2. This triggers a background re-fetch of the `me` query.
3. All components listening to the `me` query (like the Navbar or Profile page) update instantly across the entire application.



---

## 6. Setup Requirements
To run authentication locally, the following environment variables are required:

```env
GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="xxx"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"