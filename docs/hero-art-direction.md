# Cosmetic hero prototype

The homepage uses original AI-generated concept imagery of neutral cosmetic packaging. It is illustrative, not a photograph of inventory or PHARMA26-manufactured products. The visible caption communicates that distinction. No external stock imagery or product trademarks are used.

The two WebP sizes in public/images are derived from the generated still. Motion supplies entrance, spring-smoothed desktop pointer tilt and scroll translation/zoom. CSS supplies a very small ambient movement of the entire composition. These are 2.5D image transforms: there are no independently moving products, real-time reflections, camera orbit, 3D models or rendered video. No new runtime dependencies were added. Mobile/coarse-pointer and reduced-motion modes use static artwork; desktop has a pause control and motion stops outside the viewport.

## Recommended production asset route

For luxury advertising quality, commission a short offline-rendered loop and matching poster from a 3D artist: unbranded bottle and jar models with modeled wall thickness and beveled edges; physically based glass, liquid and brushed metal materials; studio HDR lighting; slow independent product float/rotation and a restrained camera move. Deliver desktop and mobile crops, WebM/MP4 variants and a color-matched WebP poster. Confirm commercial usage rights to models, textures and lighting assets. Do not use actual supplier products without permission.

Pre-rendered animation is recommended for predictable optical quality and low GPU use. Real-time React Three Fiber is appropriate only if genuine product inspection or camera control becomes a requirement, with optimized GLB assets, compressed textures, a tested transmission/lighting solution, adaptive rendering and a poster fallback. Basic geometric stand-ins are not an adequate substitute for those assets.

Validation: npm run lint; npm run build; Chromium viewport checks at 1440, 768, 390 and 320 pixels; image decoding, overflow, pause and reduced-motion checks; existing routes and Formspree action preserved. This prototype does not submit contact forms.
