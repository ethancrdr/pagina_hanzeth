'use client';

import { useEffect, useState } from 'react';
import { buildWhatsAppUrl } from '@/lib/geo';
import { trackEvent } from '@/lib/analytics/events';

const QUIZ_DONE_KEY = 'hc_quiz_done';
const DEFAULT_MESSAGE = 'Hola Hanzeth, vengo de tu web.';

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(QUIZ_DONE_KEY) === '1') {
        setVisible(true);
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <a
      href={buildWhatsAppUrl(DEFAULT_MESSAGE)}
      target="_blank"
      rel="noopener"
      aria-label="Escríbele a Hanzeth por WhatsApp"
      onClick={() => {
        try {
          localStorage.setItem(QUIZ_DONE_KEY, '1');
        } catch {
          // ignore
        }
        trackEvent('whatsapp_click', { source: 'floating_button' });
      }}
      className={`fixed right-4 bottom-4 z-[110] w-[58px] h-[58px] md:w-[62px] md:h-[62px] rounded-full bg-[#25D366] border-0 cursor-pointer flex items-center justify-center text-decoration-none shadow-[0_10px_28px_rgba(37,211,102,0.45)] transition-all duration-300 ease-out ${
        visible
          ? 'opacity-100 pointer-events-auto scale-100'
          : 'opacity-0 pointer-events-none scale-[0.6] translate-y-2.5'
      }`}
      style={
        visible
          ? { animation: 'waPulse 2.4s cubic-bezier(.2,.7,.2,1) 1s infinite' }
          : undefined
      }
    >
      <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] fill-white" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.42 1.32-1.95 1.36-.5.04-.96.23-3.27-.68-2.76-1.09-4.5-3.92-4.64-4.1-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.27.24-.27.53-.34.71-.34.18 0 .35 0 .51.01.16.01.39-.06.6.46.24.58.81 2 .88 2.14.07.14.12.31.02.49-.09.18-.14.29-.27.45-.14.16-.29.36-.41.48-.14.14-.28.29-.12.56.16.27.72 1.18 1.55 1.91 1.06.95 1.96 1.24 2.23 1.38.27.14.43.12.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.23.6-.14.25.09 1.57.74 1.84.88.27.14.45.2.51.31.07.12.07.66-.17 1.34Z" />
      </svg>
      <style jsx>{`
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 10px 28px rgba(37,211,102,0.45); }
          50% { box-shadow: 0 10px 28px rgba(37,211,102,0.45), 0 0 0 12px rgba(37,211,102,0.12); }
        }
        @media (prefers-reduced-motion: reduce) {
          a { animation: none !important; }
        }
      `}</style>
    </a>
  );
}
