'use client';

import { useEffect, useState } from 'react';
import { loadAnalyticsIfConsented } from '@/lib/analytics/load';

const STORAGE_KEY = 'hc_cookie_consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let already: string | null = null;
    try {
      already = localStorage.getItem(STORAGE_KEY);
    } catch {
      already = null;
    }
    if (already) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setVisible(true), reduce ? 0 : 900);
    return () => clearTimeout(t);
  }, []);

  function consent(value: 'all' | 'essential') {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setVisible(false);
    if (value === 'all') {
      loadAnalyticsIfConsented();
    }
  }

  return (
    <div
      className={`fixed left-0 right-0 bottom-0 z-[120] bg-surface border-t border-border transition-transform duration-300 ease-out ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="dialog"
      aria-live="polite"
      aria-label="Consentimiento de cookies"
    >
      <div className="wrap py-4 md:py-5 flex flex-col md:flex-row md:items-center gap-4">
        <p className="text-small text-text-muted md:flex-1">
          <span className="text-text font-medium">Usamos cookies</span>
          {' '}para medir y mejorar tu experiencia.{' '}
          <a href="#" className="underline underline-offset-4 hover:text-text">Política de privacidad</a>.
        </p>
        <div className="flex gap-6 md:gap-5 md:flex-none">
          <button
            type="button"
            onClick={() => consent('essential')}
            className="font-sans text-small text-text-muted hover:text-text transition-colors"
          >
            Solo esenciales
          </button>
          <button
            type="button"
            onClick={() => consent('all')}
            className="font-sans text-small text-text hover:text-accent transition-colors font-medium"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
