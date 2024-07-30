import { getProfile } from "@/lib/actions/db_actions";
import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/lib/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { createContext, ReactNode, useEffect, useState } from "react";

type AppState = {
    me: Profile | null,
    supabase?: SupabaseClient
    chatHeads?: string[],
    activeChatHead?: string,
    setState: (newState: any) => void
}

const defaultValue: AppState = {
    me: null,
    setState: () => {}
}
export const AppContext = createContext(defaultValue)

export default function AppContextProvider({ children }: { children: ReactNode }){
    
    const supabase = createClient()
    const [appState, setAppState] = useState<AppState>(defaultValue)

    useEffect(()=>{
        (async()=>{
            const { data, error } = await supabase.auth.getUser()
            if(error){
                console.log("Error authenticating, ", error.message)
                setAppState({...appState, me: null})
                return
            }
            const profile = await getProfile(data.user.id)
            if(!profile){
                console.log("Error fetching your profile data.")
                return
            }
            setAppState({...appState, me: profile})
            
        })()
    }, [])

    return (
        <AppContext.Provider value={ {
            ...appState,
            supabase,
            setState: (stateProp: any) => {
                setAppState({...appState, [stateProp.key]: stateProp.value  })
            }
        } }>
            { children }
        </AppContext.Provider>
    )
}
