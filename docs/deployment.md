# Deployment Guide (Netlify)

Use with `docs/implementation-plan.md` and `docs/preparation.md`.

## Prereqs
- Astro app with Tailwind v4.
- Netlify CLI installed (optional for local testing).
- Environment: Node 18+.

## Adapter and config
- Install Netlify adapter: `npm i -D @astrojs/netlify`.
- Update `astro.config.mjs` to use the Netlify adapter.
- Add `netlify.toml` (or verify) with build command `npm run build` and publish directory `dist/`.

## Forms
- Contact form: set `method="POST"`, `data-netlify="true"`, include hidden `input name="form-name" value="contact"`, add honeypot field if desired.
- Test after deploy by submitting and checking Netlify Forms dashboard.

## Env and secrets
- Brevo keys or webhook URLs go in Netlify environment variables; never ship to the client.
- If using serverless functions for Brevo, keep dependencies minimal and avoid bundling secrets client-side.

## Build and deploy steps
1) `npm install`
2) `npm run check`
3) `npm run build`
4) Push to repo connected to Netlify or trigger via CLI (`netlify deploy --prod`).

## Rollout checks
- Confirm pages render with base background `#0a0a0a` and correct fonts.
- Verify booking CTAs link to EngineEars URL from `site_info.booking_url`.
- Submit the contact form (Netlify dashboard receives submission).
- Spot-check Lighthouse for LCP/CLS and ensure minimal client JS.

## Cross-links
- Architecture and data flow: `docs/architecture.md`.
- Styling and tokens: `docs/styling-plan.md`.
- Testing steps: `docs/testing-checklist.md`.

