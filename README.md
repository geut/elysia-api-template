<img width="1280" height="640" alt="image" src="https://github.com/user-attachments/assets/c66d44f2-ef11-44e5-b37f-77abc5f60faa" />


# Elysia API Template

A modern API template built with Elysia.js, featuring authentication, database integration, and development tooling.

## Development Setup

This project uses [Bun](https://bun.com) as the runtime and package manager for fast development and execution.

### Prerequisites

- [Bun](https://bun.com/docs/installation) (latest version)
- [Docker](https://docs.docker.com/get-docker/) (for PostgreSQL)

### Installation

Install dependencies:

```bash
bun install
```

### Initial Setup

Copy the environment variables file:

```bash
cp .env.example .env
```

## Database Setup

To run a PostgreSQL database using Docker:

```bash
docker run --name geut-api-db -e POSTGRES_DB=geut-api -e POSTGRES_USER=geut-api -e POSTGRES_PASSWORD=geut-api -p 5432:5432 -d postgres:latest
```

Update the `.env` file with the database URL:

```
DATABASE_URL=postgresql://geut-api:geut-api@localhost:5432/geut-api
```

Then, generate and run migrations:

```bash
bun run db:generate
bun run db:migrate
```

## Running the Project

Start the development server:

```bash
bun run index.ts
```

The server will be available at `http://localhost:3000`.

## Available Scripts

- `bun run lint` - Run the linter (Oxlint)
- `bun run format` - Format code with Oxfmt
- `bun run lint:fix` - Run linter with auto-fix
- `bun run db:generate` - Generate database migrations
- `bun run db:migrate` - Run database migrations

## Better Auth Integration

This project uses [Better Auth](https://better-auth.com/) for authentication, integrated with Elysia.js through a custom plugin.

### Configuration

The auth configuration (`src/auth.ts`) includes:

- **Database Adapter**: Drizzle ORM with PostgreSQL
- **Authentication Methods**: Email and password signup/signin enabled
- **Plugins**: OpenAPI for API documentation generation
- **Base Path**: All auth routes are prefixed with `/auth`

### Elysia Plugin

A custom Elysia plugin (`src/plugins/better-auth.ts`) mounts Better Auth's handler and provides an `auth` macro for route protection:

```typescript
// Protected route example
.get('/user', ({ user }) => user, {
  auth: true,  // Requires authentication
})
```

The plugin automatically resolves user sessions and provides `user` and `session` objects in route handlers.

### Available Endpoints

- `GET/POST /auth/*` - All Better Auth endpoints (signup, signin, session management)
- Authentication routes are auto-generated and documented via OpenAPI

## Tools and Technologies

### Core Framework
- **[Elysia.js](https://elysiajs.com/)** - Fast web framework for Bun
- **[Bun](https://bun.com)** - JavaScript runtime and package manager

### Authentication
- **[Better Auth](https://better-auth.com/)** - Modern authentication library with email/password support

### Database
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe SQL query builder
- **[PostgreSQL](https://postgresql.org/)** - Primary database
- **[Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)** - Migration and schema management

### Development Tools
- **[Oxlint](https://oxc.rs/docs/learn/linter.html)** - Fast JavaScript/TypeScript linter
- **[Oxfmt](https://oxc.rs/docs/learn/formatter.html)** - Fast JavaScript/TypeScript formatter
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[lint-staged](https://github.com/okonet/lint-staged)** - Run linters on staged files
- **[@elysiajs/cors](https://github.com/elysiajs/cors)** - CORS middleware
- **[@elysiajs/openapi](https://github.com/elysiajs/openapi)** - OpenAPI documentation

### Configuration
- **Path Aliases**: `@/` maps to `src/` directory
- **Editor Config**: Consistent coding style across editors
- **Pre-commit Hooks**: Automatic linting and formatting on commits

## Project Structure

```
├── src/
│   ├── auth.ts              # Better Auth configuration
│   ├── plugins/
│   │   └── better-auth.ts   # Elysia plugin for Better Auth integration
│   └── db/
│       ├── db.ts            # Database connection
│       └── schema.ts        # Drizzle schema
├── .vscode/             # VSCode settings
├── .husky/              # Git hooks
├── drizzle/             # Database migrations
├── index.ts             # Main server file
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── .env.example         # Environment variables template
```

## Contributing

1. Follow the established code style (enforced by Oxlint and Oxfmt)
2. Use path aliases (`@/`) for imports
3. Run migrations after schema changes
4. Commit messages should be descriptive

This project was bootstrapped with `bun init` in Bun v1.3.5.
