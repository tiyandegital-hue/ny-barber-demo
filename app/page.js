import BarberPole from '@/components/BarberPole';
import Reveal from '@/components/Reveal';
import { SHOP, SERVICES } from '@/lib/data';

export const metadata = {
  title: 'The Art of Perfection Barbershop — Midtown Manhattan | Concept Demo',
  description:
    'A sharp cut in Midtown, taken slowly. Real prices, real hours, 34 W 37th St, New York. Concept redesign demo.',
};

const GALLERY = [
  { src: '/images/cutting.jpg', alt: 'A barber cutting a client\'s hair in a barbershop' },
  { src: '/images/fade.jpg', alt: 'Close-up of a freshly cut skin fade' },
  { src: '/images/chairs.jpg', alt: 'Barbershop chairs inside a barbershop' },
  { src: '/images/trim.jpg', alt: 'A barber trimming a client\'s hair in a barbershop' },
  { src: '/images/interior2.jpg', alt: 'A barber cutting hair inside a barbershop' },
];

export default function Home() {
  const preview = SERVICES.slice(0, 3);
  return (
    <div className="wrap">
      {/* Photo-led hero (niche research: show the cuts, not abstract graphics).
          The 3D pole no longer leads; it lives in the craft block below. */}
      <section className="hero-photo">
        <img src="/images/cutting.jpg" alt="A barber cutting a client's hair in a barbershop" fetchPriority="high" />
        <div className="hero-photo-scrim" aria-hidden="true" />
        <div className="hero-photo-content">
          <p className="eyebrow">Midtown Manhattan · {SHOP.address}</p>
          <h1 className="display">A sharp cut in Midtown, taken slowly.</h1>
          <p className="lede">
            No one rushed out of the chair mid-fade. A fresh blade, a station sanitised and opened
            in front of you, and a cut that still looks right weeks later.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="/booking">Book a chair</a>
            <a className="btn btn-ghost" href="/services">See services &amp; prices</a>
          </div>
          <p className="small" style={{ marginTop: 16 }}>
            Prefer a human? Call <a href={SHOP.phoneHref}>{SHOP.phone}</a>. Demo bookings on this
            site create no real appointment.
          </p>
        </div>
      </section>

      <section className="trust-strip" aria-label="Shop facts">
        <div><div className="k">Address</div><div className="v">{SHOP.address}</div></div>
        <div><div className="k">Opening hours</div><div className="v">Mon–Thu 9 AM–7 PM · Fri 9 AM–5 PM · Sun 10 AM–5 PM · Sat closed</div></div>
        <div><div className="k">Phone</div><div className="v"><a href={SHOP.phoneHref}>{SHOP.phone}</a></div></div>
        <div><div className="k">Services from</div><div className="v">$30 · beard trim</div></div>
      </section>

      <Reveal>
        <section className="section">
          <div className="section-head">
            <p className="eyebrow">From the chair</p>
            <h2 className="display">The work, in pictures.</h2>
            <p>
              Illustration photos from Wikimedia Commons — real barbershops elsewhere, shown for
              the craft, not as photos of this shop.
            </p>
          </div>
          <div className="gallery-strip" role="list">
            {GALLERY.map((g) => (
              <img key={g.src} role="listitem" src={g.src} alt={g.alt} loading="lazy" />
            ))}
          </div>
          <p style={{ marginTop: 28 }}>
            <a className="btn btn-primary" href="/booking">Book a chair</a>
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="section-head">
            <p className="eyebrow">The menu</p>
            <h2 className="display">Prices on the board.</h2>
            <p>Exact prices and durations from the shop&apos;s public menu. No surprises at the till.</p>
          </div>
          <div className="grid-3">
            {preview.map((s) => (
              <article className="card" key={s.id}>
                <div className="price-row">
                  <h3>{s.name}</h3>
                  <span className="price">${s.price}</span>
                </div>
                <span className="dur">{s.durationMin} minutes</span>
                <p>{s.includes}</p>
                <a href="/booking" style={{ fontWeight: 700, marginTop: 'auto' }}>Book this →</a>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 24 }}>
            <a className="btn btn-ghost" href="/services">See the full menu</a>
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="section-head">
            <p className="eyebrow">How a visit works</p>
            <h2 className="display">Three steps, no rush.</h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="num">01</div>
              <h3>Consult</h3>
              <p>Say what you want, and what has not worked before. The cut is agreed before the clippers come out.</p>
            </div>
            <div className="step">
              <div className="num">02</div>
              <h3>Cut</h3>
              <p>Unhurried chair time. Japanese steel, a fresh blade, and a station sanitised in front of you.</p>
            </div>
            <div className="step">
              <div className="num">03</div>
              <h3>Finish</h3>
              <p>Line-up, hot towel where the service calls for it, and a cut shaped to grow out well.</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* First-visit reassurance: verified facts only. No consultation-style
          welcome is claimed, no walk-in policy is stated (unverified). */}
      <Reveal>
        <section className="section">
          <div className="section-head">
            <p className="eyebrow">First visit?</p>
            <h2 className="display">Know before you sit down.</h2>
          </div>
          <div className="grid-2">
            <div className="card">
              <h3>Prices and times, upfront</h3>
              <p>
                Every service lists its exact price and duration before you book — from $30 for a
                beard trim to $150 for the full service. No surprises at the till.
              </p>
            </div>
            <div className="card">
              <h3>Cleanliness you can see</h3>
              <p>
                Per the shop&apos;s own site: a fresh blade, and a station sanitised and opened in
                front of you at every sitting.
              </p>
            </div>
            <div className="card">
              <h3>Saturdays the shop is closed</h3>
              <p>
                Hours are Mon–Thu 9 AM–7 PM, Fri 9 AM–5 PM, Sun 10 AM–5 PM. The booking form
                never offers a Saturday.
              </p>
            </div>
            <div className="card">
              <h3>This site is a demo</h3>
              <p>
                Bookings made here create no real appointment and nothing is stored. To book for
                real, call <a href={SHOP.phoneHref}>{SHOP.phone}</a>.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Craft accent: the 3D pole, demoted from hero lead to a small animated accent. */}
      <Reveal>
        <section className="section craft-block" id="craft">
          <div>
            <p className="eyebrow">The craft, in motion</p>
            <h2 className="display">The pole still turns.</h2>
            <p>
              A small animated nod to the trade — the barber pole, built in code, kept as an
              accent now that the photography leads the page.
            </p>
            <p>
              <a className="btn btn-ghost" href="/visit">Visit the shop</a>
            </p>
          </div>
          <div className="pole-stage pole-stage-sm">
            <BarberPole />
          </div>
        </section>
      </Reveal>

      <section className="ending">
        <p className="eyebrow">Walk in sharp.</p>
        <p className="display">Your chair is waiting on 37th Street.</p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="/booking">Book a chair</a>
          <a className="btn btn-ghost" href={SHOP.phoneHref}>Call {SHOP.phone}</a>
        </div>
      </section>
    </div>
  );
}
