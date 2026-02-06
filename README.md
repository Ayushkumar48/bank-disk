# Wallet Service

A simple API for managing digital wallets with features like topping up, spending, and bonuses. Built for handling Valorant Points, Radianite, and Kingdom Credits.

## Tech Choices

I picked **Hono** for the web framework because it's lightweight and fast for APIs. **Drizzle ORM** with PostgreSQL for the database—it's type-safe and easy to use without the overhead of bigger ORMs. **Bun** for runtime since it's quick to develop with. **Pino** for logging to keep things structured. **Zod** for validation to catch errors early. **Prometheus** for metrics because monitoring is key in production.

## Concurrency Strategy

To handle multiple users at once, I use database transactions with row-level locking. For wallet updates, I lock wallets in a consistent order (by ID) to avoid deadlocks. This keeps things safe without slowing down too much.

## Setup

### With Docker (Recommended)
1. Install Docker and Docker Compose.
2. Stop local PostgreSQL if running: `sudo systemctl stop postgresql` (or `sudo service postgresql stop`).
3. Run `docker-compose up --build` to spin up the app, database, and seed data automatically.
4. The app will be at `http://localhost:3000`.

### Manual Setup
Run `./setup.sh` for automated setup, or follow these steps:

1. Install dependencies: `bun install`
2. Set up PostgreSQL locally or use Docker for DB.
2. Set up your `.env` file with database URL (e.g., `DATABASE_URL=postgresql://wallet_user:wallet_pass@localhost:5433/wallet_db` for Docker DB)
4. Create DB: `bun run db:create` (requires sudo access to postgres user)
5. Generate and run migrations: `bun run db:generate` then `bun run db:migrate`
6. Run the seed script to add initial data: `bun run db:seed`
7. Start the app: `bun run dev`

The seed adds 5 users with Valorant assets and some starting balances.

## API Endpoints

All requests need `x-user-id` header (e.g., `d4e5f6a7-b8c9-0123-def0-456789012345` for Rahul). Wallet routes require `Idempotency-Key` header.

- `GET /health` - Check if the service is running.
- `GET /api/wallets/balances` - Get all balances for a user.
- `GET /api/wallets/ledger` - Get transaction history for a user.
- `POST /api/wallets/top-up` - Add money to a wallet. Body: `{ assetCode: "VP", amount: 100, description?: "Buy" }`
- `POST /api/wallets/bonus` - Give a bonus (same as top-up).
- `POST /api/wallets/spend` - Spend from a wallet. Body: same as top-up.
- `GET /metrics` - Prometheus metrics for monitoring.

Use the Postman collection in `src/postman/` for testing.

## Running

- Dev: `bun run dev` (runs on port 3000)
- DB tools: `bun run db:studio` for a GUI

That's it—keeps things simple and focused.