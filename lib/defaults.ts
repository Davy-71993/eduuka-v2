import { Bell, Home, MessageSquareQuote, SendHorizonal, Store, Trash, Weight } from "lucide-react"

export const APP_NAME = 'uDuuka'
export const APP_URL = 'http://localhost:3000'
export const CDN_URL = 'https://sqcidocbglgivrlysuhq.supabase.co/storage/v1/object/public'

export const DASHBOARD_LINKS = [
    {
        title: "Dashboard",
        url: "/me",
        display_name: "Home",
        icon: Home

    },{
        title: "My Ads",
        url: "/me/ads",
        display_name: "My Ads",
        icon: Weight

    },{
        title: "Chats",
        url: "/me/chats",
        display_name: "Chats",
        icon: SendHorizonal

    },{
        title: "Notifications",
        url: "/me/alerts",
        display_name: "Alerts",
        icon: Bell

    },{
        title: "My Stores",
        url: "/me/stores",
        display_name: "My Stores",
        icon: Store

    },{
        title: "Trash",
        url: "/me/trash",
        display_name: "Trash",
        icon: Trash
    },{
        title: "Feedback",
        url: "/me/feedback",
        display_name: "Feedback",
        icon: MessageSquareQuote
    },
]

export const SUPPORTED_CURRANCIES: any = {
    "UG": "UGX",
    "KE": "KSH",
    "TZ": "TSH"
}
