# Employee Management

## Structure
- `client/` Frontend (Vite + React + Tailwind)
- `server/` Backend (Node + Express + MongoDB + Redis)

## Setup
### 1) Install dependencies
```powershell
npm.cmd run install:all
```

### 2) Server environment
Copy the example env file and update values:
```powershell
copy server\.env.example server\.env
```

Required env values:
- `MONGODB_URI`
- `REDIS_URL`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- `JWT_SECRET`
- SMTP values (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`)

Optional auth settings:
- `ACCESS_TOKEN_EXPIRES` (default: `15m`)
- `REFRESH_TOKEN_EXPIRES` (default: `7d`)
- `COOKIE_NAME` (default: `ems_access`)
- `REFRESH_COOKIE_NAME` (default: `ems_refresh`)
- `COOKIE_DAYS` (default: `7`)
- `LOCKOUT_THRESHOLD` (default: `5`)
- `LOCKOUT_MINUTES` (default: `15`)

### 3) Run both client + server
```powershell
npm.cmd run dev
```

## Individual dev servers
```powershell
npm.cmd run dev:server
npm.cmd run dev:client
```

## Notes
- Auth uses JWT access + refresh tokens stored in httpOnly cookies.
- Refresh tokens are rotated and stored server-side in Redis.
- Forgot password sends a real email using your SMTP credentials.
- Reset links go to `/reset-password` with `token` and `email` query params.
- Passwords require uppercase, lowercase, number, and symbol.
- Login lockout triggers after repeated failures.

## API Endpoints
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/health`
