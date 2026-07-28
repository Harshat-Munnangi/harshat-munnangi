# Hero Prototype

Static, vanilla HTML/CSS/JS preview of the cinematic hero — same visual
design, motion, and structure as the Next.js implementation in `src/`, just
without the framework.

## Run it

Three.js is only distributed as an ES module, and browsers block `import`
over `file://`. Serve the **repo root** (not this folder) with any static
server, then open `/designs/`:

```bash
# from the repo root
python3 -m http.server 8000
# then open http://localhost:8000/designs/
```

or

```bash
npx serve .
```

## What's here

- `index.html` — markup for the hero + placeholder "About" section
- `styles.css` — the cinematic dark theme, gradients, glassmorphism, layout
- `script.js` — GSAP entrance animations + the Three.js bokeh particle layer
- `vendor/` — local copies of `three` and `gsap` (no CDN/network dependency)

It references the source image at `../images/Image-Hero.png` rather than a
copy, so this folder is a preview, not a fully standalone bundle.
