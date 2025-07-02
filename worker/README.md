# SyncWave Worker

## Database Migration: MongoDB → PostgreSQL

This project has been migrated from MongoDB to PostgreSQL with Prisma ORM.

## Quick Setup

### 1. Environment Variables
Create a `.env` file in the worker directory:

```bash
# PostgreSQL Database Configuration
DATABASE_URL=postgresql://syncwave_user:syncwave_password@localhost:5432/syncwave_db?schema=public

# Other environment variables...
OPENAI_API_KEY=your_openai_api_key_here
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
BEARER_TOKEN=your_bearer_token_here
NODE_ENV=development
```

### 2. Install Dependencies
```bash
bun install
```

### 3. Setup Database
```bash
# Generate Prisma client
bun run db:generate

# Push schema to database (creates tables)
bun run db:push

# Or run migrations (if you prefer migration files)
bun run db:migrate
```

### 4. Start Development Server
```bash
bun run dev
```

## Database Management

- **Prisma Studio**: `bun run db:studio` - Visual database browser
- **Generate Client**: `bun run db:generate` - Regenerate Prisma client after schema changes
- **Push Schema**: `bun run db:push` - Push schema changes to database
- **Migrate**: `bun run db:migrate` - Create and run migration files

## Data Migration (if coming from MongoDB)

If you have existing MongoDB data to migrate:

1. Ensure both MongoDB and PostgreSQL are running
2. Set both `MONGODB_URI` and `DATABASE_URL` in your environment
3. Run the migration script:

```bash
bun run migrate-data
```

## Docker Setup

The project includes PostgreSQL and PgAdmin in docker-compose.yml:

- **PostgreSQL**: localhost:5432
- **PgAdmin**: localhost:5050 (admin@syncwave.com / admin)

## API Endpoints

All existing API endpoints remain the same - only the underlying database implementation has changed.
