## GYM CRM Backend (Node.js + Express + PostgreSQL)

Backend API for a GYM CRM system with modular architecture, JWT authentication, and PostgreSQL.

### Project Structure

- **src/**
  - **config/**
    - `env.js` – environment variables loading (dotenv)
    - `db.js` – PostgreSQL pool and query helper
  - **modules/**
    - **auth/**
      - `auth.routes.js` – auth HTTP routes (register, login)
      - `auth.controller.js` – request/response handling
      - `auth.service.js` – business logic (hashing, tokens)
      - `auth.validation.js` – Joi validation schemas
    - **user/**
      - `user.model.js` – DB queries for users and role enum
  - **middlewares/**
    - `authMiddleware.js` – JWT access token protection
    - `roleMiddleware.js` – role-based authorization
    - `validateRequest.js` – request validation with Joi
    - `errorHandler.js` – global error handling
  - **utils/**
    - `ApiError.js` – custom error class
    - `catchAsync.js` – async controller wrapper
    - `token.js` – JWT generation/verification helpers
  - `app.js` – Express app, routes & middlewares
  - `server.js` – app bootstrap and DB connection

- **sql/**
  - `001_create_users_table.sql` – users table migration

### Setup

1. **Install dependencies**

```bash
npm install
```

2. **Create `.env`**

Copy `.env.example` to `.env` and update values:

- `DATABASE_URL` – your PostgreSQL connection string
- `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` – strong secrets

3. **Create database & users table**

In PostgreSQL (for example):

```sql
CREATE DATABASE gym_crm;
```

Then run the migration:

```bash
psql "postgres://postgres:password@localhost:5432/gym_crm" -f sql/001_create_users_table.sql
```

4. **Run the server**

```bash
npm run dev
```

Server runs on `http://localhost:5000` by default.

### Auth Endpoints

- **Register** – `POST /api/auth/register`

  - Body:
    - `firstName`, `lastName`, `phone`, `email`, `password`, `confirmPassword`, `role` (`Owner|Manager|Trainer|Client`)
  - Response:
    - `user` – `{ id, firstName, lastName, role, email, phone }`
    - `accessToken`
    - `refreshToken`

- **Login** – `POST /api/auth/login`

  - Body:
    - `email`, `password`
  - Response:
    - `user` – `{ id, firstName, lastName, role, email, phone }`
    - `accessToken`
    - `refreshToken`

### Next Steps

- Add user module routes/controllers
- Implement members, subscriptions, payments, and attendance modules in `src/modules/`
- Add refresh-token endpoint and store invalidated tokens if needed

