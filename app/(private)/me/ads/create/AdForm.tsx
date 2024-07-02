"use client"

import { Category } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import StepOne from './(steps)/StepOne'
import StepTwo from './(steps)/StepTwo'
import StepThree from './(steps)/StepThree'
import StepFive from './(steps)/StepFive'
import StepFour from './(steps)/StepFour'

type Props = {
  categories: Category[]
}

export default function AdForm({ categories }: Props) {

  // We get the current page from url qury string
  // and convert it into a number or zero if not given
  const searchParams = useSearchParams()
  const currentPage = numberOrZero(searchParams.get('cp') ?? '')

  return (
    <>
      <div className='bg-secondary min-h-[60vh] flex justify-center items-center w-full rounded-sm px-2 sm:px-5 py-3'>
        <div className='h-fit w-full flex flex-col space-y-10'>
          {
            renderSteps(currentPage, categories)
          }
        </div>
      </div>
    </>
  )
}


/**
 * A helper function that takes in a string from the url query string and returns 
 * a number that represents the current page 
 * @param str The string to be converted to either a number or 0
 * @returns Number of the current page that defaults to 0
 */
export const numberOrZero = (str: string) => {
  return Number.isNaN(parseInt(str)) ? 0 : parseInt(str)
}

/**
 * A function that renders the form depending on the current page.
 * @param currentPage The current page got from the url qury string.
 * @returns The form portion depending on the current page.
 */
const renderSteps = (currentPage: number, categories?: Category[]) => {
  switch (currentPage) {
   case 1:
     return <StepOne categories={ categories ?? [] } />
   
   case 2:
     return <StepTwo />
 
   case 3:
     return <StepThree />
 
   case 4: 
     return <StepFour />
    
    case 5: 
     return <StepFive />
  
   default:
     return <StepOne categories={ categories ?? [] } />
  }
 }