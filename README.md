# Midnight Planner

Midnight Planner is a night-themed personal workspace built with Next.js, Prisma and SQLite. Its visual identity starts with an interactive hanging lamp: pulling the cord reveals the authentication experience and opens a private workspace for personal notes.

<p align="center">
  <img src="./public/demo.gif" width="900" alt="Midnight Planner lamp interaction" />
</p>

## Highlights

- interactive lamp experience with Framer Motion
- account registration with bcrypt password hashing
- credential-based login
- persistent server-side sessions
- `HttpOnly`, `SameSite=Lax` authentication cookie
- protected dashboard
- private notes scoped to the authenticated user
- create, edit and delete note flows
- Prisma ORM with SQLite for local development
- server-side authorization on note mutations
- GitHub Actions validation for lint and production build

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 / React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Motion | Framer Motion |
| Database | SQLite |
| ORM | Prisma 6 |
| Authentication | Custom server-side sessions + bcryptjs |
| Icons | Lucide React |

## Architecture

```text
Browser
  |
  | register / login
  v
Next.js Route Handlers
  |
  +--> bcrypt password verification
  |
  +--> random session token
           |
           +--> SHA-256 hash stored in database
           +--> raw token stored only in HttpOnly cookie

Authenticated request
  |
  v
getCurrentUser()
  |
  v
Protected dashboard / notes API
  |
  v
Prisma -> SQLite
```

The raw session token is never persisted in the database. Only its SHA-256 hash is stored, while the browser receives the raw value in an `HttpOnly` cookie.

## Project structure

```text
app/
├── api/
│   ├── auth/
│   │   ├── login/route.ts
│   │   ├── logout/route.ts
│   │   └── register/route.ts
│   └── notes/
│       ├── [id]/route.ts
│       └── route.ts
├── dashboard/page.tsx
├── layout.tsx
└── page.tsx
components/
├── auth/
│   ├── LampLogin.tsx
│   └── LoginForm.tsx
└── dashboard/
    └── Dashboard.tsx
lib/
├── auth.ts
└── prisma.ts
prisma/
└── schema.prisma
```

## Running locally

### Requirements

- Node.js 20+
- npm

### Setup

```bash
git clone https://github.com/it0l/midnight-planner.git
cd midnight-planner
npm install
cp .env.example .env
npm run db:push
npm run dev
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

The default local configuration is:

```env
DATABASE_URL="file:./dev.db"
```

Then open `http://localhost:3000`.

## Main flows

### Registration

The API normalizes the email, validates basic input, enforces a minimum password length and stores only a bcrypt hash.

### Login and session

After credentials are verified, the server generates a cryptographically random session token. The database stores only a SHA-256 hash of that token. The raw token is sent to the browser through an `HttpOnly` cookie with a seven-day expiration.

### Notes

Every note operation resolves the authenticated user on the server. Update and delete operations include ownership checks so a user cannot mutate another user's notes by changing an ID in the request.

## Security notes

This repository is a portfolio/local-development project, not a production identity provider. It demonstrates secure fundamentals including password hashing, opaque server-side sessions, `HttpOnly` cookies and server-side authorization.

For an internet-facing production deployment, additional controls should be considered, including rate limiting, CSRF strategy review, email verification, password reset flows, audit logging and a production database.

Local SQLite database files are ignored and must not be committed.

## Development status

The original prototype focused on the lamp interaction and registration screen. The current version completes that concept into a usable MVP with authentication, session management, a protected workspace and persistent personal notes.
