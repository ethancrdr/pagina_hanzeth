import 'next/server';

declare module 'next/server' {
  interface NextRequest {
    geo?: {
      city?: string;
      country?: string;
      countryRegion?: string;
      region?: string;
      latitude?: string;
      longitude?: string;
    };
  }
}
