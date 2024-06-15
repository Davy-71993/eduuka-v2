
import { categories } from "../dami-api"
import { createClient } from "../supabase/client"

export const SUPABASE = createClient()

/**
 * Admin only function to add categories in the database.
 */
export const seedCategories = () => {

    // Add admin verification login here

    categories.forEach(async(category, index) => {
        const { image, name, slug } = category
        const payload = {
            image,
            name,
            slug 
        }
        try {
            const res = await SUPABASE.from('categories').insert(payload).select()
            if(res.error){
                console.log("Seeding failed: ", res.error.message)
                return
            }
            const categoryID = res.data[0].id
            if(!categoryID){
                console.log("Error getting the category")
                return
            }
            category.sub_categories?.forEach(async(sub_category, index)=>{
                const { name, image, slug, extra_fields } = sub_category
                const payload = {
                    name,
                    image,
                    slug,
                    category_id: categoryID,
                    extra_fields
                }
                try {
                    const res = await SUPABASE.from('sub_categories').insert(payload)
                    if(res.error){
                    }
                } catch (error) {
                    console.log("Error seeding sub category: ", error)
                }
            })
            
        } catch (error) {
            console.error("Seeding failed: ", error)
        }
    })
}