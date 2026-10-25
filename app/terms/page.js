import { SHOP } from '@/lib/data';

export const metadata = {
  title: 'Terms & Conditions — Art of Perfection demo',
  description: 'Demo terms for this concept redesign of The Art of Perfection Barbershop.',
};

export default function TermsPage() {
  return (
    <div className="wrap">
      <section className="section">
        <p className="eyebrow">Legal</p>
        <h1 className="display">Terms &amp; Conditions.</h1>
        <h2 style={{ marginTop: 32 }}>A concept demo, not the shop&apos;s site</h2>
        <p>
          This website is a concept redesign demo built to demonstrate design and development work.
          It is not owned, operated, or endorsed by {SHOP.name}, and it is not the shop&apos;s
          official website. No logo assets or photographs from the shop&apos;s own site are used.
        </p>
        <h2>Demo bookings are not appointments</h2>
        <p>
          Submitting the booking form returns a demo reference only. It creates no appointment,
          reserves no chair, and stores nothing. The same applies to the contact form: demo messages
          are validated and confirmed on screen, never delivered to the shop. To book or contact the
          shop for real, call <a href={SHOP.phoneHref}>{SHOP.phone}</a>.
        </p>
        <h2>Prices and hours</h2>
        <p>
          Service names, prices, durations, address, phone number, and opening hours shown here
          reflect the shop&apos;s public website as checked in October 2026. They may have changed
          since; the shop&apos;s own word — by phone or in person — is the current truth.
        </p>
        <h2>Photographs</h2>
        <p>
          Photographs on this demo are real barbershop photographs from Wikimedia Commons under
          CC0 or CC BY-SA 4.0 licences, credited in the footer and in /credits.json. They depict
          real barbershops elsewhere and are used as illustrations of the craft; they are not
          photographs of this shop, its staff, or its customers, and the site never claims otherwise.
        </p>
        <h2>No reviews or ratings</h2>
        <p>
          This demo publishes no testimonials, ratings, or review counts, and makes no claim to be
          the “best” or “#1” anything. Any such claim would need a named, verifiable source.
        </p>
        <h2>Acceptable use</h2>
        <p>
          Do not submit other people&apos;s personal information through these demo forms, and do
          not use the demo reference as proof of a booking. The demo may be taken down or changed
          at any time without notice.
        </p>
        <p className="small">Last updated: October 2026.</p>
      </section>
    </div>
  );
}
