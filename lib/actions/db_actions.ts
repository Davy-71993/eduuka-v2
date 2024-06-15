"use server"

import { cookies } from "next/headers"
import { createClient } from "../supabase/server"
import { Category } from "../types"

export const getCategories =  async() => {
    const supabase = createClient(cookies())

    const { data, error } = await supabase.from('categories').select('name, id, slug, sub_categories(id, name, slug)')
    if(error){
        console.log(error)
        return []
    }

    return data as unknown as Category[]
}