
import { createAdImage, getCategories, insertLocations, uploadAd } from "../actions/db_actions"
import { createClient } from "../supabase/client"
import axios from 'axios'
import { Ad } from "../types"
import { getRandomCoordinate } from "../utils"

export const SUPABASE = createClient()

/**
 * Admin only function to add categories in the database.
 */
export const seedCategories = () => {

    // Add admin verification login here

    // categories.forEach(async(category, index) => {
    //     const { image, name, slug } = category
    //     const payload = {
    //         image,
    //         name,
    //         slug 
    //     }
    //     try {
    //         const res = await SUPABASE.from('categories').insert(payload).select()
    //         if(res.error){
    //             console.log("Seeding failed: ", res.error.message)
    //             return
    //         }
    //         const categoryID = res.data[0].id
    //         if(!categoryID){
    //             console.log("Error getting the category")
    //             return
    //         }
    //         category.sub_categories?.forEach(async(sub_category, index)=>{
    //             const { name, image, slug, extra_fields } = sub_category
    //             const payload = {
    //                 name,
    //                 image,
    //                 slug,
    //                 category_id: categoryID,
    //                 extra_fields
    //             }
    //             try {
    //                 const res = await SUPABASE.from('sub_categories').insert(payload)
    //                 if(res.error){
    //                 }
    //             } catch (error) {
    //                 console.log("Error seeding sub category: ", error)
    //             }
    //         })
            
    //     } catch (error) {
    //         console.error("Seeding failed: ", error)
    //     }
    // })
}

export const seedAds = async(fromUrl?: string) => {
    // const url = fromUrl ?? 'https://api.escuelajs.co/api/v1/products'
    // const res = (await axios.get(url)).data
    // console.log(res.length)
    // const categories = await getCategories('id, name')

    // const numberOrUndefined = (str: string) => Number.isNaN(parseInt(str)) ? undefined : parseInt(str) 

    // res.forEach(async(item: any)=>{
    //     const { title, description, price, category , images} = item
    //     const ad: Ad = {
    //         name: title,
    //         description,
    //         price,
    //         category_id: numberOrUndefined((()=>categories.find((cat)=> cat.name === category.name))()?.id ?? '')??102,
    //         status: 'Draft',
    //         pricing_scheme: 'fixed price'
    //     }
    //     const cleanArray = images.length === 1 && images[0].startsWith('[') ? JSON.parse(images[0]) : images
        
    //     if(!cleanArray || !cleanArray.length){
    //         console.log('No images for this ad')
    //         return
    //     }
        
    //     try {
    //         const res = await uploadAd(ad)
    //         const longitude = getRandomCoordinate(30.000000, 35.000000)
    //         const latitude = getRandomCoordinate(-1.000000, 4.000000)
    //         try {
    //             insertLocations([{
    //                 ad_id: res.id!,
    //                 geo: `POINT(${longitude} ${latitude})`
    //             }])
    //         } catch (error) {
    //             console.log("The Location could not be uploaded.", error)
    //         }
    //         cleanArray.forEach(async(url: string)=>{
    //             try {
    //                 await createAdImage({ad_id: res.id, url})
                    
    //             } catch (error) {
    //                 console.log("The Image could not be uploaded", error)
    //             }
    //         })
    //     } catch (error) {
    //         console.log("The ad could not be uploaded", error)
    //     }
    // })
}