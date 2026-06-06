import { describe, it, expect } from 'vitest';
import { leadFormSchema } from '@/lib/quiz/validation';

describe('leadFormSchema', () => {
  it('accepts a valid submission', () => {
    const result = leadFormSchema.safeParse({
      name: 'Maria Lopez',
      email: 'maria@example.com',
      cc: '57',
      phone: '3001234567',
    });
    expect(result.success).toBe(true);
  });

  it('rejects short names', () => {
    const result = leadFormSchema.safeParse({
      name: 'M',
      email: 'maria@example.com',
      cc: '57',
      phone: '3001234567',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'name')).toBe(true);
    }
  });

  it('rejects invalid emails', () => {
    const result = leadFormSchema.safeParse({
      name: 'Maria',
      email: 'not-an-email',
      cc: '57',
      phone: '3001234567',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'email')).toBe(true);
    }
  });

  it('rejects short phone numbers', () => {
    const result = leadFormSchema.safeParse({
      name: 'Maria',
      email: 'maria@example.com',
      cc: '57',
      phone: '123',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'phone')).toBe(true);
    }
  });

  it('accepts phones with formatting characters', () => {
    const result = leadFormSchema.safeParse({
      name: 'Maria',
      email: 'maria@example.com',
      cc: '1',
      phone: '(555) 123-4567',
    });
    expect(result.success).toBe(true);
  });

  it('rejects phones with letters', () => {
    const result = leadFormSchema.safeParse({
      name: 'Maria',
      email: 'maria@example.com',
      cc: '1',
      phone: '555-abc-1234',
    });
    expect(result.success).toBe(false);
  });

  it('trims whitespace before validation', () => {
    const result = leadFormSchema.safeParse({
      name: '  Maria  ',
      email: '  maria@example.com  ',
      cc: '57',
      phone: '  3001234567  ',
    });
    expect(result.success).toBe(true);
  });
});
