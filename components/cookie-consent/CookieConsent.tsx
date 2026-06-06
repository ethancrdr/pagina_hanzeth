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
      className={`fixed left-3 right-3 bottom-3 z-[120] bg-band text-text-onBand border border-border-onBand rounded-lg shadow-lg p-5 flex flex-col gap-4 transition-transform duration-300 ease-out md:left-auto md:right-5 md:bottom-5 md:max-w-[440px] md:flex-row md:items-center ${
        visible ? 'translate-y-0' : 'translate-y-[140%]'
      }`}
      role="dialog"
      aria-live="polite"
      aria-label="Consentimiento de cookies"
    >
      <div className="md:flex-1">
        <p className="text-[0.88rem] text-text-mutedOnBand">
          <b className="text-text-onBand">Usamos cookies.</b> Para medir y mejorar tu experiencia. Lee
          nuestra <a href="#" className="text-accent-soft">política de privacidad</a>.
        </p>
      </div>
      <div className="flex gap-3 md:flex-none">
        <button
          type="button"
          onClick={() => consent('essential')}
          className="flex-1 md:flex-none min-h-[46px] text-[0.92rem] font-semibold rounded-pill border-[1.5px] border-white/40 bg-transparent text-text-onBand px-4 transition-colors duration-150 hover:bg-white/[0.07] cursor-pointer"
        >
          Solo esenciales
        </button>
        <button
          type="button"
          onClick={() => consent('all')}
          className="flex-1 md:flex-none min-h-[46px] text-[0.92rem] font-semibold rounded-pill bg-accent text-white border-0 px-4 cursor-pointer transition-colors duration-150 hover:bg-accent-press"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
