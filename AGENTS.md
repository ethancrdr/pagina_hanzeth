# AGENTS.md

## Project
Single-page landing funnel for Hanzeth Cordero. One page, two paths: 4Life supplement customers and SEN business opportunity prospects. Mobile-first, conversion-optimized, lead-capture via a gated quiz + WhatsApp / Calendly.

Full original brief (sections, copy, technical requirements): `docs/proposal-inicial.md`.

## Status
Greenfield. Empty repo: no `package.json`, no git, no source code, no `node_modules`. Nothing has been built yet.

## Stack
- **Preferred:** Next.js (App Router) + TypeScript + Tailwind CSS. Hosted on Vercel or Netlify with edge functions for IP geolocation.
- **Video:** Vimeo Premium or Wistia, clean embed (no external search bars, no related-video suggestions).
- **Scheduling:** Calendly embed or pre-filled WhatsApp Business deep link.
- **Quiz / lead-capture backend:** TBD — likely a serverless function writing to a sheet/DB. Not a CMS.
- **Stack is not locked.** Confirm with Hanzeth before scaffolding.

## Hard constraints
These are explicit requirements in the brief. Do not violate any of them.

- **Mobile-first.** ~90% of traffic is mobile (WhatsApp, Instagram, Facebook). Every layout, animation, and CTA must work on a 360px-wide screen first.
- **No YouTube embeds.** Use Vimeo Premium or Wistia only.
- **No self-hosted video files.** Hosting them on the app's server tanks load time.
- **HTTPS / SSL required.**
- **Meta Pixel + GA4** installed before launch, with events for: hero CTA clicks, quiz step transitions, quiz completions, WhatsApp clicks, 4Life store redirects.
- **4Life links must carry Hanzeth's distributor ID.** Use IP geolocation to route US / CO / ES / CR visitors to the right country store (confirm the final country list with Hanzeth).
- **Page must load in < 2 seconds** on mobile.
- **Quiz runs before direct contact.** No WhatsApp or calendar link is reachable without finishing the quiz.

## Open assets needed from Hanzeth before launch
- WhatsApp Business number
- Calendly link (or "skip — WhatsApp only")
- 4Life distributor ID + final list of country stores to route to
- Vimeo / Wistia video IDs for: hero, 4Life science, SEN opportunity
- Real product names + prices for the catalog carousel
- Meta Pixel ID + GA4 Measurement ID
- Confirmed wording and links for SEN references (Dr. Herminio Nevárez, sen.team)

## Workflow
This project follows the superpowers skill workflow. The order is mandatory.

1. `brainstorming` → produce a design spec at `docs/superpowers/specs/`
2. Get user (Hanzeth) approval of the spec
3. `writing-plans` → produce an implementation plan at `docs/superpowers/plans/`
4. Implement with TDD where it pays off (quiz routing, geolocation logic, form validation, lead routing)
5. `verification-before-completion` before claiming anything is done

Do not scaffold code or install dependencies until the design spec is approved and the implementation plan exists.

## Repo conventions
- Specs → `docs/superpowers/specs/`
- Plans → `docs/superpowers/plans/`
- Original brief → `docs/proposal-inicial.md`
- Video assets → Vimeo / Wistia, never in `public/`
- Image assets → `public/` only after optimization (WebP / AVIF, sized for mobile first)
- User-facing copy → Spanish. Code, identifiers, commit messages → English.

## Out of scope (do not build in v1)
- The members-only / private zone — explicitly a future phase, not part of this build.
- Heavy UI frameworks (Material UI, Ant Design, Chakra) — Tailwind + small custom components is enough for one page.
- A custom CMS — the page is small enough to be a mostly-static Next.js app with a thin serverless backend.
