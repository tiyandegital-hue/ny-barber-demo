'use client';

import { useEffect, useState } from 'react';
import { CATEGORIES } from '@/lib/data';

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

  const shown = (services || []).filter((s) => filter === 'all' || s.category === filter);

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
        {services && shown.length === 0 && <p>No services in this category.</p>}

        <div className="grid-2">
          {shown.map((s, i) => (
            <article className="card" key={s.id}>
              <div className="price-row">
                <h3>{String(i + 1).padStart(2, '0')} · {s.name}</h3>
                <span className="price">${s.price}</span>
              </div>
              <span className="dur">{s.durationMin} minutes · {s.categoryLabel}</span>
              <p>{s.includes}</p>
              <a href={`/booking?service=${s.id}`} style={{ fontWeight: 700, marginTop: 'auto' }}>
                Book this service →
              </a>
            </article>
          ))}
        </div>

        <p style={{ marginTop: 32 }}>
          <a className="btn btn-primary" href="/booking">Book a chair</a>
        </p>
        <p className="small" style={{ marginTop: 16 }}>
          Demo note: this page loads its menu live from /api/services. Nothing here is a review,
          rating, or claim about other customers.
        </p>
      </section>
    </div>
  );
}
