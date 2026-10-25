'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
  SERVICES,
  SHOP,
  fmtTime,
  hoursForDate,
  isValidEmail,
  isValidPhone,
  nyTomorrow,
  slotsFor,
  weekdayOf,
} from '@/lib/data';

function BookingForm() {
  const params = useSearchParams();
  const [serviceId, setServiceId] = useState(() => {
    const q = params.get('service');
    return SERVICES.some((s) => s.id === q) ? q : 'haircut';
  });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState('');

  const service = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];
  const minDate = nyTomorrow();
  const dayInfo = useMemo(() => {
    if (!date) return null;
    const wd = weekdayOf(date);
    if (wd === null) return { bad: 'Enter a valid date.' };
    if (wd === 6) return { bad: 'The shop is closed on Saturdays. Pick another day.' };
    if (date < minDate) return { bad: 'Pick a future date — bookings open from tomorrow.' };
    return { hours: hoursForDate(date) };
  }, [date, minDate]);
  const slots = useMemo(
    () => (date && dayInfo && !dayInfo.bad ? slotsFor(date, service.durationMin) : []),
    [date, dayInfo, service]
  );

  useEffect(() => {
    setTime('');
  }, [date, serviceId]);

  function validate() {
    const e = {};
    if (!name.trim()) e.name = 'Please enter your name.';
    else if (name.trim().length > 100) e.name = 'Name must be 100 characters or fewer.';
    const hasPhone = phone.trim() !== '';
    const hasEmail = email.trim() !== '';
    if (!hasPhone && !hasEmail) {
      e.contact = 'Enter a phone number or an email so the shop could reach you.';
    } else {
      if (hasPhone && !isValidPhone(phone)) e.phone = 'That phone number does not look valid.';
      if (hasEmail && !isValidEmail(email)) e.email = 'That email address does not look valid.';
    }
    if (!date) e.date = 'Pick a date.';
    else if (dayInfo && dayInfo.bad) e.date = dayInfo.bad;
    if (date && !e.date) {
      if (!time) e.time = 'Pick a time.';
      else if (!slots.includes(time)) e.time = 'That time is outside this day’s hours for this service.';
    }
    if (notes.length > 500) e.notes = 'Notes must be 500 characters or fewer.';
    if (!consent) e.consent = 'Please tick the box to confirm you understand this is a demo request.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    setApiError('');
    setResult(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, serviceId, date, time, notes, consent }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data?.error?.fields) setErrors(data.error.fields);
        setApiError(data?.error?.message || 'Something went wrong. Please try again.');
        return;
      }
      setResult(data.booking);
    } catch {
      setApiError('Could not reach the server. Please try again, or call the shop.');
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="form-ok" role="status">
        <h2 className="display" style={{ fontSize: '1.6rem', marginBottom: 12 }}>Demo request received.</h2>
        <p>
          Reference: <strong>{result.reference}</strong> — keep it for your own records. This is a
          demo: <strong>no appointment was created and nothing was stored.</strong>
        </p>
        <dl className="summary-box">
          <dt>Service</dt><dd>{result.serviceName} — ${result.price} · {result.durationMin} minutes</dd>
          <dt>Date &amp; time</dt><dd>{result.date} at {fmtTime(result.time)}</dd>
          <dt>Name</dt><dd>{result.name}</dd>
          {result.notes && (<><dt>Notes</dt><dd>{result.notes}</dd></>)}
        </dl>
        <p>
          To book for real, call the shop: <a href={SHOP.phoneHref}><strong>{SHOP.phone}</strong></a>.
        </p>
        <button className="btn btn-ghost" type="button" onClick={() => { setResult(null); setDate(''); setTime(''); }}>
          Make another demo request
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {apiError && <p className="form-error" role="alert">{apiError}</p>}

      <div className="field">
        <label htmlFor="bk-service">Service</label>
        <select id="bk-service" value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.id}>{s.name} — ${s.price}</option>
          ))}
        </select>
      </div>

      <div className="summary-box" aria-live="polite">
        <strong>{service.name}</strong> — ${service.price} · {service.durationMin} minutes
        <br /><span className="small">{service.includes}</span>
      </div>

      <div className="field">
        <label htmlFor="bk-name">Your name *</label>
        <input id="bk-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-describedby={errors.name ? 'bk-name-err' : undefined} />
        {errors.name && <p className="field-error" id="bk-name-err">{errors.name}</p>}
      </div>

      <div className="field">
        <label htmlFor="bk-phone">Phone</label>
        <input id="bk-phone" autoComplete="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} aria-describedby={errors.phone ? 'bk-phone-err' : undefined} />
        {errors.phone && <p className="field-error" id="bk-phone-err">{errors.phone}</p>}
      </div>

      <div className="field">
        <label htmlFor="bk-email">Email</label>
        <input id="bk-email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby={errors.email ? 'bk-email-err' : undefined} />
        {errors.email && <p className="field-error" id="bk-email-err">{errors.email}</p>}
      </div>
      {errors.contact && <p className="field-error" role="alert">{errors.contact}</p>}
      <p className="small" style={{ marginTop: -10 }}>Phone or email — at least one is required.</p>

      <div className="field">
        <label htmlFor="bk-date">Date *</label>
        <input id="bk-date" type="date" min={minDate} value={date} onChange={(e) => setDate(e.target.value)} aria-describedby={errors.date ? 'bk-date-err' : undefined} />
        {errors.date && <p className="field-error" id="bk-date-err">{errors.date}</p>}
        <p className="small">Saturdays are disabled by the shop&apos;s hours — the shop is closed on Saturdays.</p>
      </div>

      <div className="field">
        <label htmlFor="bk-time">Time *</label>
        <select id="bk-time" value={time} onChange={(e) => setTime(e.target.value)} disabled={!date || !slots.length} aria-describedby={errors.time ? 'bk-time-err' : undefined}>
          <option value="">{!date ? 'Pick a date first' : slots.length ? 'Pick a time' : 'No times available this day'}</option>
          {slots.map((t) => (
            <option key={t} value={t}>{fmtTime(t)}</option>
          ))}
        </select>
        {errors.time && <p className="field-error" id="bk-time-err">{errors.time}</p>}
        {date && dayInfo && dayInfo.hours && (
          <p className="small">Open {fmtTime(dayInfo.hours.open)} – {fmtTime(dayInfo.hours.close)} this day.</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="bk-notes">Notes (optional)</label>
        <textarea id="bk-notes" maxLength={500} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything the barber should know before the cut." aria-describedby={errors.notes ? 'bk-notes-err' : undefined} />
        {errors.notes && <p className="field-error" id="bk-notes-err">{errors.notes}</p>}
        <p className="small">{notes.length} / 500 characters</p>
      </div>

      <label className="consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          I understand this is a demo request, not a real appointment, and that no appointment is
          created and no data is stored. *
        </span>
      </label>
      {errors.consent && <p className="field-error">{errors.consent}</p>}

      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Request demo booking'}
      </button>
      <p className="small">
        To book for real, call <a href={SHOP.phoneHref}>{SHOP.phone}</a>. This demo form stores
        nothing — see <a href="/privacy">Privacy</a>.
      </p>
    </form>
  );
}

export default function BookingPage() {
  return (
    <div className="wrap">
      <section className="section" style={{ paddingBottom: 0 }}>
        <p className="eyebrow">Booking — demo</p>
        <h1 className="display">Book a chair.</h1>
        <p className="lede">
          Pick a service, a day, and a time. Times shown are only the ones inside that day&apos;s
          real shop hours, and Saturdays never appear — the shop is closed.
        </p>
        <p className="form-error" style={{ maxWidth: 640 }}>
          Demo only: submitting this form creates no real appointment and stores nothing. To book
          for real, call <a href={SHOP.phoneHref}>{SHOP.phone}</a>.
        </p>
      </section>
      <section className="section" style={{ paddingTop: 32 }}>
        <Suspense fallback={<p>Loading the booking form…</p>}>
          <BookingForm />
        </Suspense>
      </section>
    </div>
  );
}
