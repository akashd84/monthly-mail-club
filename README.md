# Monthly Mail Club

A workflow-first MVP foundation for artists who run recurring physical mail clubs.

## Stack

- Next.js App Router + TypeScript
- Prisma + PostgreSQL
- Tailwind CSS with a small shadcn/ui-style component structure
- Zod validation
- Server actions and domain services
- Better Auth-ready auth scaffold

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

3. Set `DATABASE_URL` to a PostgreSQL database.

4. Generate an address encryption key:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

   Paste the value into `ADDRESS_ENCRYPTION_KEY`.

5. Create the database schema:

   ```bash
   npx prisma migrate dev --name init
   ```

6. Start local dev on the project default port:

   ```bash
   PORT=3009 npm run dev
   ```

Production/Coolify should run on `PORT=3000`.

## MVP scope

Built for the initial workflow: clubs, plans, included items, subscribers, encrypted addresses, mail runs, fulfillment statuses, CSV export service, and audit logging. Marketplace, Stripe Connect, Patreon, Ko-fi, custom domains, shipping APIs, and inventory accounting are intentionally deferred.
