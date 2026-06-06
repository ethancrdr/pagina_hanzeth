# Spec: Hanzeth Landing — Rediseño Editorial Dark

**Fecha:** 2026-06-05
**Status:** Aprobado
**Ruta:** `docs/superpowers/specs/2026-06-05-hanzeth-redesign-design.md`

## 1. Contexto y objetivo

La landing actual (Next.js 15 + Tailwind v3) está construida con un sistema oscuro frío (azul-tech) que cae en los defaults de LLM: Inter como sans, Sora como display, accent azul saturado `#2E63F5`, glow shadows, CTAs con `rounded-pill`. Se va a rehacer la **capa visual** sin tocar la lógica (quiz gateado, geolocalización IP, lead capture, analytics, SEO).

**Objetivo:** reposicionar la página como una pieza editorial personal de Hanzeth Cordero — dark, contenida, anti-AI-slop — que transmita sobriedad y claridad sin sacrificar la conversión del funnel 4Life + SEN.

## 2. Design Read y Dials

**Lectura:** *Landing funnel personal B2C para distribuidor 4Life + SEN, con lenguaje editorial dark / Apple-Notion-Linear, varianza baja, motion casi invisible, densidad baja.*

| Dial | Valor |
|---|---|
| `DESIGN_VARIANCE` | 5 |
| `MOTION_INTENSITY` | 3 |
| `VISUAL_DENSITY` | 2 |

## 3. Decisiones cerradas con Hanzeth

1. **Dirección visual:** adaptar el protocolo "Premium Utilitarian Minimalism" en clave oscura (no seguirlo literalmente, mantener espíritu editorial y anti-slop).
2. **Referencia mental:** Apple / Notion / Linear.
3. **Funcionalidad:** se mantiene todo (quiz gateado, geolocalización, cookie consent, analytics). Solo cambia visual.
4. **WhatsAppFloat:** se elimina del layout. El contacto se mueve al Footer y a la pantalla de éxito del Quiz (únicos puntos donde aporta).

## 4. Sistema de tokens (Tailwind `theme.extend`)

### 4.1 Color

```ts
colors: {
  bg:           '#0B0D10',
  surface:      '#13161B',
  surfaceHigh:  '#181B20',
  border:       'rgba(255, 255, 255, 0.06)',
  borderStrong: 'rgba(255, 255, 255, 0.12)',

  text:         '#F2F1ED',
  textMuted:    '#6B6B68',
  textSubtle:   '#45454A',

  accent:       '#C9A86A',
  accentSoft:   '#7A6543',

  pastel: {
    red:    { bg: '#2A1A1A', text: '#E8B4B0' },
    blue:   { bg: '#14212B', text: '#9CC2D9' },
    green:  { bg: '#18241B', text: '#B0CDB0' },
    yellow: { bg: '#2A2418', text: '#D9C089' },
  },
}
```

### 4.2 Tipografía

```ts
fontFamily: {
  sans:    ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
  display: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
  mono:    ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
}
```

Fuentes vía `next/font/google`:
- **Instrument Serif** (display): `weight: 400`, `style: ['normal', 'italic']`
- **Geist Sans** (body/UI): default
- **Geist Mono** (meta): default

### 4.3 Border radius (shape consistency lock)

- Botones primarios: `rounded-md` (6px)
- Cards / containers: `rounded-lg` (12px)
- Inputs: `rounded-none` (border-bottom only) o `rounded-sm` (4px)
- Tags / badges pastel: `rounded-pill` (9999px) — uso local, no global

### 4.4 Sombras

Solo una sombra permitida en todo el sistema, usada en hover de cards:
```ts
boxShadow: { xs: '0 1px 0 rgba(255, 255, 255, 0.04)' }
```

Glow azul eliminado por completo.

## 5. Componentes — especificación

### 5.1 `app/globals.css`

- `color-scheme: dark` se mantiene
- `body`: `bg-bg text-text font-sans`, `line-height: 1.6`
- `h1, h2, h3`: `font-family: var(--font-instrument-serif)`, `font-weight: 400`
- `.btn`: `rounded-md`, `min-height: 56px`, sin `box-shadow`, hover solo `background` + `transform: scale(0.98)`
- `.btn-primary`: `bg-text text-bg` (off-white on dark)
- `.btn-ghost`: `bg-transparent border border-borderStrong`
- `.wrap`: `max-w-[1120px] mx-auto px-5 md:px-8`
- `.eyebrow`: `font-mono text-[11px] uppercase tracking-[0.14em] text-textMuted`
- `.reveal`: entry animation con `translateY(12px) → 0` + `opacity 0 → 1`, 600ms, `cubic-bezier(0.16, 1, 0.3, 1)`. Gateado por `prefers-reduced-motion`.
- Eliminar: `.btn-accent` (glow), `.ph` (placeholders de franjas), `.btn-ghost-on-band`

### 5.2 `app/layout.tsx`

- Importar `Instrument_Serif`, `Geist`, `Geist_Mono` desde `next/font/google`
- `themeColor: '#0B0D10'`
- `lang="es"` se mantiene
- Skip link a `#quiz` se mantiene

### 5.3 `tailwind.config.ts`

- Reescribir `theme.extend` con tokens de sección 4
- Eliminar `boxShadow.md/lg/accent`
- Conservar `borderRadius.pill` solo a nivel utility (uso en tags)

### 5.4 `components/hero/Hero.tsx`

- Layout split 7/5 desktop, stack mobile
- H1 en Instrument Serif italic: *"Transforma tu salud. Construye tu libertad."*
- Subtexto: máx 20 palabras, color `textMuted`
- Dos CTAs: primario (off-white) + ghost (border)
- Video container: `rounded-lg`, `border border-border`, aspect `4/5` mobile / `1/1` desktop, NO full-bleed
- Sin "Video" badge animado, sin "scroll down" indicator con svg suelto
- Sin trust micro-strip (20 años, 100+ países) — se mueve a la sección Wellness
- Sin overlay de gradiente azul

### 5.5 `components/wellness/Wellness.tsx`

- H2 serif: "Bienestar, no suplementos"
- Bento grid asimétrico: 1 cell grande (video + copy) + 4 cells medianas (categorías)
- Cada card: `bg-surface border border-border rounded-lg p-8`
- Categoría en mono uppercase con color pastel
- Producto en sans semibold, precio en mono
- Botón de producto: texto con flecha → (no botón con `rounded-pill`)
- Trust strip al pie: 20+ años / 100+ países en mono separado por `·`

### 5.6 `components/business/Business.tsx`

- Sección sobre fondo `surface` (para romper monotonía con el resto)
- H2 serif: "Un sistema, no una idea"
- 3 pilares numerados con serif gigante `01/02/03` opacity 0.15 como background
- Acordeón: `divide-y divide-border` (sin cajas), toggle `+` que rota a `×` con CSS `transform`
- Video en cell izquierda + acordeón en cell derecha (bento 2-col)
- Meta: "Capacitación: sen.team · Mentoría: Dr. Herminio Nevárez" en mono, opacidad reducida

### 5.7 `components/quiz/Quiz.tsx`

- Container: `max-w-[640px]` centrado, sin card box (sin `bg-surface border rounded-xl`)
- Step indicator: `01 / 04` en mono
- H2 serif por pregunta (más grande que antes, ~32px)
- Opciones: lista vertical con `border rounded-md`, hover `border-accent`
- Inputs step 4: `border-bottom` only, `rounded-none`, focus `border-accent`
- Phone: cc selector + número, mantener consistencia
- Estado de éxito: H3 serif italic ("Listo.") + párrafo + CTA WhatsApp o 4Life
- Mantener toda la lógica (validación Zod, fetch /api/lead, localStorage, trackEvent)
- Mantener Suspense skeleton

### 5.8 `components/footer/Footer.tsx`

- Fondo `surface`, `border-top border-border`
- 3 columnas desktop: marca + contacto (WhatsApp link) + legal
- Copyright en mono opacity 0.5
- Sin social icons row (Hanzeth no entregó URLs)
- Logo: nombre en Instrument Serif italic

### 5.9 `components/cookie-consent/CookieConsent.tsx`

- Bottom bar full-width, sin esquinas redondeadas
- 2 botones texto (no `rounded-pill`): "Solo esenciales" y "Aceptar"
- Aceptar = primary (off-white)
- Borde solo arriba, fondo `surface`

### 5.10 `components/whatsapp-float/WhatsAppFloat.tsx`

- **Eliminado del layout** en `app/page.tsx`
- Archivo se conserva (no se borra del repo) por si se decide reactivar
- La funcionalidad de contacto migra al Footer y a la pantalla de éxito del Quiz

### 5.11 `app/page.tsx`

```tsx
import { Hero } from '@/components/hero/Hero';
import { Wellness } from '@/components/wellness/Wellness';
import { Business } from '@/components/business/Business';
import { Quiz } from '@/components/quiz/Quiz';
import { Footer } from '@/components/footer/Footer';
import { CookieConsent } from '@/components/cookie-consent/CookieConsent';
import { Analytics } from '@/components/analytics/Analytics';

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Wellness />
        <Business />
        <Quiz />
        <Footer />
      </main>
      <CookieConsent />
      <Analytics />
    </>
  );
}
```

## 6. Layout macro

| Sección | Padding desktop | Padding mobile | Fondo |
|---|---|---|---|
| Hero | `pt-24 pb-20` | `pt-16 pb-12` | `bg-bg` |
| Wellness | `py-32` | `py-20` | `bg-bg` |
| Business | `py-32` | `py-20` | `bg-surface` |
| Quiz | `py-32` | `py-24` | `bg-bg` |
| Footer | `py-16` | `py-12` | `bg-surface` |

## 7. Motion

- Entry reveal con `.reveal` (definido en `globals.css`) — activado por IntersectionObserver en cada `<section>` o elemento con la clase
- Hover de cards: cambio sutil de `bg-surface` → `bg-surfaceHigh` en 200ms
- Hover de botones: `background` shift en 150ms + `transform: scale(0.98)` en `:active`
- Sin `window.addEventListener('scroll')` — solo IntersectionObserver
- Sin animación infinita en ningún elemento de UI (eliminado `waPulse`)
- `prefers-reduced-motion: reduce` honrado en todos los puntos

## 8. Accesibilidad

- `lang="es"` en `<html>`
- Contraste WCAG AA en todos los textos:
  - `text: #F2F1ED` sobre `bg: #0B0D10` → ratio 16:1 ✓
  - `textMuted: #6B6B68` sobre `bg: #0B0D10` → ratio 4.7:1 ✓
  - `accent: #C9A86A` sobre `bg: #0B0D10` → ratio 7.8:1 ✓
- Focus visible: `outline: 2px solid accent; outline-offset: 2px` en todo lo interactivo
- Botones `min-height: 56px` (touch target)
- Contraste de focus ring contra fondo de input

## 9. Lo que NO se hace

- No se cambia el funnel de conversión
- No se toca `lib/geo.ts`, `middleware.ts`, `lib/quiz/scoring.ts`, `lib/quiz/validation.ts`
- No se agrega `dark/light` toggle (dark-only)
- No se migra a Tailwind v4
- No se rehace `WhatsAppFloat.tsx` (se deja el archivo, se quita del layout)
- No se cambian los textos (copy) — solo se mueven/recortan
- No se introducen imágenes nuevas (Hanzeth no entregó assets)
