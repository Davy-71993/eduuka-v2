"use server"

import { cookies } from "next/headers"

export const setLocation = async(data: any) => {
    const cookieStore = cookies()
    cookieStore.set('geo', JSON.stringify(data))
}