import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirect all non-homepage requests to the homepage
  // which will show the redirect message and then redirect to the new site
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// Apply middleware to all routes except API routes and static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
