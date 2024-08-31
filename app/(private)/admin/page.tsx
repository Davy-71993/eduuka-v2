
import Container from "@/components/Container"
import { getCategories } from "@/lib/actions/db_actions"
import FloatingComponent from "@/components/animated/FloatingComponent"

type Props = {}

export default async function Page({}: Props){
    const categories = await getCategories()
    return (
       <Container clasName="width">
        <div className="flex w-full">
            <div className="w-1/4 relative bg-teal-300">
                <FloatingComponent >
                    
                </FloatingComponent>
            </div>
            <div className="w-3/4 h-[900rem] bg-teal-600"></div>
        </div>
       </Container>
    )
}