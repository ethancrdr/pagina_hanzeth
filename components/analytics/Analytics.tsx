'use client';

import { useEffect } from 'react';
import { loadAnalyticsIfConsented } from '@/lib/analytics/load';

export function Analytics() {
  useEffect(() => {
    loadAnalyticsIfConsented();
  }, []);
  return null;
}
