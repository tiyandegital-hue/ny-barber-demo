import { SHOP } from '@/lib/data';

export const metadata = {
  title: 'Privacy Policy — Art of Perfection demo',
  description: 'What this demo site collects (nothing stored) and why.',
};

export default function PrivacyPage() {
  return (
    <div className="wrap">
      <section className="section">
        <p className="eyebrow">Legal</p>
        <h1 className="display">Privacy Policy.</h1>
        <p className="lede">Plain language first: this is a concept redesign demo. It is designed to collect as little as possible.</p>
        <h2 style={{ marginTop: 32 }}>What this demo collects</h2>
        <p>
          Nothing is stored. The booking and contact forms send your input to this site&apos;s own
          serverless API only so it can be validated and echoed back to you in the confirmation
          (for example, your demo booking reference and summary). The API keeps no database, writes
          no file, and sends nothing anywhere else. Closing the page ends the matter.
        </p>
        <h2>What it does not do</h2>
        <p>
          No user accounts. No tracking cookies, no analytics beacons, no advertising trackers.
          No newsletter list. No data is sold, shared, or sent to the barbershop — a demo message is
          not a real message to the shop.
        </p>
        <h2>Third-party embeds</h2>
        <p>
          None are embedded. Fonts and photographs are served from this site&apos;s own files.
          The only third-party destination is the “Get directions” link, which opens Google Maps in
          a new tab — Google&apos;s own privacy terms apply once you leave this site. The phone
          link dials <a href={SHOP.phoneHref}>{SHOP.phone}</a> on your device.
        </p>
        <h2>Real bookings and real contact</h2>
        <p>
          To actually book or contact the shop, call {SHOP.phone} or visit {SHOP.address}. Anything
          submitted through a demo form on this site will never reach the shop.
        </p>
        <h2>Changes</h2>
        <p>
          If this demo ever gains storage, accounts, or analytics, this page will say so before
          those features go live — not after.
        </p>
        <p className="small">Last updated: October 2026. This demo is not affiliated with {SHOP.name}.</p>
      </section>
    </div>
  );
}
