export type Answers = {
  priority: 'health' | 'income' | 'time' | null;
  time: '1-5' | '5-10' | '10+' | null;
  interest: '1' | '2' | '3' | '4' | '5' | null;
  name: string;
  email: string;
  cc: string;
  phone: string;
};

export type Profile = 'cliente' | 'emprendedor';

export function routeQuiz(answers: Pick<Answers, 'priority' | 'interest'>): Profile {
  const interest = parseInt(answers.interest ?? '0', 10);
  const leansBusiness =
    answers.priority === 'income' ||
    answers.priority === 'time' ||
    (Number.isFinite(interest) && interest >= 4);
  return leansBusiness ? 'emprendedor' : 'cliente';
}

export function buildWhatsAppMessage(answers: Answers): string {
  const interest = parseInt(answers.interest ?? '0', 10);
  const profile = routeQuiz(answers);
  const intent =
    profile === 'emprendedor'
      ? 'la oportunidad de negocio con SEN'
      : 'mejorar mi salud con 4Life';
  return [
    `Hola Hanzeth, soy ${answers.name || '—'}.`,
    `Vengo de tu web y me interesa ${intent}.`,
    `(Prioridad: ${answers.priority ?? '-'}, Tiempo/sem: ${answers.time ?? '-'}, Interés: ${Number.isFinite(interest) ? interest : '-'}/5)`,
  ].join(' ');
}

export const ccToCountry: Record<string, string> = {
  '1': 'US',
  '57': 'CO',
  '34': 'ES',
  '506': 'CR',
};

export function countryFromCC(cc: string): string {
  return ccToCountry[cc] ?? 'DEFAULT';
}
