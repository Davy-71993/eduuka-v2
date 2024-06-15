"use client"
import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { seedCategories } from '@/lib/db/seed'
import React from 'react'

type Props = {}

export default function Page({}: Props){

    return (
        <Container clasName='pt-5'>
            <Button onClick={ ()=> {seedCategories()} }>Seed Categories</Button>
        </Container>
    )
}