"use client"

import { getProfile } from "@/lib/actions/db_actions";
import { createClient } from "@/lib/supabase/client";
import { GeoData, Profile } from "@/lib/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { reverseCode } from "@/lib/utils";

type AppState = {
    me: Profile | null,
    supabase?: SupabaseClient
    chatHeads?: string[],
    activeChatHead?: string,
    setState: (newState: any) => void,
    geoData?: GeoData
}

const defaultValue: AppState = {
    me: null,
    setState: () => {},
    geoData: (() =>{
        console.log("Getting geo data")
        const cookie = Cookies.get('geo')
        if(cookie){
            console.log("Cookie present, useing save geo data.")
            const cookieObj = JSON.parse(cookie, undefined)
            return cookieObj
        }
    })()
}
export const AppContext = createContext(defaultValue)

export default function AppContextProvider({ children }: { children: ReactNode }){
    
    const supabase = createClient()
    const [appState, setAppState] = useState<AppState>(defaultValue)

    useEffect(()=>{
        (async()=>{
            console.log("Updating Global state")
            const { data, error } = await supabase.auth.getUser()
            if(error){
                console.log("Error authenticating, ", error.message)
                setAppState({...appState, me: null})
            }
            if(data.user){
                console.log("Setting profile")
                const profile = await getProfile(data.user.id)
                if(!profile){
                    console.log("Error fetching your profile data.")
                }
                setAppState({...appState, me: profile ?? null })

            }
            
            if(!appState.geoData){
                console.log("No cookie, fetching new geo data")
                if(navigator.geolocation){
                    console.log("Getting device location")
                    navigator.geolocation.getCurrentPosition(async(success)=>{
                        console.log("Reverse coding")
                        const data = await reverseCode({
                            lat: success.coords.latitude,
                            lon: success.coords.longitude,
                            accuracy: success.coords.accuracy
                        })

                        console.log("Setting new geo data")
                        if(data){
                            setAppState({...appState, geoData: data})
                        }else{
                            console.log("Reverse coding failed, setting default geo data")
                            setAppState({...appState, geoData: {
                                city: '',
                                country: '',
                                currency: 'USD',
                                region: '',
                                location: {
                                    lat: success.coords.latitude,
                                    lon: success.coords.longitude,
                                    accuracy: success.coords.accuracy
                                }
                            }})
                        }

                    }, (error)=>{
                        // Modify the reverseCode function to alternatively get the location even without the coordinates
                        console.log("The Navigator failed to get your current location. ", error.message)
                        setAppState({...appState, geoData: {
                            city: '',
                            country: '',
                            currency: 'USD',
                            region: '',
                            location: undefined
                        }})
                    })
                }else{
                    // Modify the reverseCode function to alternatively get the location even without the coordinates
                    console.log("Your device can not get your current location.")
                    setAppState({...appState, geoData: {
                        city: '',
                        country: '',
                        currency: 'USD',
                        region: '',
                        location: undefined
                    }})
                }
            }
            
        })()
    }, [])

    useEffect(()=>{
        if(!appState.geoData) return;
        console.log("Updating geo cookie")
        Cookies.set('geo', JSON.stringify(appState.geoData))
    }, [appState.geoData])

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
