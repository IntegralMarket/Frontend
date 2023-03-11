import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL(`${request.url}/profile`, request.url))
}

export const config = {
  matcher: ['/producers/:path', '/traders/:path', '/providers/:path', '/buyers/:path'],
}