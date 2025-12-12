# Testing & QA Checklist

Use before shipping. Aligns with `docs/implementation-plan.md`, `docs/styling-plan.md`, and `docs/deployment.md`.

## Automated
- `npm run lint`
- `npm run check`
- `npm run build`

## Visual & UX
- Responsive: hero/cards/nav/form across mobile/tablet/desktop.
- Contrast: accents on dark base `#0a0a0a` meet accessibility expectations.
- Focus states: all links/buttons/forms show visible focus rings.
- Motion: respect `prefers-reduced-motion`; animations degrade gracefully.

## Forms
- Contact form submits to Netlify (check dashboard).
- Validation messages appear and are readable.
- Booking CTA goes to EngineEars URL from `site_info`.

## Performance
- Lighthouse: check LCP/CLS/TTI; ensure minimal client JS (islands only where needed).
- Image weight: hero/gear images optimized; no layout shift on load.

## Data integrity
- All copy rendered from `src/data/site-data.json`; no stray hardcoded strings.
- Gear/services/amenities lists match `content_and_data.json`.

## Regression smoke
- Navbar anchors scroll correctly.
- Footer shows contact email and booking link.
- No console errors in production build preview.

