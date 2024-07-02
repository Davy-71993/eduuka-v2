import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from './middlewares'
 
export default async function middleware(request: NextRequest) {
    return authMiddleware(request)

}
 
export const config = {
  matcher: ['/me/:path*', '/admin/:path*'],

}