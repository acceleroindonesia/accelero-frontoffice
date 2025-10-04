import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session =
    request.cookies.get('next-auth.session-token') ||
    request.cookies.get('__Secure-next-auth.session-token');
  const { pathname } = request.nextUrl;

  // If not logged in and accessing protected route.ts
  if (pathname.startsWith('/members') && !pathname.includes('sign') && !session) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // If logged in and trying to access sign-in page
  if (pathname.includes('sign') && session) {
    const url = request.nextUrl.clone();
    url.pathname = '/members/account';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/members/:path*'],
};
