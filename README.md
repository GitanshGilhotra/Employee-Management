# Employee Management

## Structure
- `client/` Frontend (Vite + React + Tailwind)
- `server/` Backend (Node + Express + MongoDB)

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
- `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- `JWT_SECRET`
- SMTP values (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`)

Optional auth settings:
- `ACCESS_TOKEN_EXPIRES` (default: `15m`)
- `REFRESH_TOKEN_EXPIRES` (default: `7d`)
- `REFRESH_TTL_SECONDS` (default: `604800`)
- `COOKIE_NAME` (default: `ems_access`)
- `REFRESH_COOKIE_NAME` (default: `ems_refresh`)
- `COOKIE_DAYS` (default: `7`)
- `LOCKOUT_THRESHOLD` (default: `5`)
- `LOCKOUT_MINUTES` (default: `15`)
- `USE_REDIS` (set `false` to use in-memory sessions)
- `REDIS_URL` (only used if `USE_REDIS=true`)

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
- Refresh tokens are rotated and stored in Redis or in-memory when `USE_REDIS=false`.
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


### Deployment URLs
- **Frontend (client)**: `https://employee-management-client-gilt.vercel.app`
- **Backend (server)**: `https://employee-management-server-d9294smx3-gitanshgilhotras-projects.vercel.app`

The client uses `VITE_API_URL` to determine where to send requests. Set that variable in
`.env` or on Vercel to point at your current backend URL (the long domain above).
If you don't set it the default in `client/src/utils/api.js` will be used, so keep it
up to date when you redeploy the server.
