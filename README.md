# DSLR Masterclass — Design System

A design system for **DSLR Masterclass**, an interactive web app that teaches DSLR photography from the ground up. The product is a single-page React app with modules, simulators, quizzes, and reference tools — aimed at hobbyist photographers who want to move off Auto mode.

**Sources**
- GitHub repo: `yuganshjain/dslr-masterclass` (default branch `main`)
  - Full tree imported under `source/` in this project.
  - Entry: `source/main.jsx` → `source/App.jsx`
  - Tokens live in `source/index.css` (CSS variables) + `source/App.css` (utility classes)
  - Routes: Home, Modules, ModuleDetail, Simulators, Quiz, Tools, Cameras, CheatSheet, Glossary
- Meta from `index.html`: `DSLR Masterclass — Master Your Camera / The complete interactive guide to mastering DSLR photography. Learn aperture, shutter speed, ISO, composition and more.`
- Fonts: Inter (300–900) + JetBrains Mono (400, 500), both loaded from Google Fonts in the source app.

---

## Index

| File | What's in it |
|---|---|
| `README.md` | This file — content + visual foundations, iconography notes, manifest |
| `colors_and_type.css` | All color + type tokens as CSS custom properties |
| `SKILL.md` | Agent-Skill front matter for Claude Code compatibility |
| `assets/` | `logo.svg` (the violet Z / lightning favicon), `social-icons.svg` (sprite), extracted brand pieces |
| `source/` | The full imported codebase — read-only reference |
| `preview/` | Design-system cards (colors, type, components) — registered for the Design System tab |
| `ui_kits/web_app/` | High-fidelity recreation of the DSLR Masterclass web app |

---

## Brand Snapshot

**What it is:** A free-feeling, tutorial-dense, dark-themed photography learning app. Less "course platform", more "well-designed reference tool you keep coming back to".

**Voice in one line:** *"No fluff — just the knowledge you need to take stunning photos."* (Lifted from the hero sub.)

**Visual DNA in one line:** Near-black background, violet-to-cyan gradient accent, Inter/JetBrains Mono, icons drawn with unicode geometric symbols (◈ ◉ ◆ ◎ ◇ △).

---

## CONTENT FUNDAMENTALS

How copy is written in this product:

**Tone — direct, slightly cocky, anti-fluff.**
- `"No fluff — just the knowledge you need to take stunning photos."`
- `"Master Your DSLR / From Zero to Pro"`
- `"Built for photographers, by photographers"`
- Short sentences. Em dashes. No marketing throat-clearing.

**Pronouns — second person, imperative.**
- `"Master Your Camera"`, `"Test Your Knowledge"`, `"Try Simulators"`.
- Never "we" or "our". The product addresses the reader as *you*.
- CTAs are verbs: `"Start Learning →"`, `"Take Quiz"`, `"Browse Terms"`, `"Try now →"`.

**Casing — Title Case for headings and buttons. Sentence case for descriptions.**
- Headings: `"Your Learning Path"`, `"Interactive Simulators"`, `"Quick Reference"`.
- Descriptions: `"From camera basics to advanced techniques — everything in logical order"`.

**Punctuation quirks — the arrow is a brand element.**
- `→` appears on nearly every CTA, often at the end: `"Start Learning →"`, `"Try now →"`, `"View All 11 Modules →"`.
- Em dashes `—` used for appositives in taglines: `"Learn by doing — adjust settings and see results in real time"`.
- Plus signs for approximations: `"50+ Glossary Terms"`.

**Numbers — prominent and celebratory.**
- Stats are huge numerals with a small icon and tiny label: `11 / Learning Modules / ◈`.
- Counts are exact where known, `+` where open-ended.

**Emoji — sparing, iconographic, camera-themed.**
- `📷` is the only recurring emoji, used in logo, hero badge (`📷 Complete DSLR Learning Platform`), and footer (`📷 DSLR Masterclass — Built for photographers, by photographers · 2025`).
- Status/utility emoji creep in inside features: `🔍` empty-search state, `✓ Done` completion badge, `⏱` for duration, `⌕` as a search-icon glyph.
- In decorative navigation, unicode geometric shapes replace emoji entirely (◈ ◉ ◆ ◎ ⌂ ⚙).

**Vibe — "the friend who actually knows their camera".**
- Assumes you're interested, not condescending. Technical terms used confidently (f/2.8, 1/250, ISO 400 appear as set dressing on the hero camera).
- Rewards curiosity: glossary, cheatsheet, simulators all exist for the reader who wants to go deeper.

---

## VISUAL FOUNDATIONS

**Palette — dark violet + cyan accent, spectrum for categorical use.**
- Backgrounds stack from near-black (`#08080e`) through three progressively lighter tiers (`#0f0f18`, `#16161f`, `#13131c`, `#1a1a26`). All tinted slightly blue/violet — nothing is pure gray.
- The hero "accent" is a violet (`#7c6ff7`) with a lighter variant for hover (`#9d97ff`) and a deeper press/shadow shade (`#5548d4`).
- A full accent *spectrum* (gold `#f5a623`, green `#22c55e`, red `#ef4444`, cyan `#22d3ee`, pink `#e879f9`, orange `#fb923c`) maps to both **difficulty** (beginner/intermediate/advanced = green/gold/red) and **exposure concepts** (aperture=gold, shutter=cyan, ISO=pink — visible in the hero camera labels).

**Type — Inter for everything, JetBrains Mono for numbers.**
- `Inter` 300–900 from Google Fonts. Weight jumps are dramatic: body is 500, titles are 700–800, hero is 900.
- Letter-spacing tightens as size grows: `-2px` at display, `-1px` at h1, `-0.3px` at card titles.
- `JetBrains Mono` is used specifically for camera-setting readouts (`f/2.8`, `1/250`, `ISO 400`), code blocks, and floating labels on the hero camera SVG. It is a deliberate "HUD" moment, not a body font.
- Headlines use a **two-line split** with the second line in gradient-text: `Master Your DSLR` / `From Zero to Pro` (gradient).

**Spacing — 4/8/16/20/24/40 rhythm with generous page padding.**
- Page container caps at `1200px` (`1400px` for `.page-wide`).
- Section vertical padding: `60–80px` bottom.
- Card inner padding: `20–24px`. Grid gaps: `16–20px`.
- Tight mobile breakpoints collapse to single column at `640px`.

**Backgrounds — flat dark + ambient radial wash, no imagery.**
- The app is full-bleed dark. No hero photo, no product shots, no marketing imagery.
- A fixed, pointer-events-none radial gradient sits behind the whole page (violet at top-left, cyan at bottom-right, both ~5–8% opacity). It creates subtle depth without being a "background image".
- No repeating patterns, no textures, no grain. Clean and digital-feeling.

**Illustration — a single hand-built SVG camera.**
- The hero illustration is a stylized DSLR body drawn inline in SVG (rects + circles + lucky bit of trigonometry for the aperture-blade lines). It `float`s (`translateY(-12px)` at 4s ease-in-out) and wears a `drop-shadow(0 20px 60px rgba(124,111,247,0.2))` violet glow.
- Floating HUD labels (`f/2.8`, `1/250s`, `ISO 400`) are positioned absolutely over the camera with colored dot + mono text + blurred glass pill background.

**Animation — fast, snappy, staggered fade-ups.**
- Signature motion: `fade-up` (opacity 0→1, y 20→0) on a custom-spring easing `cubic-bezier(.22,.68,0,1.2)` — slight overshoot.
- Staggered variants `.fade-up-1` through `.fade-up-5` delay in 50ms steps. Used heavily on page loads and grids.
- Standard transitions are `0.2s ease` (hover) and `0.25s ease` (card hover with transform).
- `float`, `pulse`, `glow`, `shimmer`, `spin` all defined in keyframes but used sparingly.

**Hover states — translate up + border brighten + shadow.**
- Cards: `translateY(-3px)` + `border-color: var(--border2)` + `box-shadow: var(--shadow)`.
- Buttons: `translateY(-1px)` + `box-shadow: 0 4px 16px rgba(124,111,247,0.4)` for primary; just background shift for secondary/ghost.
- Nav links: background fills with `var(--bg3)`; active state adds tinted-accent background `rgba(124,111,247,0.12)` and switches text to `var(--accent2)`.
- A module card reveals a 2px top accent bar on hover (`::before` with `opacity: 0 → 1`).

**Press states — not distinctly styled.**
- No `:active` rules in the source — press relies on the hover transform easing back. Implicit.

**Borders — 1px, two tiers.**
- Default border is `#252535`, hover border is `#353550`. Only two values — the whole UI reads quiet because of this.
- Dividers (footer top, quick-links band) use the same `--border`.

**Shadows — violet-tinted drop, two depths.**
- `--shadow: 0 8px 32px rgba(0,0,0,0.5)` for hovering cards.
- `--shadow2: 0 2px 12px rgba(0,0,0,0.35)` for resting lift.
- Primary button hover adds a colored glow (`rgba(124,111,247,0.4)`).
- No inner shadows. No layered / stacked shadow systems.

**Radii — 8 / 14 / 20.**
- `8px` — buttons, inputs, nav links.
- `14px` — cards, stat cards, module cards.
- `20px` — badges, pills, quick-link avatars, filter chips.
- Module icon wraps use `12–14px`. Lens/circular elements are fully round.

**Transparency + blur — used for the sticky nav and HUD labels.**
- Navbar: `background: rgba(8,8,14,0.6)` + `backdrop-filter: blur(20px)`. When scrolled past 20px, opacity increases to `0.92` and a border appears.
- Camera floating labels: `rgba(13,13,26,0.85)` + `backdrop-filter: blur(10px)` — "glass pill" aesthetic.
- Hero badge pill: `rgba(124,111,247,0.1)` background + `rgba(124,111,247,0.25)` border — tinted-glass.

**Cards — flat surface, single border, no stroke variation.**
- Card pattern: `background: var(--card)` + `border: 1px solid var(--border)` + `border-radius: var(--radius)` + `padding: 20–24px`.
- Hover: border becomes `border2`, adds shadow, translates up 3px.
- No card ever uses a gradient background; gradients are reserved for icon wraps and text.

**Module icon wraps — the one gradient moment.**
- Each module in `source/data/modules.js` carries its own `gradient` string used as the icon-wrap background. This is the product's color-coding device — readers recognize modules by their colored tile.

**Layout rules — centered, capped, sticky top.**
- Sticky translucent nav at top.
- Centered content column `max-width: 1200px`.
- Grids: 3-col desktop → 2-col tablet → 1-col mobile.
- Section-level headers are centered with optional sub-copy beneath.
- A "quick links" band uses full-viewport-width `var(--bg2)` with stacked horizontal rows (icon + title/desc + CTA pushed right via `margin-left: auto`).

**Imagery color vibe** — n/a. The product contains no photography imagery despite being a photography app. All visual warmth comes from gradient accents and the violet glow.

---

## ICONOGRAPHY

**The primary icon language is unicode geometric symbols, not an icon library.**

The app is wired with `lucide-react` as a dependency (see `source/package.json`) but the source code imports it *zero* times in the pages we inspected. Instead, decorative icons are typed-in unicode characters:

| Glyph | Meaning (from source) |
|---|---|
| `⌂` | Home |
| `◈` | Learn / modules / "Learning Modules" stat |
| `◉` | Simulate / Simulators |
| `◆` | Quiz / "Quiz Questions" stat |
| `⚙` | Tools |
| `◇` | Cheatsheet |
| `◎` | Glossary / "Glossary Terms" stat |
| `△` | Exposure Triangle simulator |
| `◑` | Scene Simulator |
| `⌕` | Search field prefix |
| `▲▼◀▶` | Camera D-pad arrows (in hero SVG) |
| `→` | Every CTA |
| `✓` | Completion state |
| `⏱` `🔍` `📷` | Occasional emoji accents |

**Why it works**: the glyphs are monochrome, typographic, tight — they sit perfectly inside `Inter`'s x-height and don't compete with the copy. They lean into the "pro tool / terminal" feeling.

**SVG usage**: reserved for the logo (`assets/logo.svg` — violet Z / lightning bolt in display-p3 violet) and the hero camera illustration (drawn inline in `Home.jsx`). A social-icon sprite `assets/social-icons.svg` ships with the repo but isn't mounted into pages in the imported source (it defines `bluesky`, `discord`, `github`, `x`, `documentation`, `social` symbols for external links).

**Emoji usage**: a single `📷` recurs as the mascot. Other emoji are utility (⏱ clock, 🔍 empty state). Not heavy.

**When in doubt**: use a unicode geometric symbol before reaching for an icon library. If the set is insufficient, use `lucide-react` (already a dependency) with `stroke-width: 1.5–2` and inherit `currentColor`. Do not introduce Heroicons, Feather, Material, or Phosphor — they don't match the existing silhouette.

**SUBSTITUTION FLAG**: fonts (Inter + JetBrains Mono) are loaded from Google Fonts CDN by the product itself, so no local font files are needed. Every other asset referenced in this doc exists in `source/` or `assets/`.

---

## System conventions for designers working with this kit

1. **Always dark.** No light mode in scope.
2. **Reach for `--accent` (violet) first**, then fall to semantic colors (green/gold/red) for difficulty, and the full spectrum (cyan/pink/orange) only for categorical diagrams (e.g. exposure-triangle visualizations).
3. **Use `JetBrains Mono` exclusively for numbers-as-data** — camera settings, code, HUD readouts. Never for body.
4. **Every card is the same card.** Same radius, same border, same hover lift. Differentiate with content + icon-wrap gradients, not card shape.
5. **Arrows end CTAs.** `→` every time.
6. **Unicode glyphs beat icon libraries** for decorative use.
7. **Animate on entry with staggered fade-ups.** Nothing should "appear" without a brief upward drift.

---

*Substitutions / caveats: Fonts load from Google Fonts CDN (same as the production app) — no local .ttf/.woff files are included. Lucide-react is a listed dependency but appears unused; all icons in the source are unicode glyphs.*
