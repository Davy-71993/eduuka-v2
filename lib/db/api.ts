import { SupabaseClient } from "@supabase/supabase-js"
import { Ad, Category, Store } from "../types"
import { fetchManyWithoutFilters, fetchOne } from "./utils"

export const fetchCategories = async(supabaseClient: SupabaseClient, fields?: string) => {
    return await fetchManyWithoutFilters(supabaseClient, 'categories', fields ?? 'name, slug, sub_categories(name, slug)') as unknown as Category[]
}

export const fetchCategoryByIDOrSlug = async(supabaseClient: SupabaseClient, value: string, idOrSlug?: string, fields?: string) => {
    return await fetchOne(supabaseClient, 'categories', fields??'slug, name, sub_categories(name, image, slug)', idOrSlug??'slug', value) as unknown as Category
}

export const fetchAds = async(supabase: SupabaseClient, fields?:string) => {
    return await fetchManyWithoutFilters(supabase, 'ads', fields ?? 'id, price, name, address, ad_images(url)') as unknown as Ad[]
}

export const fetchAdByID = async(supabase: SupabaseClient, id: string) => {
    const ad = await fetchOne(supabase, 'ads', 'id, name, ad_details, price, description, address, location, seller_id, ad_images(url), profiles(id, first_name, last_name, image)', 'id', id)
    if(!ad){
        console.log("An error ocured while fetching the ad")
        return null
    }
    return ad as unknown as Ad
}

export const fetchStoreByID = async(supabase: SupabaseClient, id: string) => {
    const store = await fetchOne(supabase, 'stores', 'id, name, logo, description, location', 'id', id)
    if(!store){
        console.log("An error ocured while fetching the store")
        return null
    }
    return store as unknown as Store
}

export const fetchStores = async(supabase: SupabaseClient, fileds?: string) =>{
    return await fetchManyWithoutFilters(supabase, 'stores',  fileds?? 'id, name, logo, description, location') as unknown as Store[]
}