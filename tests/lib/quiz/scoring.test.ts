import { describe, it, expect } from 'vitest';
import {
  routeQuiz,
  buildWhatsAppMessage,
  countryFromCC,
  type Answers,
} from '@/lib/quiz/scoring';

const baseAnswers: Answers = {
  priority: null,
  time: null,
  interest: null,
  name: '',
  email: '',
  cc: '1',
  phone: '',
};

describe('routeQuiz', () => {
  it('routes to cliente when priority is health', () => {
    expect(routeQuiz({ ...baseAnswers, priority: 'health' })).toBe('cliente');
  });

  it('routes to emprendedor when priority is income', () => {
    expect(routeQuiz({ ...baseAnswers, priority: 'income' })).toBe('emprendedor');
  });

  it('routes to emprendedor when priority is time', () => {
    expect(routeQuiz({ ...baseAnswers, priority: 'time' })).toBe('emprendedor');
  });

  it('routes to emprendedor when interest is 4 even with health priority', () => {
    expect(routeQuiz({ ...baseAnswers, priority: 'health', interest: '4' })).toBe('emprendedor');
  });

  it('routes to emprendedor when interest is 5 with health priority', () => {
    expect(routeQuiz({ ...baseAnswers, priority: 'health', interest: '5' })).toBe('emprendedor');
  });

  it('routes to cliente when health and interest is 3', () => {
    expect(routeQuiz({ ...baseAnswers, priority: 'health', interest: '3' })).toBe('cliente');
  });

  it('treats null interest as 0', () => {
    expect(routeQuiz({ ...baseAnswers, priority: 'health', interest: null })).toBe('cliente');
  });
});

describe('buildWhatsAppMessage', () => {
  it('mentions the business opportunity for emprendedor profile', () => {
    const msg = buildWhatsAppMessage({
      ...baseAnswers,
      name: 'Maria',
      priority: 'income',
      time: '5-10',
      interest: '4',
    });
    expect(msg).toContain('Maria');
    expect(msg).toContain('oportunidad de negocio con SEN');
    expect(msg).toContain('income');
    expect(msg).toContain('5-10');
    expect(msg).toContain('4/5');
  });

  it('mentions 4Life for cliente profile', () => {
    const msg = buildWhatsAppMessage({
      ...baseAnswers,
      name: 'Juan',
      priority: 'health',
      time: '1-5',
      interest: '2',
    });
    expect(msg).toContain('mejorar mi salud con 4Life');
  });

  it('handles empty name gracefully', () => {
    const msg = buildWhatsAppMessage({ ...baseAnswers, priority: 'health' });
    expect(msg).toContain('—');
  });
});

describe('countryFromCC', () => {
  it('maps US (+1), CO (+57), ES (+34), CR (+506)', () => {
    expect(countryFromCC('1')).toBe('US');
    expect(countryFromCC('57')).toBe('CO');
    expect(countryFromCC('34')).toBe('ES');
    expect(countryFromCC('506')).toBe('CR');
  });

  it('falls back to DEFAULT for unknown codes', () => {
    expect(countryFromCC('999')).toBe('DEFAULT');
    expect(countryFromCC('')).toBe('DEFAULT');
  });
});
