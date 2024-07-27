
export type Profile = {
    id?: string,
    first_name?: string,
    last_name?: string,
    image?: string,
    address?: string,
    about?: string,
    stores?: Store[],
    ads?:Ad[],
    clients?: Profile[]
    sex?: string,
    dob?: string,
    email?: string,
    phone?: string,
    username?: string
}


export type Category = {
    id?: string,
    name?: string,
    image?: string,
    sub_categories?: SubCategory[],
    ads?: Ad[],
    slug?: string
}

export type GeoData = {
    country: string,
    region: string,
    city: string,
    location?: Location
    currency: string
}

export type SubCategory = {
    id?: string,
    name?: string,
    image?: string,
    ads?: Ad[],
    extra_fields?: string,
    slug?: string,
    categories?: Category
}


export type Ad = {
    id?: string,
    created_at?: string
    name?: string,
    price?: number,
    price_menu?: Menu,
    seller_id?: string
    description?: string,
    status?: "Draft" | "Active" | "Sold" | "Deleted" | "Promoted",
    sub_category_id?: string,
    category_id?: number
    store_id?: string
    dist_meters?: number
    views?: number
    trashed_at?: string
    ad_details?: string
    lat?: string
    long?: string
    image?: string
    location?: string | any,
    pricing_scheme?: string, // "Fixed" | "Price Range" | "Periodic",
    min_price?: number,
    max_price?: number,
    address?: string,
    deleted_at?: string,
    pricing_period?: string, // "Hourly" | "Weekly" | "Monthly" | "Quaterly" | "Yearly"
    sub_category?: SubCategory
    ad_images?: AdImage[],
    profiles?: Profile,
    rating?: number,
    count?: number,
    default_currency?: string,
    menu_items?: MenuItem[]
}

export type MenuItem = {
    item?: string,
    price?: string 
}

export type Menu = {
    id?: string,
    ad_id?: string,
    menu_items?: MenuItem[],
}

export interface AdData extends Ad {
    category?: Category,
    imageFiles?: File[]
}

export type Message = {
    sender_id: string,
    body: string,
    ad_id: string,
    recipient_id: string
}

export type AdImage = {
    id?: string,
    url?: string,
    ad_id?: string
}
export type Location = {
    lon?: number,
    lat?: number,
    accuracy?: number
}

export type Store = {
    id?: string,
    name?: string,
    description?: string,
    ads?: Ad[]
    keeper_id?: string,
    keeper?: Profile,
    trashed_at?: string,
    deleted_at?: string,
    location?: Location,
    image?: string,
    created_at?: string,
    slug?: string
}


export type Notification = {
    id: string,
    to_id: string,
    message: string,
    created_at: string,
    status: "read" | "delivered" | "seen"
}
