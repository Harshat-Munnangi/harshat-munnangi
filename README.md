# Harshat Munnangi — Portfolio

A cinematic, Apple-level-polished portfolio hero built with Next.js, Three.js,
and GSAP. Dark, warm-ember lighting, a floating bokeh particle field, and a
split layout with the subject on the right and copy on the left.

## Tech stack

- Next.js (App Router) + TypeScript
- React
- Three.js — ambient bokeh particle layer
- GSAP — entrance animations and the Ken Burns zoom
- CSS Modules

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Project structure

```
src/
  app/                    Root layout, home page, global theme (globals.css)
  assets/images/          Static image assets, imported via next/image
  components/
    hero/                 Hero.tsx composes VideoIntro + CinematicLayer +
                           HeroContent + ScrollIndicator
    header/               Site header: logo, nav, mobile menu
    sections/             PlaceholderSection — reused for About/Skills/Work/Contact
images/
  Image-Hero.png          Original source photo (the app uses its own copy
                           under src/assets/images/)
designs/
  index.html              Static HTML/CSS/JS mirror of the hero, framework-free,
                           for quick visual reference — see designs/README.md
```

## The hero is video-ready

`VideoIntro` currently renders a still image (`Image-Hero.png`) as both the
crisp foreground and the blurred ambient background layer. It's written to
support swapping in a real video later: pass a `videoSrc` prop and the
`<video>` elements, play/pause and mute controls, and the "tap for sound"
badge all activate automatically — no other changes needed.

## Layout breakpoints

- **≥ 900px** — split layout: image bleeds to the top/right/bottom edges,
  fades into the dark background on its left edge, text sits as a vertically
  centered left column.
- **< 900px** — full-bleed background image with bottom-aligned text overlay.
- **≤ 760px** — header nav collapses into a hamburger menu.

## Static prototype

`designs/` is a plain HTML/CSS/JS version of the same hero (no Next.js, no
build step) kept in sync with the app for quick reference. See
`designs/README.md` for how to run it — it needs to be served over http(s),
not opened via `file://`.
