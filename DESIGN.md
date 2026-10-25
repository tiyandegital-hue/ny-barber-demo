# DESIGN.md — The Art of Perfection Barbershop (concept redesign demo)

## Psychology brief (5 lines)
- **Visitor:** a Midtown Manhattan man who needs a sharp cut on a lunch break or before a meeting — he has 20–40 minutes and low tolerance for waiting rooms.
- **Pain:** rushed chairs, a fade that falls apart in a week, a station that does not look clean.
- **One action:** book a chair (or, if he prefers a human, call the shop).
- **Trust gap:** is this a real shop with real prices, or a pretty template? Closed by real address, real phone, real hours, exact prices, and an honest demo label.
- **Emotion:** craft, unhurried, sharp. Brass on dark glass; one 3D peak (the barber pole); everything else quiet.

## Tokens (semantic, one-voltage rule) — MODERN DARK GLASS restyle, 2026-10-25
Replaces the flat warm-paper theme (canvas #F6F2EA, ink #121110, 4px radius ceiling, no
shadows/gradients) — the user judged that look "primitive / old-era" and asked for a modern
glassmorphism vibe. Content, copy, prices, hours, routes, and APIs are unchanged; this is
a pure visual restyle. The 4px radius ceiling is INTENTIONALLY replaced by the glass
language below (larger radii are part of how glass reads); everything else from the
master skill's restraint rules still holds (2 glow colors max, one shadow tier, brass
is the only chromatic CTA color, headlines ≤2 lines, phone is a second composition).
- canvas (page bg): deep cool-neutral ink #0C0E12 (never pure #000), with 2 fixed ambient
  radial glows at low opacity — brass/amber + desaturated slate-blue — as atmosphere only.
- glass surfaces: translucent dark fills rgba(255,255,255,0.06–0.07), backdrop-filter
  blur(16px) saturate(140%), 1px borders rgba(255,255,255,0.16–0.22), one soft shadow tier
  (0 16px 40px rgba(0,0,0,0.32)) + inset top highlight rgba(255,255,255,0.10). Radius 18px
  cards / 20px pole stage / 16px tiles & steps / 12px buttons & fields; chips stay pills.
- ink (headings): #F2F0EB near-white; body: #E9E6DF; muted: #B9B7B0 (no darker on dark
  glass — WCAG AA holds; body text never sits directly over a busy photo or glow without
  a scrim/glass panel behind it).
- accent (ONLY chromatic CTA color): brass #B08D3E — solid buttons with ink text; ghost
  buttons are glass. Sticky header is frosted glass (translucent dark + blur + hairline).
- Demo banner stays prominent: solid dark-bronze #20180A + brass bottom border + bold
  brass links — never faded for aesthetics.
- No gradients beyond the 2 ambient glows. Blur is never applied to moving elements
  (static panels + sticky header only); GSAP reveals and reduced-motion behavior unchanged.

## Type
- Display: Anton (self-hosted woff2, latin) — headlines, never more than 2 lines at any width.
- Body: Inter 400/500/600/700 (self-hosted woff2, latin).
- Max 2 typefaces. Body 16–18px, never below 14px. Measure 50–80 chars.

## Layout idea
Editorial barbershop: oversized display type as composition, asymmetric split hero (type left, live 3D pole right),
numbered service menu like a printed price board, one live thing per page (pole on Home, filters on Services,
dynamic form on Booking). Phone is a second composition: 16–20px margins, ≥44px targets, stacked sections.

## Section map (multipage, 7 pages)
- / Home: hero (pole + promise + Book CTA) → trust strip (real address/hours/phone/prices) → services preview
  → how a visit works (consult → cut → finish) → photo break → ending CTA.
- /services: full menu, filter chips (Cut / Shave / Beard / Full service), price + duration + inclusions, data from /api/services.
- /visit: about (paraphrased positioning), hours table, Midtown context (near Herald Square / Bryant Park / Fifth Avenue), what to expect, phone CTA.
- /booking: dynamic form — service auto-fills price + duration; no past dates; Saturdays disabled (shop closed);
  times only inside that day's real hours; consent checkbox required; POST /api/book returns reference; nothing stored.
- /contact: form → POST /api/contact; real address/phone/hours shown.
- /privacy: demo privacy — no accounts, no tracking cookies, form data validated and not stored, no third-party embeds.
- /terms: demo terms — concept redesign, not affiliated, prices/hours as checked Oct 2026 and may change.

## Honesty / known gaps
- This is a CONCEPT REDESIGN DEMO, not the shop's official site. Labelled on every page (banner + footer + booking page).
- No logo assets and no photos from the shop's site. All photos are Wikimedia Commons CC images, stored locally,
  credits in public/credits.json and in the footer. Photo subjects are real barbershops elsewhere — they illustrate
  the craft, they are not photos of this shop, and the site never claims otherwise.
- No testimonials, ratings, review counts, or invented stats anywhere.
- Prices/hours reflect the shop's public site as checked Oct 2026 and may change; the real phone number is given
  for real bookings.
- Demo bookings create no appointment and nothing is stored server-side (stateless API).
