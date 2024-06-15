import { useQuery } from '@tanstack/react-query'
import { getCategories } from './actions/db_actions'

export const useCategories = () => {

    return useQuery({
        queryKey: ['categories'],
        queryFn: async() => await getCategories()
    })
}