import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { routeQuiz, countryFromCC } from '@/lib/quiz/scoring';
import { getFourLifeUrl, buildWhatsAppUrl } from '@/lib/geo';
import { appendLeadRow, sheetsReady } from '@/lib/integrations/sheets';
import { sendLeadNotification, emailReady } from '@/lib/integrations/email';

export const runtime = 'nodejs';

const leadSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  cc: z.string().min(1),
  phone: z.string().trim().min(6),
  priority: z.enum(['health', 'income', 'time']),
  time: z.enum(['1-5', '5-10', '10+']),
  interest: z.enum(['1', '2', '3', '4', '5']),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON' },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Invalid data', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const headerCountry = req.headers.get('x-visitor-country') ?? 'XX';
  const country = headerCountry !== 'XX' ? headerCountry : countryFromCC(data.cc);
  const profile = routeQuiz({ priority: data.priority, interest: data.interest });
  const whatsapp = `+${data.cc} ${data.phone}`;

  const persistence = Promise.allSettled([
    sheetsReady()
      ? appendLeadRow([
          new Date().toISOString(),
          data.name,
          data.email,
          whatsapp,
          country,
          profile,
          data.priority,
          data.time,
          data.interest,
        ])
      : Promise.reject(new Error('sheets-not-configured')),
    emailReady()
      ? sendLeadNotification({
          name: data.name,
          email: data.email,
          whatsapp,
          country,
          profile,
          priority: data.priority,
          timePerWeek: data.time,
          interest: data.interest,
        })
      : Promise.reject(new Error('email-not-configured')),
  ]);

  const results = await persistence;
  const failures = results.filter((r) => r.status === 'rejected');
  if (failures.length > 0) {
    console.error('[/api/lead] persistence failures', failures.map((f) => (f as PromiseRejectedResult).reason));
  }

  const redirect =
    profile === 'emprendedor'
      ? buildWhatsAppUrl(
          `Hola Hanzeth, soy ${data.name}. Vengo de tu web y me interesa la oportunidad de negocio con SEN. (Prioridad: ${data.priority}, Tiempo/sem: ${data.time}, Interés: ${data.interest}/5)`,
        )
      : getFourLifeUrl(country);

  return NextResponse.json({ ok: true, profile, country, redirect });
}
