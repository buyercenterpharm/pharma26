# Global Connections — supplied video integration

Implemented on `redesign/premium-homepage`. The previous WebGL prototype remains recoverable in Git at `d380347`. Its scene module, map textures, generation script, Three.js and Three.js typings have been removed from the current implementation. The existing homepage, navigation, other routes, logo files and contact integration are unchanged.

## Supplied media

`public/video/global-connections.mp4` is a byte-identical copy of the user-supplied `gemini_generated_video_cc80fe78.mp4`:

- H.264, 1280 × 720, 24 fps; approximately 10 seconds.
- AAC audio track retained in the original asset, but browser playback is always muted.
- 5,299,059 bytes; SHA-256 `9ebc94050684865f3f85e511f5d85e7fc39de649976c3f9beabdadbbcc024b51`.
- No re-encoding, cropping, watermark removal, playback-speed adjustment, or quality reduction.
- Provided by the user for this integration; generation tool provenance and commercial licensing were not independently audited. No new stock or paid assets are introduced.

The full-screen dark stage contains the complete 16:9 frame using `object-fit: contain`. Portrait mobile screens deliberately retain dark letterboxing rather than cropping or stretching the video. `playsInline`, muted autoplay and a single non-looping playback apply on desktop and mobile. The site itself contains no video player controls or fullscreen API requests.

## Logo and timing

The exact `public/logo.png` is overlaid at the center of the film's illuminated ending. Its opaque white background is preserved, as are all colors, proportions, typography and pixels; no blend modes or filters recolor it. The image stays within the source's native dimensions.

The reveal starts at **7.0 seconds of media time**, reaches full opacity at **7.9 seconds**, and subtly scales from 96% to 100%. `requestVideoFrameCallback` tracks decoded frame time; animation-frame/timeupdate fallbacks track `currentTime`. Buffering does not advance the logo independently. It remains visible during the final approximately two seconds. The actual `ended` event freezes the final frame and starts a 550 ms whole-overlay dissolve into the already-mounted premium homepage. There is no former six-second timer and no blank-white intermediate screen.

## Access, accessibility and fallback

- On eligible first visits, an inline HTML dark curtain is established before application JavaScript can paint the homepage. React takes over with the same opaque dark stage during video preparation: there is no entrance fade exposing the site. Skip Intro and Escape provide immediate access while preparing. The HTML curtain releases after four seconds if the application does not initialize; video preparation still falls back after 2.5 seconds. Returning-session, reduced-motion and other-route visits bypass the curtain.
- The video source is assigned only for eligible visitors. Returning-session and reduced-motion visitors do not request the MP4. Session key `pharma26.global-intro.v1` is preserved from the previous prototype.
- Reduced motion and unavailable sessionStorage bypass the intro. Save-Data uses the static official-logo alternative without requesting the MP4.
- Failed media, rejected autoplay, preparation exceeding 2.5 seconds, or a playback stall exceeding two seconds use a skippable static official-logo fallback for 1.5 seconds, followed by the short dissolve. If even the logo cannot load, access returns directly to the homepage.
- Visible Skip Intro and Escape dismiss immediately. The background is temporarily inert, focus stays on Skip Intro, and focus/scroll are restored afterward. A live reduced-motion change or hidden tab ends the intro.
- Video playback stops and the source is released on skip, completion, fallback, or unmount. A 16-second playback watchdog prevents an indefinite overlay if browser events fail.
- Existing homepage CSS choreography pauses behind the intro and resumes afterward.

## Verification and review

Run `npm ci`, `npm run lint`, `npm run build`, then `npm run test:intro`. Playwright uses `/usr/bin/chromium` by default; set `CHROMIUM_PATH` on another machine. It serves the production build on port 4173.

Nine browser tests exercise actual MP4 decoding/advancing frames and full natural playback, reveal timing at the media clock, logo hold and natural end transition, mobile inline playback/aspect ratio, skip/Escape/focus/session behavior, reduced-motion/no-download behavior, dark first paint even with delayed application JavaScript, skip access during slow preparation, network/autoplay failure fallback, and preserved routes/Formspree configuration. They verify the video is muted and does not loop, and that no Three.js scene is requested. No contact form is submitted.

Motion previews record the working browser page playing the supplied MP4 with the real HTML logo overlay and transition. They are not a separately composited promotional video. Cloud Chromium and a mobile viewport were verified; physical iOS/Safari autoplay/performance has not been certified.

No main-branch modification, merge, deployment, domain update or environment publication is part of this change.
