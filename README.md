# AICreds

A marketplace for buying and selling unused AI platform credits.

## What it does

- **Sellers** list credits by platform (OpenAI, Anthropic, Azure OpenAI, Gemini, Midjourney, and more), amount, asking price, and contact channels (email, phone, WhatsApp, Telegram, Discord, Reddit).
- **Buyers** browse and filter listings, then reach sellers directly off-platform.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Postgres database (`DATABASE_URL`)

## Develop

```bash
npm install
vercel env pull .env.local
npm run db:migrate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
- `npm run db:migrate` — create `listings` table
- `npm run db:migrate -- --clear` — create table and delete all listings

## Database

Listings are stored in the `listings` table and shared across all users.
