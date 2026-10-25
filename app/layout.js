import './globals.css';
import { SHOP } from '@/lib/data';

export const metadata = {
  title: 'The Art of Perfection Barbershop — Midtown Manhattan | Concept Demo',
  description:
    'Concept redesign demo for The Art of Perfection Barbershop, 34 W 37th St, New York. Real prices, real hours, demo bookings only.',
};

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/visit', label: 'Visit' },
  { href: '/booking', label: 'Booking' },
  { href: '/contact', label: 'Contact' },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="demo-banner" role="note">
          Concept redesign demo — not affiliated with {SHOP.name}. Demo bookings create no real
          appointment. To book for real, call{' '}
          <a href={SHOP.phoneHref}>{SHOP.phone}</a>.
        </div>
        <header className="site-header">
          <div className="wrap header-row">
            <a className="brand" href="/">
              ART OF <span>PERFECTION</span>
            </a>
            <nav className="main-nav" aria-label="Main navigation">
              {NAV.map((n) => (
                <a key={n.href} href={n.href}>
                  {n.label}
                </a>
              ))}
            </nav>
            <a className="nav-phone" href={SHOP.phoneHref}>
              {SHOP.phone}
            </a>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <div className="footer-grid">
              <div>
                <p className="brand" style={{ margin: '0 0 12px' }}>
                  ART OF <span>PERFECTION</span>
                </p>
                <p className="small">
                  {SHOP.address}
                  <br />
                  Phone: <a href={SHOP.phoneHref}>{SHOP.phone}</a>
                  <br />
                  Mon–Thu 9 AM–7 PM · Fri 9 AM–5 PM · Sat closed · Sun 10 AM–5 PM
                </p>
                <p className="small">
                  Concept redesign demo — not affiliated with the shop. Demo bookings create no
                  real appointment.
                </p>
              </div>
              <div>
                <ul className="footer-links">
                  <li><a href="/services">Services &amp; prices</a></li>
                  <li><a href="/visit">Visit the shop</a></li>
                  <li><a href="/booking">Book a chair (demo)</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </div>
              <div>
                <ul className="footer-links">
                  <li><a href="/privacy">Privacy Policy</a></li>
                  <li><a href="/terms">Terms &amp; Conditions</a></li>
                  <li><a href={SHOP.mapsUrl} target="_blank" rel="noreferrer">Get directions (Google Maps)</a></li>
                </ul>
              </div>
            </div>
            <p className="small" style={{ marginTop: 32 }}>
              Photos: real barbershop photographs from Wikimedia Commons (CC0 / CC BY-SA 4.0),
              not photos of this shop. Credits: cutting — Alvinategyeka (CC0); fade — Lorenzop1
              (CC BY-SA 4.0); chairs &amp; interior — Mostafameraji (CC BY-SA 4.0); trim —
              PattayaPatrol (CC BY-SA 4.0). Full credits: /credits.json. No photos or logo assets
              from the shop&apos;s own site are used.
            </p>
          </div>
        </footer>
        {/* Sticky mobile booking bar: phones only (hidden on desktop via CSS).
            Body bottom padding on phones keeps footer content from hiding behind it. */}
        <div className="mobile-book-bar" role="navigation" aria-label="Quick booking">
          <a className="btn btn-primary" href="/booking">Book a chair</a>
          <a className="btn btn-ghost" href={SHOP.phoneHref}>Call {SHOP.phone}</a>
        </div>
      </body>
    </html>
  );
}
