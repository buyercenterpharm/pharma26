# Cinematic cosmetic hero prototype

The homepage uses three original AI-generated transparent product cutouts: neutral serum and lotion bottles plus a cream jar. All are unbranded and illustrative, not actual PHARMA26 inventory. The visible caption makes this distinction explicit.

## Implemented motion

- Approximately three-second opening: masked headline lines, staggered product arrivals from different directions, scale/angle settling and a soft lighting pass.
- Independent 9-, 10- and 11-second floating loops with small planar and perspective rotations.
- Layer-specific spring-smoothed pointer offsets and scroll parallax: the foreground jar travels farther than the rear lotion bottle.
- Animated soft shadow layers and a restrained repeating light overlay.
- Desktop pause control, offscreen/tab-hidden suspension, static mobile composition, and reduced-motion support.

Motion handles pointer/scroll transforms; CSS handles choreography and loops. No new dependencies were added. Mobile skips the product entrance and ongoing loop. Existing routes and the contact form are unchanged.

## What this is not

This is a 2.5D campaign prototype: independent image planes in a perspective composition, not modeled 3D products. The glass and metallic reflections are baked into AI-generated images. The lighting sweep is a composited effect, not physical relighting. Perspective rotation cannot reveal unseen surfaces. There is no product video in the website; the supplied motion preview records the working browser implementation.

## Recommended production assets

Commission a short offline-rendered loop and matching poster for true luxury product-film quality. Required assets: unbranded bottle/jar meshes with wall thickness and bevels; physically based glass, cream and brushed metal; studio HDR lighting; independent product float/rotation and a restrained camera move. Deliver desktop/mobile crops, optimized WebM/MP4 and WebP posters, and commercial usage rights for models, textures and lighting.

Offline rendering is recommended for reliable glass/reflection quality and modest browser GPU use. React Three Fiber becomes worthwhile if real camera or product interaction is required; it needs optimized GLBs, compressed textures, tuned transmission/lighting, adaptive resolution and static fallbacks. GSAP would duplicate the current Motion/CSS choreography without solving the missing 3D-asset requirement.

## Validation

npm run lint and npm run build. Browser checks at 1440, 768, 390 and 320 pixels: image decoding, horizontal overflow, actual product movement, pause behavior, reduced motion, existing routes, and preserved Formspree endpoint. No form submission or deployment.
