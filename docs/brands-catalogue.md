# Our Brands — catalogue and asset review

## Implementation

`/brands` is a separate page; `/products` and its content remain intact. The homepage has an additive Brands We Source section below the company introduction. Both desktop and mobile navigation, plus the footer, link to the new page. The cinematic intro and existing contact form are unchanged.

The single source of truth is `src/data/brands.ts`. There are **75 distinct brand records**, **76 category memberships**, and six categories:

| Category | Entries |
| --- | ---: |
| Dermocosmetics | 28 |
| Cosmetics | 14 |
| Perfumes | 4 |
| Professional Haircare | 11 |
| Pharmacy | 5 |
| Other Brands | 14 |

Chanel is one record with two category IDs. Counts, category labels, filtering and homepage selections are derived from the shared catalogue. Search ignores accents, whitespace and punctuation; URL query parameters retain/share the selected category and search. Invalid categories gracefully show all categories. No brand card is presented as a product purchase, inventory entry or endorsement.

The homepage selection is a static grid of eight neutral typographic names. A moving logo carousel was deliberately not used because no verified logo assets are currently available. Motion reveals the showcase once; reduced-motion preferences are respected. Category and search controls are keyboard-operable with labelled inputs, pressed states and a live result count.

## Identity corrections

The user explicitly confirmed:

- Molnycke → **Mölnlycke**, retained in Other Brands.
- Eneomay → **ENEOMEY**, retained in Dermocosmetics.

The original spellings remain search aliases only. All other names/categories are retained exactly as supplied. The identity corrections are user-confirmed, not externally verified in this environment.

Before selecting future logos, verify the exact product-family versus corporate mark for **Verio**, **Contour Next**, and **FreeStyle**. Do not silently replace a named family with its parent company's logo. The supplied names remain displayed.

## Logo report — current outcome

- Verified/integrated third-party brand logos: **0**.
- Distinct brands using neutral text fallbacks: **75** (the complete catalogue).
- Third-party logo downloads or hotlinks: **0**.
- No generated, reconstructed, imitated, or unrelated logos were used.

`docs/brand-logo-sources.csv` lists every brand, its categories, display status, any attempted candidate source, source-check outcome, usage-rights status, and identity notes. All catalogue names use the same editorial type styling; this is a text fallback, not a recreation of their official visual marks.

### Source verification blocker

On 2026-11-12, eight candidate official-site/legal-page requests were attempted:

- https://www.molnlycke.com/
- https://www.eneomey.com/
- https://www.onetouch.com/products/glucose-meters/onetouch-verio-flex
- https://www.weleda.com/
- https://www.laroche-posay.com/
- https://www.nuxe.com/
- https://www.chanel.com/us/legal/
- https://www.dyson.com/

Every request failed at the environment proxy with `CONNECT tunnel failed, response 403`, before receiving source content. Runtime configuration confirmed restricted networking with only the package-manager preset and no custom allowed hosts. This is an environment access denial, not a finding that any brand prohibits use. These URLs are research targets, not verified asset sources or evidence of permission. No blanket permission is inferred from publicly visible trademarks or a catalogue listing.

Further individual-brand logo research was not represented as completed after this shared policy blocker. To complete it, official sites and their asset/CDN destinations must be accessible, or official asset packs and applicable usage terms can be supplied for review. No environment network settings were changed for this task.

### Adding approved assets later

1. Confirm the exact brand/family identity and obtain the genuine SVG or transparent PNG from an official/otherwise legitimate source.
2. Review the applicable usage terms for independent commercial catalogue display; public availability alone is not a permission grant. Record any owner approval or other documented basis and unresolved restrictions.
3. Store the asset locally, preserve original proportions/colors, strip unsafe SVG content without changing appearance, and optimize file size.
4. Add the brand's `logo` metadata: local path, intrinsic width/height, source URL, verified date and usage basis, with identity verification and usage approval explicitly recorded. Update the source report.
5. `BrandMark` renders only local, approved/verified entries and falls back to the name if loading fails. It uses lazy loading, async decoding, intrinsic dimensions and `object-fit: contain`; it does not recolor or distort logos.

## Commercial language

The page presents PHARMA26 as an independent B2B trading company and does not call brands partners, authorized suppliers or exclusive relationships. It does not imply continuous availability. The required trademark/availability disclaimer appears on both the Brands page and homepage showcase.

## Validation

Run `npm run lint`, `npm run build`, and `npm run test:intro` (the existing Playwright command discovers both intro and brand test suites). Browser checks cover all category counts, deduplication, search/aliases, combined filters, empty/reset state, URL restoration, responsive layouts, navigation, reduced motion, contact routing, and the preserved cinematic intro.

Validation completed: TypeScript and production build passed; all 15 Playwright tests passed (six catalogue checks and nine cinematic-intro regression checks). Responsive checks passed at widths 1440, 1024, 900, 768, 390 and 320 pixels.

No changes to main, merge, deployment or publication are part of this work. This is a reviewable catalogue implementation with a clearly outstanding official-logo sourcing phase.
