import BarberPole from '@/components/BarberPole';
import Reveal from '@/components/Reveal';
import { SHOP, SERVICES } from '@/lib/data';

export const metadata = {
  title: 'The Art of Perfection Barbershop — Midtown Manhattan | Concept Demo',
  description:
    'A sharp cut, taken slowly. Real prices, real hours, 34 W 37th St, New York. Concept redesign demo.',
};

export default function Home() {
  const preview = SERVICES.slice(0, 3);
  return (
    <div className="wrap">
      <section className="hero">
        <div>
          <p className="eyebrow">Midtown Manhattan · {SHOP.address}</p>
          <h1 className="display">A sharp cut, taken slowly.</h1>
          <p className="lede" style={{ marginTop: 20 }}>
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
        <div className="pole-stage">
          <BarberPole />
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

      <Reveal>
        <section className="section photo-break">
          <img src="/images/chairs.jpg" alt="A barber cutting a client's hair in a barbershop chair" loading="lazy" />
          <p className="small" style={{ marginTop: 10 }}>
            Illustration photo from Wikimedia Commons — a real barbershop elsewhere, not this shop.
          </p>
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
