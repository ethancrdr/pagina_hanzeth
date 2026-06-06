type EventData = Record<string, unknown>;

const PIXEL_EVENT_MAP: Record<string, string> = {
  cta_hero_click: 'Lead',
  quiz_step_complete: 'CustomEvent',
  quiz_complete: 'Lead',
  whatsapp_click: 'Contact',
  fourlife_click: 'InitiateCheckout',
};

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[] };
    _fbq?: unknown;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, data?: EventData): void {
  if (typeof window === 'undefined') return;

  const fbq = window.fbq;
  if (typeof fbq === 'function') {
    const pixelEvent = PIXEL_EVENT_MAP[name];
    if (pixelEvent) fbq('track', pixelEvent, data ?? {});
  }

  const gtag = window.gtag;
  if (typeof gtag === 'function') {
    gtag('event', name, data ?? {});
  }
}
