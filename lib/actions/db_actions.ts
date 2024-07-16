"use server"

import { cookies } from "next/headers"
import { createClient } from "../supabase/server"
import { Ad, AdImage, Category, Profile, Store, SubCategory } from "../types"
import { numberOrUndefine } from "../utils"


// Category and SubCategory actions
export const getCategories =  async(fields='name, id, slug, image, sub_categories(id, name, slug)') => {
    const supabase = createClient(cookies())

    const { data, error } = await supabase.from('categories').select(fields)
    if(error) throw error.message;

    return data as Category[]
}


export const getCategoryByIDOrSlug = async(idOrSlug:string, fields = 'name, id, slug, sub_categories(id, name, image, slug)') => {
    const supabase = createClient(cookies())
    let query = supabase.from('categories').select(fields)
    Number.isNaN(parseInt(idOrSlug))
    ? query = query.eq('slug', idOrSlug)
    : query = query.eq('id', idOrSlug)

    const { data, error } = await query.single()
    if(error) throw error.message;
    return data as Category
}

export const getSubCategory =  async(idOrSlug:string, fields='id, name, slug, image, categories(name, slug, image)') => {
    const supabase = createClient(cookies())
    let query = supabase.from('sub_categories').select(fields)
    Number.isNaN(parseInt(idOrSlug))
    ? query = query.eq('slug', idOrSlug)
    : query = query.eq('id', idOrSlug)

    const { data, error } = await query.single()
    if(error) throw error.message;
    return data as SubCategory
}


// Profile actions
export const updateProfile = async(profile: Profile) => {
    const supabase = createClient(cookies())
    const {data, error } = await supabase.from('profiles').upsert(profile).select()
    if(error) throw error.message;
    return data as Profile
}

export const getProfile = async() => {
    
    const supabase = createClient(cookies())
    const { data:{ user } } = await supabase.auth.getUser()
    const { data, error} = await supabase.from('profiles').select('*').eq('id', user?.id).single()
    if(error) throw error.message
    return data as unknown as Profile
}


// Storage actions
export const uploadFile = async(bucket: string, file: File, path: string) => {
    const supabase = createClient(cookies())
    console.log('here')
    const { data, error } = await supabase
        .storage
        .from(bucket)
        .upload(path, file, {
            cacheControl: '3600',
            upsert: true
        })

    if(error) throw error.message

    return data
}

export const updateFile = async(bucket: string, newFile: File, path: string) => {
    const supabase = createClient(cookies())
    const { data, error } = await supabase
        .storage
        .from(bucket)
        .upload(path, newFile, {
            cacheControl: '3600',
            upsert: true
        })

    if(error) throw error.message

    return data
}


// Image actions
export const createAdImage = async(image: AdImage) => {
    const supabase = createClient(cookies())

    const { data, error } = await supabase.from('ad_images').insert(image).select()
    if (error) {
        throw new Error(error.message)
    }

    return data as AdImage[]
}


// Ads actions
export const uploadAd = async(adData: Ad) => {
    const supabase = createClient(cookies())

    const { data, error } = await supabase.from('ads').insert(adData).select('id, name, price, ad_images(url)').single()
    if(error) throw error.message;

    return data as Ad
}

export const fetchAds = async(fields?:string) => {
    const supabase = createClient(cookies())
    const { data, error } = await supabase.from('ads').select(fields ?? 'id, price, name, ad_images(url)')
            
    if(error) throw error.message
                                        
    return data as Ad[]

}

export const getAdByID = async(id: string) => {
    const supabase = createClient(cookies())
    const { data, error } = await supabase.from('ads').select('*').eq('id', id)

    if(error) return null
    return data as Ad
}

export const getSimilarAds = async(ad: Ad | null) => {
    // Later edit this to return only similar ads to the one provided.
    return fetchAds()
}

export const updateAds = async(ads:Ad[]) => {
    const supabase = createClient(cookies())
    const { data, error } = await supabase.from('ads').upsert(ads).select()

    if(error) return `An error occured: ${error.message}`;
    return data as Ad[]
}

export const fetchNearbyAds = async(
    limit:number, lat:number, long:number, 
    q?: string, mxp?: string, mnp?: string, 
    dist?:string, ordby?: string, cat?: string, subCat?: string) => {
    const supabase = createClient(cookies())
    let query = supabase.rpc('get_nearby_ads', {
        lat,
        long,
    })
    if(q){
        query = query.or(`name.ilike.%${q}%, description.ilike.%${q}%`)
    }
    const min_price = numberOrUndefine(mnp)
    const max_price = numberOrUndefine(mxp)
    const mxd = numberOrUndefine(dist)
    const c_id = numberOrUndefine(cat)
    const sc_id = numberOrUndefine(subCat)

    if(min_price){
        console.log("Min Price", min_price)
        query = query.or(`price.gte.${min_price}`)
    }
    if(max_price){
        console.log("Max Price", max_price)
        query = query.or(`price.lte.${max_price}`)
    }
    if(mxd){
        query = query.lte('dist_meters', mxd)
    }
    !['price', 'dist_meters', undefined].includes(ordby) ? ordby = undefined : ordby = ordby
    if(ordby){
        query = query.order(ordby,{
            ascending: true,
            nullsFirst: false
        })
    }
    if(c_id){
        query = query.eq('category_id', c_id)
    }
    if(sc_id){
        query = query.eq('sub_category_id', sc_id)
    }
    query = query.limit(limit)
    const { data, error } = await query
    
    if(error){
        console.log(error.message)
        return []
    }
    return data as Ad[]

}


// Location actions
export const insertLocations = async(locations: { ad_id: string, geo: string }[]) => {
    const supabase = createClient(cookies())

    const { data, error } = await supabase.from('locations').insert(locations).select()
    if(error) throw error.message;
    return data as { ad_id: string, geo: string }[]
}


// Store actions
export const fetchStores = async(fields = 'id, name, logo, description, location') => {
    const supabase = createClient(cookies())
    const { data, error } = await supabase.from('stores').select(fields)
    if(error) return [];
    return data as Store[]
}

export const fetchStoreByID = async(id: string) => {
    const supabase = createClient(cookies())
    const { data, error } = await supabase.from('stores').select('*').eq('id', id)

    if(error) return null
    return data as Store
}
