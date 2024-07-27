
import { getCategories } from "@/lib/actions/db_actions"

type Props = {}

export default async function Page({}: Props){
    const categories = await getCategories()
    return (
       <></>
    )
}