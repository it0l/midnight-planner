# Midnight Planner

A modern full-stack application focused on micro-interactions, realistic physics, and an immersive user interface.

<div align="center">
  <video src="./public/demo.mp4" width="600" controls autoplay loop muted></video>
  <p><i>Drag the lamp cord to reveal the authentication interface.</i></p>
</div>

## About the Project

Midnight Planner is a proof of concept demonstrating how authentication interfaces can evolve beyond traditional static forms. Utilizing physics-based animations (mass, stiffness, damping), the initial screen simulates a suspended lamp that, when pulled, illuminates the environment and reveals the secure access form.

Beneath the visual layer, the application is supported by a robust embedded backend, handling password cryptography and relational database persistence.

## Technologies

* Next.js
* React
* Tailwind CSS
* Framer Motion
* Node.js
* Prisma ORM
* SQLite
* Bcrypt.js

## Getting Started

Requirements: Node.js installed on your local machine.

1. Clone the repository
```bash
git clone [https://github.com/it0l/midnight-planner.git](https://github.com/it0l/midnight-planner.git)
cd midnight-planner
Install dependencies

Bash
npm install
Environment Setup
Create a .env file in the root directory and add the local database connection string:

Snippet de código
DATABASE_URL="file:./dev.db"
Database Initialization
Generate the Prisma client and push the schema to the SQLite database:

Bash
npx prisma generate
npx prisma db push
Run the development server

Bash
npm run dev
Access http://localhost:3000 in your browser.

Architecture
app/page.tsx

components/auth/LampLogin.tsx

components/auth/LoginForm.tsx

app/api/auth/register/route.ts

prisma/schema.prisma

lib/prisma.ts