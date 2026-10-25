# DESIGN.md — The Art of Perfection Barbershop (concept redesign demo)

## Psychology brief (5 lines)
- **Visitor:** a Midtown Manhattan man who needs a sharp cut on a lunch break or before a meeting — he has 20–40 minutes and low tolerance for waiting rooms.
- **Pain:** rushed chairs, a fade that falls apart in a week, a station that does not look clean.
- **One action:** book a chair (or, if he prefers a human, call the shop).
- **Trust gap:** is this a real shop with real prices, or a pretty template? Closed by real address, real phone, real hours, exact prices, and an honest demo label.
- **Emotion:** craft, unhurried, sharp. Brass on warm paper; one 3D peak (the barber pole); everything else quiet.

## Tokens (semantic, one-voltage rule)
- canvas (page bg): #F6F2EA — warm paper
- surface: #FFFFFF (cards on paper use #EFE9DC instead — no shadows)
- ink: #121110 (near-black, never pure #000)
- body: #2A2724
- muted: #5F5952 (checked ≥ 4.5:1 on paper)
- hairline: #D8D0BF
- accent (ONLY chromatic CTA color): brass #B08D3E — buttons carry ink text on brass (≈6:1)
- No gradients, no shadows. Radius ceiling 4px. Hairline borders only.

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
