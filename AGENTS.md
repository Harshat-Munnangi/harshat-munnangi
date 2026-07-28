<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project notes

Cinematic portfolio hero. See README.md for the tech stack, project
structure, and layout breakpoints.

## Two surfaces, kept in sync

- `src/` — the real Next.js app.
- `designs/` — a static HTML/CSS/JS mirror of the same hero, no build step,
  used for quick visual reference. It is **not** part of the Next.js build
  and is excluded from `eslint.config.mjs`'s lint scope.

When changing the hero or header's markup, styling, or animation, mirror the
change in both places unless told otherwise — that's been the working
convention throughout this project. `src/components/hero/*` maps to
`designs/index.html` + `designs/styles.css` + `designs/script.js`.

## Conventions

- Styling is CSS Modules throughout (`*.module.css`), one per component.
  Shared design tokens (colors, glass effect, easing) live as CSS custom
  properties in `src/app/globals.css` (`designs/styles.css` mirrors them).
- Interactive components are Client Components (`"use client"`) using GSAP
  via `gsap.context(...)` scoped to a ref, cleaned up with `ctx.revert()` in
  the effect's return.
- `CinematicLayer` (Three.js) disposes geometry/material/texture/renderer on
  unmount, pauses its render loop when the tab is hidden, and respects
  `prefers-reduced-motion`. Follow the same discipline for any new Three.js
  code — don't leak GL resources.
- `VideoIntro` is written video-ready: it currently renders a still image,
  but accepts an optional `videoSrc` prop that activates `<video>` playback,
  play/pause + mute controls, and the "tap for sound" badge with no other
  changes required.
