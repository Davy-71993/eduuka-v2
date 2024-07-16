"use client"
import Container from '@/components/Container'
import SearchBar from '@/components/SearchBar'
import { Button } from '@/components/ui/button'

type Props = {}

export default function Page({}: Props){
    

    return (
        <Container clasName='pt-5 flex flex-col gap-10 justify-center items-center min-h-[60vh]'>
            <Button >Test</Button>
        </Container>
    )
}