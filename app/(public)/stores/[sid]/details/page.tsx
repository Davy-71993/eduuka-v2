import Container from '@/components/Container'
import SearchBar from '@/components/SearchBar'
import React from 'react'

type Props = {}

export default function StoreDetailsPage({}: Props) {
  return (
    <Container clasName='pt-5'>
      <SearchBar includeLocation/>
      
    </Container>
  )
}