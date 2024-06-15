/**
 * The types definitions:
 * 1.   Profile,
 * 2.   Ad,
 * 3.   Category
 * 4.   SubCategory
 * 5.   AdImage
 * 6.   Address
 * 7.   AdLocation
 * 8.   Store
 * 9.   Notification
 * 10.  Chat
 * 11.  ChatMessage
 * 12.  ChatCall
 * 13.  Transuction 
 */

export type Profile = {
    id: string,
    firstName?: string,
    lastName?: string,
    image?: string,
    address?: string,
    about?: string,
    stores?: Store[],
    ads?:Ad[],
    clients?: Profile[]
    sex?: string,
    dob?: string
}


export type Category = {
    id?: string,
    name: string,
    image: string,
    sub_categories?: SubCategory[],
    ads?: Ad[],
    slug: string
}

export type SubCategory = {
    id?: string,
    name: string,
    image: string,
    ads?: Ad[],
    extra_fields?: string,
    slug?: string,
    categories?: Category
}

export type AdPromotion = {
    id?: number,
    ad_id?: number,
    start?: string,
    end?: string
}

export type Ad = {
    id?: string,
    created_at?: string
    name?: string,
    price?: number,
    seller_id?: string
    description?: string,
    status?: "Draft" | "Active" | "Sold" | "Deleted" | "Promoted",
    sub_category_id?: string,
    store_id?: string,
    views?: number
    trashed_at?: string,
    ad_details?: string,
    location?: string,
    pricing_scheme?: "Fixed" | "Price Range" | "Periodic",
    min_price?: number,
    max_price?: number,
    address?: string,
    deleted_at?: string,
    pricing_period?: "Hourly" | "Weekly" | "Monthly" | "Quaterly" | "Yearly"
    ad_ratings?: AdRating[],
    sub_category?: SubCategory,
    ad_promotions?: AdPromotion,
    ad_images?: AdImage[],
    seller?: Profile,
}

export type AdRating = {
    id?: string,
    value?: number,
    ad_id?: number,
    client_id?: string
}

export type AdImage = {
    id?: string,
    url?: string,
    ad_id?: string
}
export type Location = {
    id: string
    longitude: number,
    latitude: number,
    region?: string,
    ad_id: string,
    ad?: Ad
}
export type Transuction ={
    amount: number
    status: 'pending' | 'successful' | 'cancelled'
    type: 'sale' | 'purchase'
    client: Profile,
    seller: Profile,
    seller_id: string,
    client_id: string
}

export type Store = {
    id: string,
    name: string,
    description?: string,
    ads?: Ad[]
    keeper_id?: string,
    keeper: Profile,
    trashed_at?: string,
    deleted_at?: string,
    location?: Location,
    image?: string,
    created_at?: string,
    slug?: string
}

export type Chat = {
    id: string,
    ad_name: string,
    messages: ChatMessage[]
}

export type ChatMessage = {
    id: string,
    chat_id: string,
    to: string,
    from: string
    type: "Text" | "AudioCall" | "VideoCall" | "File",
    body: TextMessage | FileMessage
}

export type TextMessage = {
    id: string,
    message_id: string,
    text: string
}

export type FileMessage = {
    id: string,
    message_id: string,
    text?: string,
    file_url: string
}

export type ChatFile = {
    id: string,
    chat_id: string,
    type: 'Audio' | 'Video' | "Image",
    url?: string
}

export type Notification = {
    id: string,
    type?: "General" | "Warning" | "Danger",
    to?: Profile,
    to_id: string,
    message: string,
    date: Date,
    status: "Read" | "Unread" | "Undelivered"
}

export type Address = {
    id: string,
    profile_id: string,
    body: string
}

export type Feedback = {
    id: string,
    sender_id: string, // Relates to the profile
    sender?: {
        name: string
    },
    message: string,
    ad_id: string // Relates to the ad
    ad?: {
        name: string
    }
}