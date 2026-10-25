import { NextResponse } from 'next/server';
import { isValidEmail } from '@/lib/data';

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
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message : '';
  const consent = body.consent === true;

  if (!name) fields.name = 'Name is required.';
  else if (name.length > 100) fields.name = 'Name must be 100 characters or fewer.';
  if (!email) fields.email = 'Email is required.';
  else if (!isValidEmail(email)) fields.email = 'Email address is not valid.';
  if (!message.trim()) fields.message = 'Message is required.';
  else if (message.length > 2000) fields.message = 'Message must be 2,000 characters or fewer.';
  if (!consent) fields.consent = 'Consent is required.';

  if (Object.keys(fields).length > 0) {
    return NextResponse.json(
      { error: { code: 'validation_error', message: 'The demo message failed validation.', fields } },
      { status: 422 }
    );
  }

  // Stateless demo: validated, confirmed, never delivered, never stored.
  return NextResponse.json(
    { ok: true, demo: true, stored: false, delivered: false },
    { status: 201 }
  );
}
