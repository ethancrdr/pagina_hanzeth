import { Resend } from 'resend';

export type LeadNotification = {
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  profile: string;
  priority: string;
  timePerWeek: string;
  interest: string;
};

function isConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.HANZETH_NOTIFY_EMAIL);
}

export async function sendLeadNotification(lead: LeadNotification): Promise<void> {
  if (!isConfigured()) {
    throw new Error('Resend credentials are not configured');
  }

  const resend = new Resend(process.env.RESEND_API_KEY!);
  const to = process.env.HANZETH_NOTIFY_EMAIL!;

  await resend.emails.send({
    from: 'Hanzeth Landing <onboarding@resend.dev>',
    to,
    subject: `Nuevo lead: ${lead.name} (${lead.profile})`,
    html: `
      <h2>Nuevo lead desde la landing</h2>
      <ul>
        <li><b>Nombre:</b> ${escapeHtml(lead.name)}</li>
        <li><b>Email:</b> ${escapeHtml(lead.email)}</li>
        <li><b>WhatsApp:</b> ${escapeHtml(lead.whatsapp)}</li>
        <li><b>País (geo):</b> ${escapeHtml(lead.country)}</li>
        <li><b>Perfil:</b> ${escapeHtml(lead.profile)}</li>
        <li><b>Prioridad:</b> ${escapeHtml(lead.priority)}</li>
        <li><b>Tiempo/sem:</b> ${escapeHtml(lead.timePerWeek)}</li>
        <li><b>Interés (1-5):</b> ${escapeHtml(lead.interest)}</li>
      </ul>
    `,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const emailReady = isConfigured;
