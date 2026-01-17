# 🚀 DriveFlow: Full-Stack Cloud Identity & Storage Solution

DriveFlow is a high-performance, full-stack web application designed for secure user management and seamless cloud interactions. This project demonstrates a modern **Type-Safe** architecture that eliminates runtime errors between the client and server.

---

## 🏗️ Technical Architecture

DriveFlow is built using the **T3-inspired stack**, ensuring every piece of data moving from the database to the browser is strictly typed.

* **Frontend**: [Next.js 15](https://nextjs.org/) (App Router) & [Chakra UI v3](https://chakra-ui.com/)
* **Communication**: [tRPC](https://trpc.io/) (End-to-end Type-safe API)
* **Database**: [Vercel Postgres](https://vercel.com/storage/postgres) (SQL)
* **ORM**: [Prisma](https://www.prisma.io/)
* **Authentication**: Google OAuth 2.0 & Custom Session Cookies (Bcrypt)



---

## ✨ Features Implemented So Far

### 🔐 Advanced Authentication Suite
- **Hybrid Login System**: Support for traditional Email/Password credentials and Google Social Login.
- **Secure Password Hashing**: Utilizes `bcryptjs` with 12 salt rounds for industry-standard security.
- **Google Profile Sync (Upsert)**: Upon Google login, the system automatically creates a new record or updates the existing user profile based on the verified JWT.
- **HTTP-Only Session Cookies**: Session management is handled via secure cookies, protecting the application from XSS (Cross-Site Scripting) attacks.

### 🎨 Seamless User Experience
- **Universal Auth Modal**: A single, state-aware component for Sign In and Sign Up, providing a smooth transition without page reloads.
- **Reactive UI**: The Navbar and app state update instantly across all tabs when a user logs in or out, thanks to tRPC's `invalidate()` logic.
- **Reliable Script Loading**: Implements a robust Google Identity Service injection that ensures the "Sign in with Google" button renders perfectly even during complex React component mounts.

### 🛡️ Type-Safe Backend
- **Unified Auth Router**: Centralized logic in `authRouter.ts` for procedures like `me`, `login`, `signup`, and `googleAuth`.
- **Input Validation**: Every request is validated using `Zod` schemas before reaching the database.



---

## 📂 Project Structure

```bash
├── prisma/                 # Database schema (User models)
├── src/
│   ├── app/                # Next.js 15 pages, layouts, and providers
│   ├── components/         # UI components (AuthModal, Navbar, UI library)
│   ├── hooks/              # Custom React hooks (useAuth for session state)
│   ├── server/             # tRPC backend routers and procedures
│   ├── trpc/               # tRPC client and server configuration
│   └── utils/              # Client-side helper functions
└── .env                    # Private environment variables

