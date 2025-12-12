# Beach House Studios – Implementation Plan

Use this as the build playbook for the Astro + Tailwind v4 site. It complements `docs/preparation.md`, `README_DevPlan.md`, and `content_and_data.json`.

## Goals
- Fast, dark-mode portfolio/booking site with minimal JS (Astro islands only where needed).
- Data-driven copy: consume `content_and_data.json` (move to `src/data/site-data.json` in-app).
- Booking flow: primary CTA → EngineEars URL; contact form via Netlify with optional Brevo follow-up.
- Styling: Tailwind v4 utilities, Inter + Instrument Serif, limited accent palette, card-based layout with subtle motion.

## Stack & Setup
- Astro project initialized with Tailwind v4 syntax.
- Fonts: import Inter + Instrument Serif once in global CSS; avoid multiple font CDN links.
- Icons: use Lucide via imports (no global CDN script); tree-shake per component.
- Deployment target: Netlify adapter; enable form handling.

## Data Mapping (from `content_and_data.json`)
- `site_info`: title, description, booking_url, contact_email → SEO meta, navbar CTA, footer/contact.
- `sections.hero`: headline, subhead, CTAs → hero component.
- `sections.value_prop`: headline/body → value section.
- `sections.about_producer`: name/role/bio/stats → about card.
- `sections.services[]`: title/desc → service cards grid.
- `sections.amenities[]`: bullet list → amenity chips/list.
- `gear_inventory.categories[]`: title/items → gear grid cards.

## Layout & Components
- `Layout.astro`: global shell, dark background `#0a0a0a`, text `#f5f5f5`, SEO tags, font imports, base styles.
- `Navbar`: studio name/logo, anchor links (gear, services, contact), booking button to EngineEars.
- `Hero`: background image or gradient overlay, primary/secondary CTAs, optional stats badge.
- `ValueProp`: concise copy block with supporting accent divider.
- `AboutProducer`: photo + bio + stats list.
- `ServicesGrid`: card layout with accent per service; uses data array.
- `GearList`: categories as cards; items as bullet chips; responsive grid.
- `Amenities`: simple list or pills; optional icon.
- `ContactForm`: Netlify attributes (`data-netlify="true"`, hidden `form-name`), fields (name, email, message), success/error states; optional Brevo webhook hook in an island if needed.
- `Footer`: contact email, social links (if provided), booking link.

## Styling & Motion
- Colors: base `#0a0a0a`, text `#f5f5f5`, accents (emerald/blue/purple/orange). Define in Tailwind config tokens to avoid hardcoded repeats.
- Cards: `rounded-3xl`, `border border-zinc-800`, soft shadows, `hover:scale-105` transitions. Use overlays (`bg-black/40`) on busy images.
- Animations: define keyframes in global CSS (fade/slide/blur). Add utility classes (e.g., `.fade-card`, `.fade-header`) and optional stagger via inline `style={{ animationDelay: '0.2s' }}` to keep Tailwind config simple.
- Typography: Inter for body, Instrument Serif for headings where needed; apply via utility classes (`font-instrument-serif`).

## Routing & Assets
- Pages: start with single-page `src/pages/index.astro`. Future expansion: `/gear` if list grows.
- Assets: place hero/about/gear images under `public/images/`; logo under `public/branding/`; `demo-reel.mp3` under `public/audio/`.
- Use WebP/optimized sizes; preload key hero image if necessary.

## Forms & Email
- Netlify form setup with honeypot field; display confirmation message inline.
- Brevo: if transactional emails are needed, add a serverless function or Brevo webhook integration (keep keys in env, not client).

## SEO & Analytics
- Set `<title>`, meta description from `site_info`; add Open Graph/Twitter tags and canonical URL.
- Optionally include JSON-LD for local business/studio.
- Add lightweight analytics (e.g., Netlify Analytics or a small script) later if desired.

## Testing & QA
- Commands: `npm run lint`, `npm run check`, `npm run build`.
- Visual QA: check contrast on dark backgrounds, focus states, mobile grids, and animation preference (respect `prefers-reduced-motion`).
- Performance: Lighthouse for LCP/CLS; ensure minimal client JS (only islands for form handling or observers).

## Delivery Steps
1) Init Astro + Tailwind v4; add Netlify adapter.
2) Add global styles (fonts, colors, animations) and layout shell.
3) Import `content_and_data.json` into `src/data/site-data.json` with typings.
4) Build components in order: Layout/Nav → Hero → ValueProp → About → Services → Gear → Amenities → Contact → Footer.
5) Wire CTAs (EngineEars, section anchors) and Netlify form.
6) Add SEO/meta, Open Graph, and structured data.
7) Optimize assets; run checks; deploy to Netlify and test form submission.

