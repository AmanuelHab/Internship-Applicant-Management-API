# Internship Applicant Management API

A NestJS + Prisma REST API for managing internship applications: admin auth, applicant CRUD with search/filter/pagination, status and notes management, and dashboard statistics.

## Technologies used

- **NestJS** (TypeScript) — application framework
- **Prisma ORM** with the `prisma-client` (Postgres) driver adapter
- **PostgreSQL** — relational database
- **Passport + `@nestjs/jwt`** — bearer-token (JWT) authentication
- **argon2** — password hashing
- **class-validator / class-transformer** — DTO-based request validation
- **@nestjs/swagger** — OpenAPI documentation
- **Jest** — testing

## Setup instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment template and fill in real values:
   ```bash
   cp .env.example .env
   ```
3. Start Postgres (Docker Compose is provided and reads its credentials from `.env`):
   ```bash
   docker compose up -d
   ```
4. Run migrations and generate the Prisma client:
   ```bash
   npx prisma migrate deploy   # apply existing migrations
   npx prisma generate         # regenerate the client into src/generated/prisma
   ```
5. Start the app:
   ```bash
   npm run start:dev
   ```
   The API is served under the `/api` prefix, e.g. `http://localhost:3000/api`.

### Migration commands

- Create a new migration during development: `npx prisma migrate dev --name <description>`
- Apply existing migrations (e.g. in CI/production): `npx prisma migrate deploy`
- Inspect the database with Prisma Studio: `npx prisma studio`

### Seed data

There is no seed script yet. To try the API, register an admin manually:
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"ChangeMe123!"}'
```

## Authentication

- `POST /api/auth/signup` — create an admin user (email + password).
- `POST /api/auth/login` — returns a JWT bearer token.
- `GET /api/auth/me` — returns the authenticated user (requires `Authorization: Bearer <token>`).
- All `/api/applicants/*` and `/api/dashboard/*` routes require a valid bearer token.

Token lifetime is controlled by `TOKEN_EXPIRATION` (seconds) in `.env`.

## API documentation

Interactive Swagger/OpenAPI docs are available once the app is running:

```
http://localhost:3000/api/docs
```

Use the "Authorize" button with a bearer token from `/api/auth/login` to try protected routes.

## Architecture

- `src/auth` — signup/login, JWT strategy (`AuthGuard('jwt')`), password hashing with argon2.
- `src/applicant` — applicant CRUD, status/notes/track updates, and paginated/searchable/filterable listing. Controllers stay thin; all business logic (soft-delete filtering, status-transition rules, query building) lives in `ApplicantService`.
- `src/dashboard` — aggregate statistics (totals by status and track), excluding soft-deleted applicants.
- `src/prisma` — `PrismaService`, a globally-available wrapper around the generated Prisma client.
- `src/common` — cross-cutting concerns: a global exception filter (consistent `{statusCode, success, message, data, meta, errors}` envelope), a response-shaping utility, and shared interfaces.
- `prisma/schema.prisma` — data model (`User`, `Applicant`) and migrations.

### Business rules enforced

- Applicant emails are unique (DB constraint + Prisma error surfaces as a request error).
- Notes are capped at 1,000 characters (DTO validation + DB column constraint).
- An applicant cannot move directly from `REJECTED` to `ACCEPTED` (enforced in `ApplicantService.updateStatus`).
- Applicants are soft-deleted (`deletedAt` timestamp) and excluded from all normal list/detail/dashboard queries.
- Only authenticated requests can create, update, or delete applicants (`AuthGuard('jwt')` on the controller).

### Listing applicants

`GET /api/applicants` supports:

| Query param | Description |
|---|---|
| `page`, `limit` | Pagination (default `page=1`, `limit=10`, max `limit=100`) |
| `search` | Case-insensitive match against first name, last name, email |
| `status` | Filter by `PENDING` / `SHORTLISTED` / `ACCEPTED` / `REJECTED` |
| `track` | Filter by internship track |
| `sortBy` | `firstName`, `lastName`, `email`, `appliedDate`, `status`, `track`, `createdAt` (default `createdAt`) |
| `order` | `asc` or `desc` (default `desc`) |

The response includes a `meta` object: `{ total, page, limit, totalPages }`.

## Testing instructions

```bash
npm run test        # unit tests
npm run test:e2e    # end-to-end tests
npm run test:cov     # coverage
```

## Assumptions and known limitations

- No seed script is included yet; the first admin user must be created via `POST /api/auth/signup`.
- `PrismaService` currently builds its connection string from `POSTGRES_*` env vars with a hardcoded port (`5434`), matching `docker-compose.yml`, rather than reading a single `DATABASE_URL`.
- Test coverage for the auth and applicant modules is still minimal (only the default scaffolded test exists) — expanding this is a known gap, not an oversight.
- Rate limiting and refresh tokens are out of scope for this challenge.