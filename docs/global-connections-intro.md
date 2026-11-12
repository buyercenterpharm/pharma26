# Global Connections — introduction prototype

## Scope and checkpoint

Implemented on `redesign/premium-homepage`. Checkpoint: `94642bc` (preceding homepage implementation: `0a0a1a7`). The existing homepage components, company content, navigation, and contact integration are unchanged. `src/App.tsx` mounts `GlobalIntro` alongside the original site wrapper. Removing that import/component disables the introduction without rebuilding the homepage. No production settings, deployment or domain changes.

## Actual rendering

Three.js 0.180.0 renders a real sphere mesh, land/bump textures, directional lighting, a rim-atmosphere shader, spatial connection paths, moving sprite particles, subtle globe rotation, and a camera push-in. Paths are revealed progressively; particle heads converge toward the camera-facing center. Hidden sides are depth-tested against the sphere.

This is a **stylized metallic globe**, not a photoreal satellite Earth. Glow uses additive sprites and a rim shader, not physically simulated volumetric scattering. There is no optical depth-of-field pass. Globe-to-brand is a coordinated dissolve/ivory aperture and exact PNG overlays, not a topology morph into the monogram. The website does not play a pre-rendered video; review recordings show the live implementation.

The exact `public/favicon.png` and `public/logo.png` files are used unchanged. The ivory reveal provides contrast without recoloring the logos. Their original image backgrounds/pixels remain intact. The monogram has an opaque #282828 background baked into the official PNG; it is presented in a matching bordered cartouche. A transparent official master would allow a more seamless production reveal, but is not fabricated or substituted here.

## Timeline and safeguards

- 0–1.5s: navy scene, exposure reveal and gently moving globe.
- 1.3–3s: progressively drawn symbolic gold connections and moving particles.
- 3–4.5s: camera push, brighter key light, converging particle heads.
- Approximately 4.2–5s: official monogram, then full logo on ivory.
- 5–6s: full-logo hold, then a short dissolve to the already-mounted homepage.

The visible desktop intro is capped by a six-second timer. Preparation is separate and invisible: the homepage is interactive while the chunk/textures/logos load. Preparation exceeding 1.8 seconds, failed assets, unavailable WebGL, or user interaction abandons the intro. Sustained slow rendering also exits. No artificial loader or minimum waiting time.

A visible Skip Intro button and Escape immediately exit. Focus is contained during the intro, the site wrapper is temporarily inert, and scroll/focus are restored. Visibility changes and a live reduced-motion preference change dismiss it. WebGL resources and listeners are disposed after dismissal/unmount. CSS choreography behind the intro is paused and resumes afterward.

A sessionStorage flag records the first attempt/show; blocked sessionStorage bypasses the intro. Reduced-motion and Save-Data users see the homepage directly. Mobile (<768px), very low reported device memory, or at most two logical cores receive a short 1.8-second official-logo alternative without downloading Three.js. Hardware signals are heuristics, not a guarantee of frame rate.

## Dependencies and assets

- Three.js: MIT, https://github.com/mrdoob/three.js/blob/r180/LICENSE
- Existing React/Vite/CSS stack for integration and overlay choreography. No GSAP, Drei, R3F, API keys or paid services.
- Natural Earth 1:110m land polygons: public domain, commercial use permitted.
  Source: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson
  Terms: https://www.naturalearthdata.com/about/terms-of-use/
  Source SHA-256 used: `9e0729ee253ca7d7a5c4ae9395fb1902264c5377c52e224d13dd85010e2835d9`.
  License copy: `public/textures/LICENSE-natural-earth.md`.
- `scripts/create-globe-texture.py` creates the styled map and bump mask from that GeoJSON (optional generation requires Pillow). Committed texture outputs total about 87 KB. All runtime assets are served locally.
- The lazy Three.js scene chunk is approximately 125 KB gzip; it is not requested for returning-session, reduced-motion or compact-mode visitors.
- Paths are illustrative, not a claim about offices, clients, partnerships, service coverage or shipping routes. The on-screen caption explicitly says so.

## Verification

Run `npm ci`, `npm run lint`, `npm run build`, then `npm run test:intro`.
Browser tests use `@playwright/test` and local Chromium at `/usr/bin/chromium`; set `CHROMIUM_PATH` on another system. The suite serves the production build on port 4173 and writes artifacts outside the checkout, in `/tmp/pharma26-intro-results`.

Nine browser tests passed: timed 3D/official-logo sequence, skip/focus/session behavior, Escape, reduced motion and lazy-loading bypass, mobile alternative, slow-load navigation, missing assets, WebGL/storage failures, and existing routes/Formspree configuration. Tests do not submit the contact form. Browser verification used Chromium software WebGL in this cloud machine; no physical-device GPU or cross-browser performance certification is claimed.

## Production quality limits

This is a working visual-direction prototype, not an approved luxury brand film. A professional final could benefit from art-directed topographic/PBR textures, refined compositing and restrained bloom, or an offline-rendered six-second sequence with a high-quality poster and mobile crop. Such a film would provide more controlled lighting and optical effects than the current lean WebGL implementation. Both official logos must still remain exact graphical overlays.
