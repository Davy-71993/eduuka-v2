"use server"

import { cookies } from "next/headers"
import { createClient } from "../supabase/server"
import { Ad, AdImage, Category, MenuItem, Message, Profile, Store, SubCategory } from "../types"
import { numberOrUndefine } from "../utils"


// Category and SubCategory actions
export const getCategories =  async(fields='name, id, slug, ads(count), sub_categories(id, name, slug)') => {
    const supabase = createClient(cookies())

    const { data, error } = await supabase.from('categories').select(fields)
    if(error) throw error.message;

    return data as Category[]
}

export const getCategoryByIDOrSlug = async(idOrSlug:string, fields = 'name, id, slug, sub_categories(id, name, slug, ads(count))') => {
    const supabase = createClient(cookies())
    let query = supabase.from('categories').select(fields)
    Number.isNaN(parseInt(idOrSlug))
    ? query = query.eq('slug', idOrSlug)
    : query = query.eq('id', idOrSlug)

    const { data, error } = await query.single()
    if(error) throw error.message;
    return data as Category
}

export const getSubCategory =  async(idOrSlug:string, fields='id, name, slug, categories(name, slug)') => {
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

export const getProfile = async(id?: string) => {
    const supabase = createClient(cookies())
    let profile_id = id
    if(!profile_id){
        const { data:{ user } } = await supabase.auth.getUser()
        profile_id = user?.id

    }
    if(!profile_id){
        console.log("Could not fetch profile because no id was specified")
        return
    }

    const { data, error} = await supabase.from('profiles').select('*').eq('id', profile_id).single()
    if(error){
        console.log("Could not fetch profile because no id was specified")
        return
    }
    return data as unknown as Profile
}

export const getUsername = async(id: string) => {
    const supabase = createClient(cookies())
    const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', id)
        .single()

    if(error){
        console.log("An error occured while fetching profile image.", error.message)
        return
    }

    return data.username as string
}



// Storage actions
export const uploadFile = async(bucket: string, file: File, path: string) => {
    const supabase = createClient(cookies())
    
    const { data, error } = await supabase
        .storage
        .from(bucket)
        .upload(path, file, {
            cacheControl: '3600',
            upsert: true
        })

    if(error){
        console.log("An error occured while uploading file.", error.message)
        return
    }

    return data.path
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

    const { data, error } = await supabase.from('ad_images').insert(image).select().single()
    if (error) {
        console.log(error.message)
        return null
    }

    return data as AdImage
}


// Ads actions

export const getUserAds = async() => {
    const supabase = createClient(cookies())
    const { data, error } = await supabase
        .from('user_ads')
        .select('*')
        .is('trashed_at', null)
    if(error){
        console.log("An error occured while fetching user ads. ", error.message)
        return []
    }

    return data as Ad[]
}

export const getAdByID = async(id: string) => {
    const supabase = createClient(cookies())
    const { data, error } = await supabase
        .from('ads')
        .select('*, profiles(first_name, last_name, image, phone), ad_images(url, deleted_at), menu_items(id, item, price), categories(id, name), sub_categories(id, name, category_id)')
        .eq('id', id)
        .is('trashed_at', null)
        .single()

    if(error) return
    return data as Ad
}

export const getStoreAds = async(storeID: string) => {
    const supabase = createClient(cookies())
    const { data, error } = await supabase
        .from('ads_with_image_url')
        .select('*')
        .is('trashed_at', null)
        .eq('store_id', storeID)
    if(error){
        console.log("An error occured while fetching store ads. ", error.message)
        return []
    }

    return data as Ad[]
}

export const getSimilarAds = async(lat: number, long: number, ad_id?:string, cat_id?: number, sub_cat_id?: string) => {
    
    const supabase = createClient(cookies())
    let query = supabase
        .rpc('get_nearby_ads', { lat, long, })
        .neq('id', ad_id)
        .is('trashed_at', null)
    if(cat_id){
        query = query.or(`category_id.eq.${cat_id}`)
    }
    if(sub_cat_id){
        query = query.or(`sub_category_id.eq.${sub_cat_id}`)
    }
    
    const { data, error } = await query
    if(error){
        console.log("An error coured while fetching similar ads. ", error.message)
        return []
    }
    return data as Ad[]
}

export const updateAds = async(ads:Ad[]) => {
    const supabase = createClient(cookies())
    const { data, error } = await supabase.from('ads').upsert(ads).select()

    if(error) return `An error occured: ${error.message}`;
    return data as Ad[]
}

export const fetchNearbyAds = async(lat?:number, long?:number, filters?: any) => {
    const supabase = createClient(cookies())

    let query;
    if(lat && long){
        query = supabase
            .rpc('get_nearby_ads', {
                lat,
                long,
            })
            .is('trashed_at', null)
    }else{
        query = supabase
            .from('ads_with_image_url')
            .select('*')
            .is('trashed_at', null)
    }

    if(filters){
        if(filters.qt){
            query = query.or(`name.ilike.%${filters.qt}%, description.ilike.%${filters.qt}%`)
        }
        const min_price = numberOrUndefine(filters.mnp)
        const max_price = numberOrUndefine(filters.mxp)
        const mxd = numberOrUndefine(filters.dist)
        const cid = numberOrUndefine(filters.cid)
        const scid = numberOrUndefine(filters.scid)
    
        if(min_price){
            query = query.or(`price.gte.${min_price}`)
        }
        if(max_price){
            query = query.or(`price.lte.${max_price}`)
        }
        if(mxd){
            query = query.lte('dist_meters', mxd)
        }
        let ordby;
        !['price', 'dist_meters', undefined].includes(filters.ordby) ? ordby = undefined : ordby = filters.ordby
        if(ordby){
            query = query.order(ordby,{
                ascending: true,
                nullsFirst: false
            })
        }
        if(cid){
            query = query.eq('category_id', cid)
        }
        if(scid){
            query = query.eq('sub_category_id', scid)
        }
    }

    query = query.limit(45)
    const { data, error } = await query
    
    if(error){
        console.log(error.message)
        return []
    }
    
    return data as Ad[]

}

export const getAdImage = async(ad_id: string) => {
    const supabase = createClient(cookies())
    const { data, error } = await supabase
        .rpc('get_image_url', {
            ad_id: ad_id
        })

    if(error){
        console.log("Error fetching the ad image url. ", error.message)
        return
    }

    return data as string
}

export const fetchMenuItems = async(ad_id: string) => {
    const supabase = createClient(cookies())
    const { data, error } = await supabase.from('menu_items').select('item, price').eq('ad_id', ad_id)
    if(error){
        console.log("Error fetching menu items")
        return []
    }
    return data as MenuItem[]
}

export const uploadAd = async(ad: Ad) => {
    const { menu_items, ...restAd} = ad
    const supabase = createClient(cookies())

    const { data, error } = await supabase.from('ads').insert(restAd).select('id, name').single()
    if(error){
        console.log(error.message)
        return null
    }
    if(menu_items?.length){
        const menus = menu_items.map(i=>({item: i.item, price: i.price, ad_id: data.id }))
        const menuRes = await supabase.from('menu_items').insert(menus)
        if(menuRes.error){
            console.log({menuResError: menuRes.error.message})
        }
    }
    return data as Ad
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


// Chat messages
export const fetchMessages = async(ad_id?: string) => {
    const supabase = createClient(cookies())
    let query = supabase.from('messages').select('body, sender_id, ad_id, recipient_id, created_at')
    if(ad_id){
        query = query.eq('ad_id', ad_id)
    }
    const { data, error } = await query.order('created_at')
    if(error){
        console.log("An error occured while fetching messages.", error.message)
        return []
    }

    return data as Message[]
}

export const getMessages = async () => {
    const supabase = createClient(cookies())
    const { data, error } = await supabase
        .from('messages')
        .select('body, sender_id, ad_id, recipient_id')
        .order('created_at')
    if(error){
        console.log("An error occured while fetching messages.", error.message)
        return []
    }

    return data as Message[]
}

export const sendMessage = async(message: Message)=>{
    const supabase = createClient(cookies())
    const { error } = await supabase.from('messages').insert(message)

    if(error){
        console.log("Error sending message. ", error.message)
    }
} 
