import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import {
  SERVICES,
  hoursForDate,
  isValidEmail,
  isValidPhone,
  nyTomorrow,
  weekdayOf,
} from '@/lib/data';

function fail(message, fields) {
  return NextResponse.json(
    { error: { code: 'validation_error', message, fields: fields || {} } },
    { status: 422 }
  );
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: { code: 'bad_request', message: 'Request body must be valid JSON.', fields: {} } },
      { status: 400 }
    );
  }

  const fields = {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const serviceId = typeof body.serviceId === 'string' ? body.serviceId : '';
  const date = typeof body.date === 'string' ? body.date : '';
  const time = typeof body.time === 'string' ? body.time : '';
  const notes = typeof body.notes === 'string' ? body.notes : '';
  const consent = body.consent === true;

  if (!name) fields.name = 'Name is required.';
  else if (name.length > 100) fields.name = 'Name must be 100 characters or fewer.';

  if (!phone && !email) {
    fields.contact = 'A phone number or an email is required.';
  } else {
    if (phone && !isValidPhone(phone)) fields.phone = 'Phone number is not valid.';
    if (email && !isValidEmail(email)) fields.email = 'Email address is not valid.';
  }

  const service = SERVICES.find((s) => s.id === serviceId);
  if (!service) fields.serviceId = 'Service is not recognised.';

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || weekdayOf(date) === null) {
    fields.date = 'Date must be a valid YYYY-MM-DD date.';
  } else if (date < nyTomorrow()) {
    fields.date = 'Date must be tomorrow or later (America/New_York).';
  } else if (weekdayOf(date) === 6) {
    fields.date = 'The shop is closed on Saturdays.';
  }

  if (!/^\d{2}:\d{2}$/.test(time)) {
    fields.time = 'Time must be a valid HH:MM time.';
  } else if (!fields.date && service) {
    const h = hoursForDate(date);
    if (!h) {
      fields.time = 'The shop is closed on this date.';
    } else {
      const [sh, sm] = time.split(':').map(Number);
      const start = sh * 60 + sm;
      const [oh, om] = h.open.split(':').map(Number);
      const [ch, cm] = h.close.split(':').map(Number);
      if (start < oh * 60 + om || start + service.durationMin > ch * 60 + cm) {
        fields.time = 'Time is outside this day’s opening hours for this service.';
      }
    }
  }

  if (notes.length > 500) fields.notes = 'Notes must be 500 characters or fewer.';
  if (!consent) fields.consent = 'Consent is required.';

  if (Object.keys(fields).length > 0) {
    return fail('The demo booking request failed validation.', fields);
  }

  // Stateless: nothing is stored. A reference is generated and echoed only.
  const reference = `AOP-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

  return NextResponse.json(
    {
      booking: {
        reference,
        name,
        serviceId: service.id,
        serviceName: service.name,
        price: service.price,
        durationMin: service.durationMin,
        date,
        time,
        notes: notes || null,
        stored: false,
        demo: true,
      },
    },
    { status: 201 }
  );
}
