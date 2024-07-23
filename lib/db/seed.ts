
import { createAdImage, getCategories, insertLocations, uploadAd } from "../actions/db_actions"
import { createClient } from "../supabase/client"
import axios from 'axios'
import { Ad } from "../types"
import { generateCoordinates, getRandomCoordinate } from "../utils"
import { data } from "@/trash/dami-data"

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

export const seedAds = async() => {
    const {
        phones, 
        computers, 
        electronics, 
        fashion, 
        furniture, 
        health_and_beauty, 
        real_estate, 
        vehicles_and_cars
    } = data

    const updatedPhones: Ad[] = phones.map((phone)=>{
        const { id, name, price, description, ...rest } = phone
        return {
            name, brand: rest.brand, pricing_scheme: "fixed price", 
            price, description, ad_details: JSON.stringify(rest),
            category_id: 97,
            sub_category_id: '96'
        }
    })

    const updatedComputers: Ad[] = computers.map((computer) => {
        const { type, model, brand, price, description, specs } = computer
        return {
            name: `${brand} ${model} ${type}`, price, description,
            pricing_scheme: "fixed price", brand,
            ad_details: JSON.stringify({...specs, brand }),
            category_id: 98
        }
    }) 

    const updatedElectronics: Ad[] = electronics.map((electronic) => {
        const { id, name, price, description, brand, specs, features, modelYear, color } = electronic
        const details = {...specs, features, modelYear, color}
        return {
            name: `${brand} ${name}`, price, description, brand,
            ad_details: JSON.stringify(details),
            pricing_scheme: "fixed price",
            category_id: 93
        }
    })

    const updatedFashion: Ad[] = fashion.map((f)=> {
        const { category, color, description, id, name, price, size } = f
        const generateSubCatID = (cate: string) => {
            if(cate === "Men's Clothing") return  84;
            if(cate === "Women's Clothing") return 76;
            if(cate === "Footwear") return 85;
            if(cate === "Activewear" || cate === "Outerwear") return 105;
            return undefined;
        }
        return {
            name, price, description, pricing_scheme: "menu",
            category_id: 94,
            sub_category_id: generateSubCatID(category) && `${generateSubCatID(category)}`,
            ad_details: JSON.stringify({color, sizes: [...size]})
        }
    }) 

    const updatedFurniture: Ad[] = furniture.map(f => {
        const { id, name, description, price, ...rest } = f
        return { 
            name, price, description,
            ad_details: JSON.stringify(rest),
            pricing_scheme: "fixed price",
            category_id: 99
        }
    })

    const updatedHealthAndBeauty: Ad[] = health_and_beauty.map(hb => {
        const { id, name, price, description, ...rest } = hb
        return {
            name, price, description, brand: rest.brand,
            pricing_scheme: "fixed price",
            category_id: 96,
            ad_details: JSON.stringify(rest)
        }
    })

    const updatedRealEstates: Ad[] = real_estate.map(re => {
        const { id, type, price, location, description, ...rest } = re
        return { name: type, price, description, address: location,
            pricing_scheme: "periodic price",
            pricing_period: "Monthly",
            ad_details: JSON.stringify(rest),
            category_id: 95,
            sub_category_id: '100'
        }
    })

    const updatedCars: Ad[] = vehicles_and_cars.map(cars => {
        const { id, price, description, ...rest } = cars
        return {
            name: `${rest.make} ${rest.model} ${rest.year}`,
            price, description, pricing_scheme: "fixed price",
            category_id: 100,
            sub_category_id: '79',
            ad_details: JSON.stringify(rest)
        }
    })

    const newData = [
        ...updatedComputers,
        ...updatedElectronics,
        ...updatedFashion,
        ...updatedFurniture,
        ...updatedHealthAndBeauty,
        ...updatedRealEstates,
        ...updatedCars,
        ...updatedPhones
    ]

    // newData.forEach(async(phone) => {
    //     const { lat, lon } = generateCoordinates()
    //     const location = `POINT(${lon} ${lat})`
    //     const ad = await uploadAd({...phone, location })
    //     if(!ad) return
    //     const { id, name } = ad

    //     const imageUrl = `/images/ads/${name}.png`
    //     await createAdImage({
    //         url: imageUrl,
    //         ad_id: id
    //     })
    // })

}