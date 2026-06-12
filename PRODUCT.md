# Product

## Register

brand

## Users

**Primary**: Spanish-speaking adults (Colombia, España, Costa Rica, EE. UU. hispano) arriving from WhatsApp, Instagram, Facebook, and direct link shares. ~90% mobile. They have one of two intents:

- **Wellness seeker**: open to a 4Life supplement stack, may buy once or convert to repeat customer. Low trust in another MLM-style page; will bounce in <10s if it feels templatey.
- **Business prospect**: open to a residual-income opportunity, expects "system" and "mentorship" not "hustle". Will judge the seriousness of the offer by the seriousness of the page.

**Secondary**: Hanzeth himself uses the page as a sales asset — it must look credible enough to send a warm lead without it hurting the relationship.

## Product Purpose

A single-page conversion funnel that:

1. Splits incoming traffic into two tracks (4Life customer vs. SEN business prospect) within the first viewport.
2. Captures qualified leads via a 3-question quiz gated before any direct contact.
3. Routes customers to their country-specific 4Life store (US/CO/ES/CR via IP geolocation, distributor ID embedded) and business prospects to a WhatsApp deep-link with quiz answers pre-filled.

Success = the highest possible % of mobile visitors who finish the quiz and reach either a 4Life store click or a WhatsApp click.

## Brand Personality

**Three words**: sobrio, directo, convincente.

- **Sobrio**: not flashy, not excited. The page is a sales tool, not a brochure. The 4Life product is real science; the SEN business is a real system. Page mirrors that.
- **Directo**: no marketing fluff, no superlatives, no "transform your life" tropes. Plain verbs and concrete nouns.
- **Convincente**: visual restraint is the persuasion. The page looks like a real person's site, not a template, because that's what differentiates it from every other distributor page.

**Tone of voice**: Spanish (neutral, not regional). Plain, not formal. Second-person singular ("tú") rather than "usted" — closer to WhatsApp voice. Sentence-level, not slogans.

## Anti-references

- "Network marketing brochure" aesthetic: stock photos of smiling groups, gold gradients, italic script fonts, "join my team" copy.
- 2018-era SaaS landing pages: hero with one big H1 + email input + "Trusted by" logo wall + 3 feature cards.
- Notion/Linear-clone dark mode: the brand is a person, not a tool — it should not feel like a developer product.
- Awwwards-experimental: scroll-hijack, kinetic type, GSAP staggers. Wrong register for a sales funnel.
- Generic wellness/DTC aesthetic: cream backgrounds, copper/ochre accents, espresso text. Banned for this project (see DESIGN.md).

## Design Principles

1. **One page, two doors.** The hero must surface both intents (health, business) above the fold on a 360px screen. No nested nav, no scroll-to-discover.
2. **Quiz as gate, not friction.** The quiz is a filter and a lead-qualifier, not a hurdle. 3 questions, <60 seconds, must feel lighter than a form.
3. **Editorial restraint > visual noise.** Color, type, and motion exist to support the funnel, not to entertain. A 4Life customer landing here from WhatsApp must take the page seriously in the first 3 seconds.
4. **The page itself is the proof.** Hanzeth's offer is "I built a real business with a real system." A slop-looking page contradicts that claim. Visual quality is part of the value prop.
5. **Mobile-first, but never mobile-only.** The desktop view is the long-form reading view; the mobile view is the action view. Both must hold up.

## Accessibility & Inclusion

- WCAG 2.1 AA: body text ≥4.5:1 against background, large text ≥3:1.
- All CTAs are real `<a>` / `<button>`, not divs. Keyboard navigable, focus-visible rings.
- `prefers-reduced-motion: reduce` honored on every animation.
- Language: `lang="es"` on `<html>`. Copy is Spanish throughout; code, identifiers, and commit messages are English.
- The whole flow (hero, quiz, form, results) must be completable with no mouse, no JS beyond the quiz, and no assumed prior knowledge of 4Life or SEN.
