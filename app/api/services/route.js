import { NextResponse } from 'next/server';
import { SERVICES } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    shop: 'The Art of Perfection Barbershop — concept demo',
    currency: 'USD',
    services: SERVICES.map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      categoryLabel: s.categoryLabel,
      price: s.price,
      durationMin: s.durationMin,
      includes: s.includes,
    })),
  });
}
