import { Distance, OrderBy, PriceRange } from './Filters'

type Props = {}

export  const  HomeFiltersContainer = ({}: Props) => {
  return (
    <div className='flex flex-col gap-5'>
      <h1>Extra Filters</h1>
      <PriceRange  />
      <OrderBy />
      <Distance  />
    </div>
  )
}