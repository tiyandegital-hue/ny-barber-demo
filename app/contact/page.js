'use client';

import { useState } from 'react';
import { SHOP, isValidEmail } from '@/lib/data';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [apiError, setApiError] = useState('');

  async function onSubmit(ev) {
    ev.preventDefault();
    const e = {};
    if (!name.trim()) e.name = 'Please enter your name.';
    else if (name.trim().length > 100) e.name = 'Name must be 100 characters or fewer.';
    if (!email.trim()) e.email = 'Please enter your email.';
    else if (!isValidEmail(email)) e.email = 'That email address does not look valid.';
    if (!message.trim()) e.message = 'Please write a message.';
    else if (message.length > 2000) e.message = 'Message must be 2,000 characters or fewer.';
    if (!consent) e.consent = 'Please tick the consent box so we can handle your message as described.';
    setErrors(e);
    if (Object.keys(e).length) return;
    setSubmitting(true);
    setApiError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, consent }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data?.error?.fields) setErrors(data.error.fields);
        setApiError(data?.error?.message || 'Something went wrong. Please try again.');
        return;
      }
      setDone(true);
    } catch {
      setApiError('Could not reach the server. Please try again, or call the shop.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="wrap">
      <section className="section" style={{ paddingBottom: 0 }}>
        <p className="eyebrow">Contact</p>
        <h1 className="display">Talk to the shop.</h1>
        <p className="lede">
          This demo form validates your message and returns a confirmation — it does not deliver
          mail to the shop and stores nothing. For anything real, call the number below.
        </p>
      </section>
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="grid-2">
          <div>
            <p><strong>{SHOP.name}</strong></p>
            <p>
              {SHOP.address}<br />
              Phone: <a href={SHOP.phoneHref}>{SHOP.phone}</a><br />
              <a href={SHOP.mapsUrl} target="_blank" rel="noreferrer">Get directions on Google Maps</a>
            </p>
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
          </div>
          <div>
            {done ? (
              <div className="form-ok" role="status">
                <h2 style={{ marginTop: 0 }}>Message received (demo).</h2>
                <p>
                  Thank you, {name}. This demo validated your message and stored nothing. To reach
                  the shop for real, call <a href={SHOP.phoneHref}>{SHOP.phone}</a>.
                </p>
              </div>
            ) : (
              <form className="form" onSubmit={onSubmit} noValidate>
                {apiError && <p className="form-error" role="alert">{apiError}</p>}
                <div className="field">
                  <label htmlFor="ct-name">Your name *</label>
                  <input id="ct-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-describedby={errors.name ? 'ct-name-err' : undefined} />
                  {errors.name && <p className="field-error" id="ct-name-err">{errors.name}</p>}
                </div>
                <div className="field">
                  <label htmlFor="ct-email">Email *</label>
                  <input id="ct-email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby={errors.email ? 'ct-email-err' : undefined} />
                  {errors.email && <p className="field-error" id="ct-email-err">{errors.email}</p>}
                </div>
                <div className="field">
                  <label htmlFor="ct-message">Message *</label>
                  <textarea id="ct-message" maxLength={2000} value={message} onChange={(e) => setMessage(e.target.value)} aria-describedby={errors.message ? 'ct-message-err' : undefined} />
                  {errors.message && <p className="field-error" id="ct-message-err">{errors.message}</p>}
                  <p className="small">{message.length} / 2,000 characters</p>
                </div>
                <label className="consent">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                  <span>I understand this demo message is validated, not delivered to the shop, and not stored. *</span>
                </label>
                {errors.consent && <p className="field-error">{errors.consent}</p>}
                <button className="btn btn-primary" type="submit" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send demo message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
