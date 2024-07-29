import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

  const token = request.cookies.get('token')?.value || ''

  // trying to access public path and you have a login token
  if (isPublicPath && token != '') {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
  // trying to access a private path ie: profile with no login token
  if (!isPublicPath && token == '') {
    return NextResponse.redirect(new URL("/signup", request.nextUrl))
  }
}

export const config = {
  matcher: [
    // '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}