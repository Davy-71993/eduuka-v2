import { Category } from "../types"
import { fetchAllWithoutFilters, fetchOne } from "./utils"

export const fetchCategories = async(fields?: string) => {
    return await fetchAllWithoutFilters('categories', fields ?? 'name, slug, sub_categories(name, slug)') as unknown as Category[]
}

export const fetchOneCategory = async(value: string, cloumn?: string, fields?: string) => {
    return await fetchOne('categories', fields??'slug, name, sub_categories(name, image, slug)', cloumn??'slug', value) as unknown as Category

}