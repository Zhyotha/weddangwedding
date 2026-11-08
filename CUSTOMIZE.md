# Panduan Modifikasi · Botanica Invitations

A guide to customising this invitation without reverse-engineering it.
(English body with Indonesian labels where the site itself is in Indonesian.)

---

## 1. Folder structure

```
index.html                  page shell, fonts, <title>, meta description
tailwind.config.js          design tokens exposed as Tailwind classes
src/index.css               colour tokens, paper texture, ALL keyframes
src/pages/Home.jsx          the whole page: section order lives here
src/lib/wedding.js          ALL wedding content (names, dates, venue, photos)
src/lib/ambientMusic.js     the ambient music engine
src/hooks/useGuestName.js   reads ?to= / ?kepada= from the URL

src/components/invitation/
  IntroExperience.jsx       the animated opening screen
  intro/                    the intro's own scene (art, camera, garden, type)
  OpeningSection.jsx        hero: names, date, cover photo, guest greeting
  VerseSection.jsx          Q.S. Ar-Rum : 21
  GreetingSection.jsx       Assalamualaikum + invited-to text
  CoupleSection.jsx         photo + bride & groom profiles
  CountdownSection.jsx      live countdown
  EventsSection.jsx         akad / resepsi cards
  VenueSection.jsx          location + maps button
  GallerySection.jsx        photo grid
  PhotoLightbox.jsx         full-screen photo viewer
  RsvpSection.jsx           RSVP form + attendance totals
  WishesSection.jsx         wish form + wish list
  ShareSection.jsx          copy link / WhatsApp
  SiteFooter.jsx            closing section
  SiteNav.jsx               floating bottom navigation
  MusicToggle.jsx           floating music button
  SectionLabel.jsx          the small "— Mempelai —" label
  Ornaments.jsx             CornerFloral / BotanicalDivider / GoldRule

  motion/                   THE animation system
    Reveal.jsx              scroll entrance + the VARIANTS vocabulary + EASE
    Stagger.jsx             StaggerGroup / StaggerItem (sequenced reveals)
    Sway.jsx                continuous swaying (CSS driven)
    Ambient.jsx             FallingPetals + Butterfly
    Parallax.jsx            scroll-linked drift
    Sheen.jsx               light sweep across lettering

  ornaments/                THE decoration system
    Botanicals.jsx          all watercolour plants as transparent SVG
    SectionGarden.jsx       edge-anchored vines + plants for a section

src/img/                    your photographs
src/img/art/                legacy JPG paintings (intro + kept for reference)
```

## 2. Install & run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the built site
```

Node 18+ required.

## 3. Replace the intro video / intro scene

The intro is not a video file — it is layered SVG/paint art animated with
Framer Motion. To swap it for your own video:

1. Put the file in `public/` (e.g. `public/intro.mp4`).
2. Open `src/components/invitation/IntroExperience.jsx` and replace the
   `<IntroStage />` element with:

```jsx
<video
  className="absolute inset-0 h-full w-full object-cover"
  src="/intro.mp4"
  autoPlay muted loop playsInline
/>
```

3. Timing lives in the same file (`setTimeout` calls) and in
   `src/components/invitation/intro/IntroCamera.jsx` (the zoom/drift values).

The intro's own paintings are imported from
`src/components/invitation/intro/sceneAssets.js` — point those imports at your
own images to re-skin the scene without touching the choreography.

## 4. Add / remove / replace illustrations

All botanical art is **transparent SVG** in
`src/components/invitation/ornaments/Botanicals.jsx`:

| Component   | What it draws                              | Anchor           |
| ----------- | ------------------------------------------ | ---------------- |
| `Vine`      | long branch with leaves + two blossoms     | top edge (y=0)   |
| `Plant`     | upright plant with three flower heads      | bottom edge      |
| `Cluster`   | corner spray (used by `CornerFloral`)      | corner (0,0)     |
| `Sprig`     | single small branch (used inside cards)    | any              |
| `Divider`   | the symmetrical separator                  | centre           |

Colours come from the `TONES` map at the top of that file
(`sage`, `olive`, `rose`, `blush`, `gold`). Add a tone there and use
`tone="yourName"` anywhere.

To place a new decoration inside a section:

```jsx
import { Sprig } from "@/components/invitation/ornaments/Botanicals";
import Sway from "@/components/invitation/motion/Sway";

<span className="pointer-events-none absolute -right-2 -top-4 h-14 w-14 opacity-30">
  <Sway duration={14} amplitude={6} origin="70% 100%">
    <Sprig tone="rose" className="h-full w-full" />
  </Sway>
</span>
```

Rules that keep it looking painted-on rather than pasted-on:
- keep `opacity` between `0.2` and `0.5`;
- never add a white background to an illustration wrapper;
- let it bleed past the edge (`-right-*`, `-top-*`) and let the section's
  `overflow-hidden` crop it.

## 5. Decoration position & layering

`SectionGarden` (one per section) owns the framing:

```jsx
<SectionGarden seed={4} tone="sage" accent="blush" opacity={0.36} />
```

- `seed` — shifts every delay, so no two sections move in sync (use any number).
- `vines` / `ground` — turn the top vines or the bottom plants off.
- Layout lives in the `PLANTS` array in `SectionGarden.jsx`: `side`
  (`left`/`right`), `inset` (e.g. `"-8%"` bleeds off the edge, `"17%"` sits
  inboard), `size` (Tailwind height classes — width follows the 120:262 ratio),
  `wide` (desktop only).
- Layering: the garden wrapper is `z-0`; each section's content block is
  `relative z-10`. Keep that pair when you add a section, so decorations never
  cover text or buttons.

Mobile placement is adjusted separately — e.g. the two inboard plants are
`hidden sm:block`, so phones show only the two edge plants.

## 6. Modify or create animations

**Entrances** — one vocabulary, in `motion/Reveal.jsx` (`VARIANTS`):
`up`, `fade`, `pop`, `soft`, `left`, `right`, `mask`. Add your own:

```js
zoom: { hidden: { opacity: 0, scale: 1.12 }, show: { opacity: 1, scale: 1 } },
```

then `<Reveal variant="zoom" delay={0.2} duration={1.1}>…</Reveal>` or
`<StaggerItem variant="zoom">`. Every reveal fires **once**, the first time the
element enters the viewport, and never replays on scroll-back.

**Sequence** — wrap children in `<StaggerGroup stagger={0.18}>` and each child
in `<StaggerItem>`.

**Continuous motion** — CSS keyframes in `src/index.css`:

| class         | effect                              | CSS variables                                |
| ------------- | ----------------------------------- | -------------------------------------------- |
| `sway`        | branch bending left/right           | `--sway-amp`, `--sway-x`, `--sway-dur`, `--sway-origin` |
| `float-y`     | slow vertical float                 | `--float-dur`, `--float-reach`, `--float-delay` |
| `breathe`     | opacity/scale pulse (glows)         | `--breathe-dur`, `--breathe-delay`           |
| `leaf-fall`   | petal/leaf drifting down the section| `--fall-dur`, `--fall-drift`, `--fall-opacity`|
| `petal-sway`  | side-to-side wobble while falling   | `--petal-dur`, `--petal-reach`               |
| `ken-burns`   | 30s slow zoom on a photo            | —                                            |
| `scroll-cue`  | the "scroll down" line              | —                                            |

Usually you use the wrapper instead of the class:

```jsx
<Sway duration={18} amplitude={2} shift={4} delay={0.5} origin="50% 100%" float={5}>
  <Vine tone="sage" />
</Sway>
```

To disable a whole effect globally, comment out the keyframe block or add the
class to the `prefers-reduced-motion` list at the bottom of `index.css`.

Do not put a CSS animation **and** a Framer transform on the same element —
one owns `transform` at a time. Nest them instead (as `Sway` + `StaggerItem` do).

## 7. Edit text, images and sections

- **Text** (names, dates, verse, events, venue, gallery order):
  `src/lib/wedding.js`. Nothing else hard-codes content except the fixed
  Indonesian copy inside individual section components.
- **Images**: drop files into `src/img/` and import them in `wedding.js`
  (`images.cover`, `images.hands`, `images.coast`, `gallery[]`). Use the
  imported variable, never a bare string path.
- **Add a section**: create `src/components/invitation/YourSection.jsx`
  (copy a small one such as `GreetingSection.jsx`), then add it to the list in
  `src/pages/Home.jsx` — order there is the order on the page.
- **Remove a section**: delete its line in `Home.jsx`. Also remove its entry
  from `LINKS` in `SiteNav.jsx` if it had a navigation chip.

## 8. Backgrounds, colours, layout

Colours are HSL channel tokens in `src/index.css` (`:root`) and mapped to
classes in `tailwind.config.js`. Change the palette in one place:

```css
--blush: 14 38% 90%;   /* warm blush used for section tones */
--accent: 36 28% 52%;  /* gold-brown used for rules and borders */
```

Section tints are classes, not colours, so transitions stay seamless:

- `tone-blush` — soft pink wash, fades to transparent top and bottom
- `tone-cream` — warm ivory wash
- `tone-sage` — faint green wash

Never use `bg-white`: it is the one surface that breaks the watercolour paper.

## 9. Build & deploy

```bash
npm run build          # → dist/
```

Deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub
Pages). If you host it yourself, the RSVP and wishes forms need the backend
described below — on a plain static host they will fail silently.

## 10. Limitations & what this ZIP does not contain

This project was built on Base44 and is exported as **editable source**, but
two things are platform services rather than files:

1. **Authentication, database and row-level security.** `Rsvp` and `Wish` live
   in Base44 entities (`base44/entities/*.jsonc`, included so you can see the
   schema). The rules that keep RSVP names admin-only are enforced by the
   platform, not by this code.
2. **The `rsvpSummary` backend function** (`base44/functions/rsvpSummary/entry.ts`)
   is included as readable source, but it needs the Base44 runtime and the
   `@base44/sdk` service role to run.

To self-host the RSVP/wishes features you need to replace `base44.entities.*`
and `base44.functions.invoke` calls in `RsvpSection.jsx` and `WishesSection.jsx`
with your own API.

No secrets, tokens or credentials are included. `.env.example` documents the
only value a self-hosted deployment needs (none are required for the static
build).

The music is generated in the browser (`src/lib/ambientMusic.js`) — there is no
audio file to license.