'use client';

import { useEffect, useState } from 'react';
import { CATEGORIES } from '@/lib/data';

/* Category header photos: licensed Commons illustrations already in public/images/.
   They illustrate the category's craft; they are not photos of this shop. */
const CATEGORY_PHOTOS = {
  cut: { src: '/images/cutting.jpg', alt: 'A barber cutting a client\'s hair' },
  shave: { src: '/images/fade.jpg', alt: 'Close-up of finished barber work' },
  beard: { src: '/images/trim.jpg', alt: 'A barber trimming a client\'s hair' },
  full: { src: '/images/chairs.jpg', alt: 'Barbershop chairs inside a barbershop' },
};

export default function ServicesPage() {
  const [services, setServices] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/services')
      .then((r) => {
        if (!r.ok) throw new Error('menu unavailable');
        return r.json();
      })
      .then((d) => setServices(d.services))
      .catch(() => setError('The menu could not be loaded. Please refresh, or call the shop.'));
  }, []);

  const groups = CATEGORIES.filter((c) => c.id !== 'all' && (filter === 'all' || filter === c.id))
    .map((c) => ({ ...c, items: (services || []).filter((s) => s.category === c.id) }));

  return (
    <div className="wrap">
      <section className="section" style={{ paddingBottom: 0 }}>
        <p className="eyebrow">Services &amp; prices</p>
        <h1 className="display">The full menu.</h1>
        <p className="lede">
          Every price and duration below comes from the shop&apos;s public menu, checked October
          2026. Prices may change — the shop confirms on booking.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="chips" role="group" aria-label="Filter services by category">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`chip ${filter === c.id ? 'active' : ''}`}
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}
        {!services && !error && <p>Loading the menu…</p>}
        {services && groups.every((g) => g.items.length === 0) && <p>No services in this category.</p>}

        <div className="menu-board">
          {groups.map((g) => (
            g.items.length > 0 && (
              <section className="menu-group" key={g.id} aria-label={`${g.label} services`}>
                <div className="menu-group-photo">
                  <img src={CATEGORY_PHOTOS[g.id].src} alt={CATEGORY_PHOTOS[g.id].alt} loading="lazy" />
                  <div className="menu-group-scrim" aria-hidden="true" />
                  <h2 className="display">{g.label}</h2>
                </div>
                <div className="menu-rows">
                  {g.items.map((s) => (
                    <a className="menu-row" key={s.id} href={`/booking?service=${s.id}`}>
                      <span className="menu-name">
                        {s.name}
                        <span className="menu-desc">{s.includes}</span>
                      </span>
                      <span className="menu-dots" aria-hidden="true" />
                      <span className="menu-meta">
                        <span className="menu-price">${s.price}</span>
                        <span className="menu-dur">{s.durationMin} min</span>
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            )
          ))}
        </div>

        <p style={{ marginTop: 32 }}>
          <a className="btn btn-primary" href="/booking">Book a chair</a>
        </p>
        <p className="small" style={{ marginTop: 16 }}>
          Demo note: this page loads its menu live from /api/services. Nothing here is a review,
          rating, or claim about other customers. Category photos are Wikimedia Commons
          illustrations of barbershops elsewhere, not this shop.
        </p>
      </section>
    </div>
  );
}
