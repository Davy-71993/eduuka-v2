import { createClient } from "@/lib/supabase/middleware"
import { NextRequest, NextResponse } from "next/server"

export const authMiddleware = async(request: NextRequest) => {
    const { supabase } = createClient(request)
    const { data, error } = await supabase.auth.getUser()

    const currentUser = data.user

    if(currentUser && request.nextUrl.pathname.startsWith('/sign')){
        return NextResponse.redirect(new URL('/me', request.url))
    }
    
    if (!currentUser && !request.nextUrl.pathname.startsWith('/signin')) {
        const next = new URL(request.nextUrl).pathname
        return NextResponse.redirect(new URL(`/signin?next=${next}`, request.url))
    }

    return NextResponse.next()
}

