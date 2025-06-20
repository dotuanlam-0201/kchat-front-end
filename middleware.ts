import { NextRequest, NextResponse } from 'next/server'

const publicRoutes = ['/login', '/signup']

export function middleware(req: NextRequest) {
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next()
  }
  const accessToken = req.cookies.get("accessToken")?.value
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}