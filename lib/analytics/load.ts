export function loadAnalyticsIfConsented(): void {
  if (typeof window === 'undefined') return;
  try {
    if (localStorage.getItem('hc_cookie_consent') !== 'all') return;
  } catch {
    return;
  }
  loadMetaPixel();
  loadGA4();
}

function loadMetaPixel(): void {
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!id) return;
  if (window.fbq) return;

  type FbqFn = ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[][];
  };

  const fbq: FbqFn = Object.assign(
    function (...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    },
    { queue: [] as unknown[][] },
  );

  window.fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  fbq('init', id);
  fbq('track', 'PageView');
}

function loadGA4(): void {
  const id = process.env.NEXT_PUBLIC_GA4_ID;
  if (!id) return;
  if (window.gtag) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    (window.dataLayer as unknown[]).push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', id);
}
