import Reveal from '@/components/Reveal';
import { SHOP } from '@/lib/data';

export const metadata = {
  title: 'Visit the shop — The Art of Perfection Barbershop | Concept Demo',
  description: 'Hours, address, and what to expect at The Art of Perfection Barbershop, Midtown Manhattan.',
};

export default function VisitPage() {
  return (
    <div className="wrap">
      <section className="section" style={{ paddingBottom: 0 }}>
        <p className="eyebrow">Visit</p>
        <h1 className="display">Midtown. Unhurried.</h1>
        <p className="lede">
          A Midtown barbershop built around one idea: the chair is never rushed. You sit down,
          you are consulted, and the cut is finished properly — not handed off halfway.
        </p>
      </section>

      <Reveal>
        <section className="section" style={{ paddingTop: 32 }}>
          <div className="grid-2">
            <div>
              <h2 className="display" style={{ fontSize: '1.8rem', marginBottom: 16 }}>What the shop stands for</h2>
              <p>
                A fresh blade for every shave. A station sanitised and opened in front of you, so
                cleanliness is something you see, not something you are told about.
              </p>
              <p>
                Cuts shaped to grow out well — so the second and third week still look deliberate,
                not just the first day. Japanese steel and hot towels where the service calls for them.
              </p>
              <p>
                This is the shop&apos;s own positioning, paraphrased from its public site — not a
                claim this demo has independently tested.
              </p>
            </div>
            <div>
              <img
                src="/images/trim.jpg"
                alt="A barber trimming a client's hair in a barbershop"
                style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 4 }}
                loading="lazy"
              />
              <p className="small" style={{ marginTop: 10 }}>
                Illustration photo from Wikimedia Commons — a real barbershop elsewhere, not this shop.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="section-head">
            <p className="eyebrow">Hours &amp; location</p>
            <h2 className="display">When to come.</h2>
          </div>
          <table className="hours-table">
            <tbody>
              {SHOP.hours.map((h) => (
                <tr key={h.days}>
                  <th scope="row">{h.days}</th>
                  <td>{h.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: 20 }}>
            <strong>{SHOP.address}</strong> — Midtown Manhattan, near Herald Square, Bryant Park,
            and Fifth Avenue. Saturdays the shop is closed, so the booking form disables them.
          </p>
          <p>
            <a className="btn btn-ghost" href={SHOP.mapsUrl} target="_blank" rel="noreferrer">
              Get directions on Google Maps
            </a>{' '}
            <a className="btn btn-primary" href={SHOP.phoneHref} style={{ marginLeft: 8 }}>
              Call {SHOP.phone}
            </a>
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="section-head">
            <p className="eyebrow">The craft, in pictures</p>
            <h2 className="display">From the chair.</h2>
            <p>
              Illustration photos from Wikimedia Commons — real barbershops elsewhere, shown for
              the craft, not as photos of this shop.
            </p>
          </div>
          <div className="grid-3">
            <img src="/images/cutting.jpg" alt="A barber at work in a barbershop mirror view" style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: 4 }} loading="lazy" />
            <img src="/images/fade.jpg" alt="Close-up of a freshly cut skin fade" style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: 4 }} loading="lazy" />
            <img src="/images/interior2.jpg" alt="A barber cutting hair in a dim barbershop" style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: 4 }} loading="lazy" />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="section-head">
            <p className="eyebrow">On arrival</p>
            <h2 className="display">What to expect.</h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="num">01</div>
              <h3>Check in</h3>
              <p>Give your name and service at the front. Walk-ins depend on the chairs that day — calling ahead is the reliable route.</p>
            </div>
            <div className="step">
              <div className="num">02</div>
              <h3>Consult</h3>
              <p>Your barber agrees the cut with you first — length, fade, beard shape — before starting.</p>
            </div>
            <div className="step">
              <div className="num">03</div>
              <h3>Finish</h3>
              <p>Line-up and finish, then you are shown the result before you leave the chair.</p>
            </div>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="section" id="faq">
          <div className="section-head">
            <p className="eyebrow">Questions, answered</p>
            <h2 className="display">Good to know.</h2>
            <p>Only verified facts — hours, durations, and the demo note, nothing invented.</p>
          </div>
          <div className="faq">
            <div className="faq-item">
              <h3>What are the hours?</h3>
              <p>
                Mon–Thu 9 AM–7 PM, Fri 9 AM–5 PM, Sun 10 AM–5 PM. The shop is closed on
                Saturdays, so the booking form never offers one.
              </p>
            </div>
            <div className="faq-item">
              <h3>How long does each service take?</h3>
              <p>
                From the shop&apos;s public menu: haircut 20 minutes, skin fade 30, shave 20,
                beard trim 20, haircut &amp; beard 40, the full service 60.
              </p>
            </div>
            <div className="faq-item">
              <h3>Do demo bookings create a real appointment?</h3>
              <p>
                No. This is a concept redesign demo: demo bookings create no appointment and
                nothing is stored. To book for real, call <a href={SHOP.phoneHref}>{SHOP.phone}</a>.
              </p>
            </div>
            <div className="faq-item">
              <h3>Where is the shop?</h3>
              <p>
                <strong>{SHOP.address}</strong> — Midtown Manhattan, near Herald Square, Bryant
                Park, and Fifth Avenue.{' '}
                <a href={SHOP.mapsUrl} target="_blank" rel="noreferrer">Get directions on Google Maps</a>.
              </p>
            </div>
          </div>
          <p style={{ marginTop: 28 }}>
            <a className="btn btn-primary" href="/booking">Book a chair (demo)</a>
          </p>
        </section>
      </Reveal>
    </div>
  );
}
