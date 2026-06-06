# Runbook — Hanzeth Cordero Landing

Operational guide for the landing page. Read this before going live, when something breaks, or when handing off to Hanzeth.

## Pre-launch checklist

Before pointing a real domain at the deployment, verify every item.

### Env vars (set in Vercel project settings)
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` — E.164 format, no `+` sign
- [ ] `NEXT_PUBLIC_FOURLIFE_URL_US`, `_CO`, `_ES`, `_CR` — distributor URLs
- [ ] `NEXT_PUBLIC_FOURLIFE_URL_DEFAULT` — fallback for visitors from any other country
- [ ] `NEXT_PUBLIC_META_PIXEL_ID` — from Meta Events Manager
- [ ] `NEXT_PUBLIC_GA4_ID` — GA4 Measurement ID
- [ ] `GOOGLE_SHEETS_PRIVATE_KEY` — service account key, with `\n` literals preserved
- [ ] `GOOGLE_SHEETS_CLIENT_EMAIL` — service account email
- [ ] `GOOGLE_SHEETS_SHEET_ID` — destination sheet
- [ ] `RESEND_API_KEY` — from Resend dashboard
- [ ] `HANZETH_NOTIFY_EMAIL` — where lead notifications go

### Videos and assets
- [ ] Hero video uploaded to Vimeo/Wistia. ID placed in the Hero component TODO.
- [ ] 4Life science video (≤ 2 min) uploaded. ID placed in the Wellness TODO.
- [ ] SEN opportunity video uploaded. ID placed in the Business TODO.
- [ ] All video embeds configured without external search bars and without autoplay with audio.
- [ ] Real product images and prices for the 4Life carousel.

### Analytics verification
- [ ] Visit the page in a real browser with Meta Pixel Helper installed. Trigger a hero CTA, complete a quiz, click a WhatsApp link. Each event shows in the Events Manager test panel.
- [ ] Open GA4 DebugView (via `https://yourdomain.com/?_dbg=1` or the GA DebugChrome extension). Same flow, verify events arrive.

### Funnel verification
- [ ] Test from each of the 4 country IPs (use a VPN or Vercel's edge config). Verify the right 4Life URL appears in the post-quiz redirect.
- [ ] Test the full quiz on a real mobile (360px wide). Verify the form fields, the WhatsApp button, the back navigation, and the result branching.
- [ ] Submit a test lead. Verify it lands in the Google Sheet and the Resend email arrives.
- [ ] Reject cookies in the banner. Verify Pixel and GA4 do NOT fire. Accept cookies, verify they DO fire.
- [ ] Submit a quiz. Verify the WhatsApp floating button appears on subsequent visits.

### Performance
- [ ] Lighthouse mobile ≥ 90 in Performance and Accessibility.
- [ ] LCP < 1.2s on 4G mobile.
- [ ] Total page weight < 1.5 MB.

### Compliance
- [ ] Privacy policy page exists (currently a placeholder link in the footer).
- [ ] Cookie banner appears on first visit, persists choice in `localStorage`.
- [ ] Footer disclaimer about results and disassociation with Meta/Google/4Life is in place.

## Local development

```bash
npm install
cp .env.example .env.local  # fill in your values
npm run dev
```

Open http://localhost:3000.

To simulate a specific country without a VPN:
- `http://localhost:3000/?country=US` — overrides the visitor country for the request
- Or set `DEV_VISITOR_COUNTRY=CO` in `.env.local` for a fixed override

To test the lead API directly:
```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -H "x-visitor-country: CO" \
  -d '{"name":"Test","email":"t@t.com","cc":"57","phone":"3001234567","priority":"income","time":"5-10","interest":"4"}'
```

## Adding a new country to the 4Life routing

1. Add `NEXT_PUBLIC_FOURLIFE_URL_XX` to `.env.example` and to Vercel env vars.
2. In `tailwind.config.ts` and `lib/geo.ts` the env var is read by name; no code change needed.
3. In `lib/quiz/scoring.ts`, add the new code to `ccToCountry`:
   ```ts
   'XX': 'XX',
   ```
4. In the Quiz form (Step 4), add the new `<option>` to the country code select.
5. Re-deploy.

## Debugging common issues

### Lead doesn't appear in Google Sheets
- Check Vercel function logs for `[/api/lead] persistence failures`.
- Verify the service account has edit access to the sheet (share the sheet with the service account email).
- Verify `GOOGLE_SHEETS_PRIVATE_KEY` has proper `\n` literal escapes; if pasted via Vercel UI, the newlines are often lost.

### Email notification doesn't arrive
- Check Resend dashboard logs.
- Verify `HANZETH_NOTIFY_EMAIL` is a real address.
- In dev, `RESEND_API_KEY` may not be set — the API still returns 200 but logs `email-not-configured`.

### Pixel / GA4 not firing
- Verify the user clicked "Aceptar" on the cookie banner. The scripts only load after consent.
- Check `localStorage.getItem('hc_cookie_consent')` in DevTools — it should be `"all"`.
- Verify `NEXT_PUBLIC_META_PIXEL_ID` and `NEXT_PUBLIC_GA4_ID` are set in the deployed env vars (case-sensitive).

### Country not being detected
- In production, Vercel's `request.geo` is provided automatically. If it returns `XX`, the IP couldn't be geolocated (VPN, proxy).
- The fallback chain is: middleware `?country=` override (dev) > `DEV_VISITOR_COUNTRY` env (dev) > `request.geo.country` > `'XX'`.
- When `country === 'XX'`, the API uses the form's `cc` field as a last resort.

### Quiz pre-selection not working
- The Hero CTAs use `?intent=health#quiz` and `?intent=business#quiz`. The Quiz reads the `intent` query param via `useSearchParams()`.
- If the user lands on the page via a direct link to `/#quiz` (no query param), no pre-selection happens — that's correct.

## Production deployment

This project deploys to Vercel. Standard flow:

1. Push to `main` on the connected GitHub repo.
2. Vercel builds and deploys automatically.
3. Set custom domain in Vercel dashboard.
4. Verify the pre-launch checklist above on the production URL.

Preview deployments are generated for every PR — use them to test changes before merging.

## Architecture map

| Layer | Where | Notes |
| --- | --- | --- |
| Edge (geo) | `middleware.ts` | Sets `x-visitor-country` header from `request.geo` (or dev override) |
| Serverless API | `app/api/lead/route.ts` | Validates with Zod, persists to Sheets + Resend, returns redirect |
| Pure logic | `lib/quiz/`, `lib/geo.ts`, `lib/analytics/` | No React, no DOM — unit-testable |
| UI (server) | `components/hero/`, `wellness/`, `business/`, `footer/` | No interactivity |
| UI (client) | `components/quiz/`, `cookie-consent/`, `whatsapp-float/`, `analytics/`, `hero/HeroCTA` | State, effects, browser APIs |
| Analytics | `lib/analytics/load.ts` (Pixel + GA4 scripts after consent) | No-op if IDs not set |
| Tests | `tests/lib/` | Vitest, 25+ assertions on pure functions |
