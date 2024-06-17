import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('Checking session token...');
  const sessionCookie = req.cookies.get('authjs.session-token') || req.cookies.get('__Secure-next-auth.session-token');

  const isAuthPage = req.nextUrl.pathname === '/login';
  const isProtectedPage = !['/login', '/register', '/api/auth', '/api/register'].includes(req.nextUrl.pathname);

  console.log(`Session Cookie: ${sessionCookie}`);
  console.log(`isAuthPage: ${isAuthPage}`);
  console.log(`isProtectedPage: ${isProtectedPage}`);

  if (isAuthPage && sessionCookie) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  if (isProtectedPage && !sessionCookie) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
