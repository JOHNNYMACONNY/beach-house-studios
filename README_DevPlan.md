# Beach House Studios - Development Plan

## 1. Project Overview
* **Goal:** Create a high-performance, SEO-optimized portfolio and booking site for The Beach House LA.
* **Key Features:** Visual-heavy hero section, "Plug-and-Play" value proposition, Gear List, Hybrid Booking (Direct Form + EngineEars link).
* **Tech Stack:** Astro (Framework), Tailwind CSS (Styling), Netlify (Hosting & Forms).

## 2. Directory Structure (Setup this folder first)
/beach-house-studios
  ├── src/
  │   ├── components/       # (AI will generate these: Navbar, Hero, GearGrid)
  │   ├── pages/            # (index.astro)
  │   ├── layouts/          # (Layout.astro)
  ├── public/
  │   ├── images/           # (Put your .jpg/.png files here)
  │   │   ├── hero-main.jpg
  │   │   ├── gregory-headshot.jpg
  │   │   ├── gear-mic.jpg
  │   │   └── vibe-patio.jpg
  │   ├── branding/
  │   │   └── logo.svg
  │   └── audio/
  │       └── demo-reel.mp3

## 3. Design System (UPDATED)
*   **Theme:** "Mindful / Organic" (Supersedes Industrial).
*   **Background:** `#0A0A0A` (Void)
*   **Palette:** Square Harmony (Amber, Indigo, Emerald, Rose).
*   **Font:** Instrument Serif (Display), Inter (Body).
*   **See:** `docs/DESIGN_SYSTEM.md` for full specs.

## 4. Execution Steps (Prompts for AI)
1.  **Init:** "Initialize a new Astro project with Tailwind CSS."
2.  **Layout:** "Create a global Layout.astro with a dark theme background and a responsive navbar."
3.  **Content:** "Create index.astro using the text from my copy_deck.md file."
4.  **Gear:** "Create a GearList.astro component that renders the data from gear.json into a responsive grid."
5.  **Forms:** "Create a contact form with `data-netlify='true'` for Netlify submission handling."

## 5. Launch Checklist
* [ ] Buy Domain (Namecheap/Google).
* [ ] Push code to GitHub.
* [ ] Connect GitHub repo to Netlify.
* [ ] Add Custom Domain in Netlify settings.
* [ ] Test Contact Form.

