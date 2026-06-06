'use client';

import { trackEvent } from '@/lib/analytics/events';

export function HeroCTA({
  intent,
  className,
  children,
}: {
  intent: 'health' | 'business';
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className={className}
      href={`?intent=${intent}#quiz`}
      data-cta={intent}
      onClick={() => trackEvent('cta_hero_click', { cta: intent })}
    >
      {children}
    </a>
  );
}
