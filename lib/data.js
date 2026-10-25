export const SHOP = {
  name: 'The Art of Perfection Barbershop',
  shortName: 'Art of Perfection',
  address: '34 W 37th St, New York, NY 10018',
  phone: '(212) 439-5170',
  phoneHref: 'tel:+12124395170',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=34+W+37th+St+New+York+NY+10018',
  // Hours as published on the shop's public site, checked Oct 2026.
  hours: [
    { days: 'Monday – Thursday', open: '9:00', close: '19:00', label: '9:00 AM – 7:00 PM' },
    { days: 'Friday', open: '9:00', close: '17:00', label: '9:00 AM – 5:00 PM' },
    { days: 'Saturday', open: null, close: null, label: 'Closed' },
    { days: 'Sunday', open: '10:00', close: '17:00', label: '10:00 AM – 5:00 PM' },
  ],
};

export const SERVICES = [
  {
    id: 'haircut',
    name: 'The Perfect Haircut',
    category: 'cut',
    categoryLabel: 'Cut',
    price: 45,
    durationMin: 20,
    includes: 'Consultation, cut, and a clean finish.',
  },
  {
    id: 'skin-fade',
    name: 'The Perfect Skin Fade',
    category: 'cut',
    categoryLabel: 'Cut',
    price: 50,
    durationMin: 30,
    includes: 'Consultation, skin fade, line-up, and finish.',
  },
  {
    id: 'shave',
    name: 'The Perfect Shave',
    category: 'shave',
    categoryLabel: 'Shave',
    price: 45,
    durationMin: 20,
    includes: 'Hot-towel shave with a fresh blade and finish.',
  },
  {
    id: 'beard-trim',
    name: 'The Perfect Beard Trim',
    category: 'beard',
    categoryLabel: 'Beard',
    price: 30,
    durationMin: 20,
    includes: 'Beard trim, shape-up, and finish.',
  },
  {
    id: 'haircut-beard',
    name: 'The Perfect Haircut & Beard',
    category: 'beard',
    categoryLabel: 'Beard',
    price: 70,
    durationMin: 40,
    includes: 'Full haircut plus beard trim and shape-up.',
  },
  {
    id: 'perfect-service',
    name: 'The Perfect Service',
    category: 'full',
    categoryLabel: 'Full service',
    price: 150,
    durationMin: 60,
    includes: 'Haircut, shave, facial, and wax — the full chair.',
  },
];

export const CATEGORIES = [
  { id: 'all', label: 'All services' },
  { id: 'cut', label: 'Cut' },
  { id: 'shave', label: 'Shave' },
  { id: 'beard', label: 'Beard' },
  { id: 'full', label: 'Full service' },
];

/** Weekday (0=Sun..6=Sat) for a YYYY-MM-DD calendar date. */
export function weekdayOf(dateStr) {
  const d = new Date(`${dateStr}T12:00:00Z`);
  return Number.isNaN(d.getTime()) ? null : d.getUTCDay();
}

/** Today's date in America/New_York as YYYY-MM-DD. */
export function nyToday() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date());
}

/** Tomorrow's date in America/New_York as YYYY-MM-DD. */
export function nyTomorrow() {
  const now = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(now);
}

/** Opening hours for a calendar date, or null when closed. Returns {open, close} as "HH:MM". */
export function hoursForDate(dateStr) {
  const wd = weekdayOf(dateStr);
  if (wd === null) return null;
  if (wd === 6) return null; // Saturday: closed
  if (wd === 0) return { open: '10:00', close: '17:00' }; // Sunday
  if (wd === 5) return { open: '9:00', close: '17:00' }; // Friday
  return { open: '9:00', close: '19:00' }; // Mon–Thu
}

function toMin(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/** 30-minute start slots for a date + service duration, all ending by close. */
export function slotsFor(dateStr, durationMin) {
  const h = hoursForDate(dateStr);
  if (!h) return [];
  const slots = [];
  for (let t = toMin(h.open); t + durationMin <= toMin(h.close); t += 30) {
    const hh = String(Math.floor(t / 60)).padStart(2, '0');
    const mm = String(t % 60).padStart(2, '0');
    slots.push(`${hh}:${mm}`);
  }
  return slots;
}

/** "14:30" -> "2:30 PM" for display. */
export function fmtTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const ap = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, '0')} ${ap}`;
}

export function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

export function isValidPhone(v) {
  const digits = v.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
