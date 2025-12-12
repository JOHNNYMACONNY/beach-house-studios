# Assets Manifest

Use this to keep file names and locations consistent with the design and copy. Reference `docs/styling-plan.md` for overlays and `docs/implementation-plan.md` for component usage.

## Locations
- Images: `public/images/`
- Branding: `public/branding/`
- Audio: `public/audio/`

## Required assets (filenames and notes)
- `public/images/hero-main.jpg` — main hero background (optimize; provide WebP if possible).
- `public/images/gregory-headshot.jpg` — about section portrait.
- `public/images/gear-mic.jpg` — gear imagery.
- `public/images/vibe-patio.jpg` — lifestyle/environment.
- `public/branding/logo.svg` — monochrome-friendly; inverted variant if needed.
- `public/audio/demo-reel.mp3` — audio reel.

## Guidelines
- Prefer WebP alongside JPG/PNG; ensure dimensions suit their placement (hero: wide desktop crop; cards: balanced aspect to avoid layout shift).
- Keep file sizes lean; pre-size assets to the rendered dimensions when possible.
- Use overlays (`bg-black/40`) on busy images to maintain text legibility.
- Keep naming stable to match references in code and docs.

