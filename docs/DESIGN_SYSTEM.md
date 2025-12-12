# Beach House Studios - Design System

> **Aesthetic**: "Mindful / Organic / Professional"
> **Core Concept**: A high-end, meditative space for creativity, balanced by a rigorous geometric color system.

## 1. Color Palette: "Square Harmony"
The site uses a strict **Square Color Scheme**, meaning the four main colors are spaced equidistantly (90°) on the color wheel. This creates perfect mathematical balance.

| Role | Color Name | Hex / Tailwind | Usage |
| :--- | :--- | :--- | :--- |
| **Primary (Brand)** | **Golden Amber** | `#F59E0B` (Amber-500) | **Action**. Buttons, Badges, Focus States, "Warmth". |
| **Secondary** | **Deep Indigo** | `#6366F1` (Indigo-500) | **Depth**. Backgrounds, Professional Accents, "Night". |
| **Accent A** | **Organic Emerald** | `#10B981` (Emerald-500) | **Life**. Growth, Services, Nature. |
| **Accent B** | **Soft Rose** | `#F43F5E` (Rose-500) | **Vibe**. Comfort, Amenities, Emotion. |
| **Background** | **Void** | `#0A0A0A` | Global background. Deep charcoal/black. |
| **Text** | **Paper** | `#F5F5F5` | Primary text. |

### Section Themes
Each section "rotates" continuously through these axes to maintain variety:
*   **Services**: Cool Axis (**Emerald** & **Indigo**)
*   **Gear Locker**: Warm Axis (**Amber** & **Rose**)
*   **Producer**: Pro Axis (**Amber** Badge, **Indigo** Background)
*   **Amenities**: Vibe Axis (**Indigo** & **Rose**)
*   **Contact**: Brand Axis (**Indigo** Card, **Amber** Actions)

---

## 2. Typography
*   **Headlines**: `Instrument Serif` (Google Fonts). Used for all H1-H3. Elegant, editorial, "Old World" feel.
    *   Class: `.font-display`
*   **Body**: `Inter` (Google Fonts). Clean, legible, modern.
    *   Class: `.font-body`

---

## 3. Component Library

### `MindfulCard`
The core building block of the UI.
*   **Visual**: Glassmorphism (`bg-indigo-900/10`, `backdrop-blur`), Rounded-3xl, subtle border.
*   **Interaction**: Hover scale (`scale-[1.02]`), Hover Shadow.
*   **Animation**: `fadeInSlideBlur` on entry (staggered).

### Premium Buttons (`.btn-primary`)
*   **Shape**: `rounded-full` (Pill).
*   **Color**: **Golden Amber Gradient** (`from-amber-400 to-amber-500`).
*   **Effect**: "Light Source" Glow (`shadow-amber-500/20`).
*   **Interaction**: Magnetic Lift (`-translate-y-0.5`).

### Secondary Buttons (`.btn-secondary`)
*   **Shape**: `rounded-full` (Pill).
*   **Color**: Glass / Transparent border (`border-white/20`).
*   **Effect**: Frosted glass hover state.

---

## 4. Animations
*   **`fade-in-slide-blur`**: The signature entrance. Elements start lower, transparent, and blurred, then slide up into focus.
*   **Staggering**: Cards in a grid are staggered by `0.1s` increments.
