"use client"

import { getProfile } from "@/lib/actions/db_actions";
import { createClient } from "@/lib/supabase/client";
import { GeoData, Profile } from "@/lib/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { reverseCode } from "@/lib/utils";
import { usePathname } from "next/navigation";

type AppState = {
    me: Profile | null
    supabase?: SupabaseClient
    loading: boolean
    chatHeads?: string[]
    activeChatHead?: string
    setState: (newState: any) => void
    geoData?: GeoData
}

const defaultValue: AppState = {
    me: null,
    loading: true,
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

    const pathName = usePathname()
    
    const supabase = createClient()
    const [appState, setAppState] = useState<AppState>(defaultValue)

    useEffect(()=>{
        (async()=>{
            console.log("Updating Global state")
            setAppState({...appState, loading: true})
            const { data, error } = await supabase.auth.getUser()
            if(error){
                console.log("Error authenticating, ", error.message)
                setAppState({ ...appState, me: null, loading: false })
            }
            if(data.user){
                console.log("Setting profile")
                const profile = await getProfile(data.user.id)
                if(!profile){
                    console.log("Error fetching your profile data.")
                }
                setAppState({ ...appState, me: profile ?? null, loading: false })

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
                            setAppState({...appState, geoData: data, loading: false })
                        }else{
                            console.log("Reverse coding failed, setting default geo data")
                            setAppState({...appState, loading: false, geoData: {
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
                        setAppState({...appState, loading: false, geoData: {
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
                    setAppState({...appState, loading: false, geoData: {
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

    useEffect(()=>{
        const target = document.querySelector('#footer')
        const pane = document.querySelector('#sidePane')
        if(!pane){
            return
        }
        const observer = new IntersectionObserver((entries, obs)=>{
            const targetEntry = entries[0]
            if(targetEntry.isIntersecting){
                pane.classList.replace('fixed', 'absolute')
                pane.classList.add('bottom-0', 'left-0')
            }else{
                pane.classList.replace('absolute', 'fixed')
                pane.classList.remove('bottom-0', 'left-0')
            }
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        })
        if(!target){
            return
        }
        observer.observe(target)
    
        return ()=>{
            observer.unobserve(target)
            observer.disconnect()
        }
    }, [pathName])

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
