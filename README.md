# Midnight Planner

A modern full-stack application focused on immersive interactions, realistic physics, and premium UI design.

<p align="center">
  <img src="./public/demo.gif" width="900" alt="Midnight Planner Demo" />
</p>

<p align="center">
  <i>Drag the lamp cord to reveal the authentication interface.</i>
</p>

---

## About

Midnight Planner is a portfolio project exploring how authentication experiences can become interactive rather than static.

Instead of displaying a traditional login screen, the application presents a suspended lamp with a pull cord. The user interacts directly with the scene to reveal the authentication interface through realistic motion and lighting effects.

The project focuses on:

* Physics-based interactions
* Smooth animations
* Dark premium UI
* Authentication flows
* Local database persistence
* Clean architecture

---

## Features

### Interactive Lamp Experience

* Pull-cord interaction
* Physics-inspired motion
* Dynamic glow effects
* Smooth spring animations
* Immersive login experience

### Authentication

* User registration
* User login
* Password hashing with Bcrypt
* Persistent local database

### Development Stack

* TypeScript
* Modular architecture
* API routes
* Prisma ORM
* SQLite database

---

## Tech Stack

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* Framer Motion

### Backend

* Next.js API Routes
* Prisma ORM
* SQLite

### Security

* Bcrypt.js

---

## Installation

### Clone the repository

```bash
git clone https://github.com/it0l/midnight-planner.git
cd midnight-planner
```

### Install dependencies

```bash
npm install
```

### Create environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
```

### Initialize the database

```bash
npx prisma generate
npx prisma db push
```

### Start the development server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## Project Structure

```txt
src/
│
├── app/
│   ├── api/
│   └── page.tsx
│
├── components/
│   ├── auth/
│   └── lamp/
│
├── hooks/
│
├── lib/
│
└── prisma/
```

---

## Roadmap

* [x] Interactive lamp scene
* [x] Pull-cord authentication
* [x] User registration
* [x] User login
* [x] SQLite persistence
* [ ] Dashboard
* [ ] Task management
* [ ] Notes system
* [ ] Auto-save
* [ ] Calendar integration
