"use client"
import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { fetchAds, getCategories, getCategoryByIDOrSlug, getSubCategory, insertLocations } from '@/lib/actions/db_actions'
import { seedAds, seedCategories } from '@/lib/db/seed'
import { AdLocation } from '@/lib/types'
import React from 'react'

type Props = {}

export default function Page({}: Props){

    // const populateLocations = async() =>{
    //     try {
    //         const ads = await fetchAds('id, location')
    
    //         const validLocationsData = ads.map((ad) =>{
    //            const location = ad.location
    //            const ar = location?.split(',')
    //            return { ad_id: ad.id!, geo: `POINT(${ar![1]} ${ar![0]})` }
    //         })
    
    //         try {
    //             const locs = await insertLocations(validLocationsData)
    //             console.log(locs)
    //         } catch (error) {
    //             console.log(error)
    //         }
            
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const test = async() => {
        try {
            const res = await getCategories()
            console.log(`getCategories Passed with ${res.length} coategories`)
        } catch (error) {
            console.log(error)
        }

        try {
            const res = await getCategoryByIDOrSlug('other')
            console.log(`getCategoryByIDOrSlug Passed with ${res.sub_categories?.length} SubCategories`)
        } catch (error) {
           console.log(error) 
        }

        try {
            const res = await getSubCategory('females')
            console.log(`getSubCategory Passed with category: ${res.categories?.name}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container clasName='pt-5 flex flex-col gap-10 justify-center items-center min-h-[60vh]'>
            {/* <Button onClick={ ()=> {seedCategories()} }>Seed Categories</Button> */}
            <Button onClick={ test }>Test DB Actions</Button>
        </Container>
    )
}