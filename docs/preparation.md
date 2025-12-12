# Beach House Studios – Preparation Guide

Use this guide before building or refactoring the site so work stays aligned with our constraints (Tailwind v4, Brevo email, EngineEars booking) and the existing plan files.

## Reference Inputs
- `content_and_data.json` → source of truth for copy, services, and gear. Keep it under `src/data/site-data.json` once the app scaffold exists.
- `README_DevPlan.md` → high-level project and launch checklist.
- Any future `professional_style_guide_refactoring_plans.md` → follow if present.

## Environment & Tooling
- Node 18+ and PNPM or npm. Add Astro + Tailwind v4 on init (`npm create astro@latest` and configure Tailwind v4 syntax).
- Netlify for deploy/forms; set `data-netlify="true"` on the contact form.
- Email provider is Brevo (replaces SendGrid); wire transactional follow-ups to Brevo if needed.

## Data & Assets Prep
- Normalize `content_and_data.json` fields into a typed helper (e.g., `SiteContent` interface) before component use.
- Place required media under `public/`: hero/people/gear images, logo SVG, and `audio/demo-reel.mp3`. Add lightweight placeholders if assets are missing.
- Keep copy edits in JSON; components should consume data, not hardcode strings.

## Layout & Components (pre-build checklist)
- Global layout: dark theme, responsive nav; set SEO meta + Open Graph from site info.
- Hero/value/about/services/gear/amenities components should be data-driven. `GearList` must iterate categories/items from JSON.
- Booking CTA points to EngineEars URL; secondary CTA can anchor to gear or contact.
- Contact form: Netlify attributes, basic validation, success/error states; optional Brevo webhook for confirmations.

## Style & Accessibility
- Tailwind v4 utilities only; avoid v3 patterns. Keep spacing/typography tokens consistent across components.
- Check color contrast against dark background; prefer semantic HTML and keyboard focus styles.

## QA & Handoff
- Run lint/type checks (`npm run lint`, `npm run check`) and a quick Lighthouse pass.
- Document deviations or new patterns in `docs/implementation-notes.md` (create if missing) and update `README_DevPlan.md` when scopes change.

