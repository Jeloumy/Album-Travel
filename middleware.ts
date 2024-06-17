import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error('AUTH_SECRET environment variable is not defined');
  }

  const token = await getToken({ req, secret });

  const isAuthPage = req.nextUrl.pathname === '/login';
  const isProtectedPage = !['/login', '/register', '/api/auth', '/api/register'].includes(req.nextUrl.pathname);

  console.log(`Token: ${token}`);
  console.log(`isAuthPage: ${isAuthPage}`);
  console.log(`isProtectedPage: ${isProtectedPage}`);

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
