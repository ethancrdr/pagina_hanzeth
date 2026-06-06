# Hanzeth Cordero — Landing Funnel

Single-page funnel for 4Life Research + SEN. Mobile-first, conversion-optimized, lead-capture via gated quiz.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 3
- Vercel (edge middleware for IP geolocation, serverless functions for the lead API)
- Google Sheets + Resend for lead persistence + notification

## Local development

```bash
npm install
cp .env.example .env.local
# fill in your values in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | What it does                  |
| ------------------- | ----------------------------- |
| `npm run dev`       | Start the dev server          |
| `npm run build`     | Production build              |
| `npm run start`     | Run the production build      |
| `npm run lint`      | Lint with ESLint              |
| `npm run typecheck` | TypeScript check, no emit     |
| `npm test`          | Run unit tests (Vitest)       |
| `npm run test:e2e`  | Run E2E tests (Playwright)    |

## Environment variables

See `.env.example` for the full list. All `NEXT_PUBLIC_*` vars are exposed to the client; the rest are server-side only.

## Deploy

Connect this repo to Vercel. Set the env vars in the Vercel dashboard. Push to `main` to deploy.

## Project structure

```
app/              # Next.js App Router (layout, page, api routes)
components/       # UI components, organized by section
lib/              # Pure logic (geo, quiz, integrations)
middleware.ts     # Edge: reads request.geo, sets visitor country
tests/            # Unit (Vitest) + E2E (Playwright)
docs/             # Specs, runbooks, original brief
hanzeth/          # Static HTML prototype (reference only)
```

## Reference

- Original brief: `docs/proposal-inicial.md`
- Design prototype: `hanzeth/Hanzeth Cordero Funnel.html`
- Workflow: `AGENTS.md`
