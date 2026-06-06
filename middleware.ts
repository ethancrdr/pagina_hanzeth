import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);

  const isDev = process.env.NODE_ENV !== 'production';

  const devOverride = isDev
    ? (req.nextUrl.searchParams.get('country') ?? process.env.DEV_VISITOR_COUNTRY)
    : undefined;

  const country = devOverride ?? req.geo?.country ?? 'XX';

  requestHeaders.set('x-visitor-country', country);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)',
  ],
};
