import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getFourLifeUrl, buildWhatsAppUrl, WHATSAPP_NUMBER } from '@/lib/geo';

describe('getFourLifeUrl', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.NEXT_PUBLIC_FOURLIFE_URL_US = 'https://us.4life.com/HANZETH';
    process.env.NEXT_PUBLIC_FOURLIFE_URL_CO = 'https://co.4life.com/HANZETH';
    process.env.NEXT_PUBLIC_FOURLIFE_URL_ES = 'https://es.4life.com/HANZETH';
    process.env.NEXT_PUBLIC_FOURLIFE_URL_CR = 'https://cr.4life.com/HANZETH';
    process.env.NEXT_PUBLIC_FOURLIFE_URL_DEFAULT = 'https://www.4life.com/HANZETH';
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('returns the country-specific URL when given a known country', () => {
    expect(getFourLifeUrl('US')).toBe('https://us.4life.com/HANZETH');
    expect(getFourLifeUrl('CO')).toBe('https://co.4life.com/HANZETH');
  });

  it('falls back to DEFAULT for null/undefined', () => {
    expect(getFourLifeUrl(null)).toBe('https://www.4life.com/HANZETH');
    expect(getFourLifeUrl(undefined)).toBe('https://www.4life.com/HANZETH');
  });

  it('falls back to DEFAULT for unknown country codes', () => {
    expect(getFourLifeUrl('XX')).toBe('https://www.4life.com/HANZETH');
  });
});

describe('buildWhatsAppUrl', () => {
  it('encodes the message and uses wa.me', () => {
    const url = buildWhatsAppUrl('Hola mundo');
    expect(url).toBe(`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20mundo`);
  });

  it('encodes special characters', () => {
    const url = buildWhatsAppUrl('Hola & adios / 100%');
    expect(url).toContain('Hola%20%26%20adios%20%2F%20100%25');
  });
});
