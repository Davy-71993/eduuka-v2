import { Category, SubCategory } from '@/lib/types'
import ImageWithFallbackUrl from './ImageWithFallbackUrl'
import { AspectRatio } from './ui/aspect-ratio'

export function CategoryCard({ category }: { category: Category }) {
  console.log(category.ads)
  return (
    <div className='w-full h-full bg-secondary flex flex-col justify-between rounded-md shadow'>
      <AspectRatio ratio={5/4} className="relative w-full">
        <ImageWithFallbackUrl src={ category.image ?? '' } alt='Category Image'  className='w-full h-auto rounded-t-sm' />
      </AspectRatio>
      <div className="p-2 sm:p-3 text-center sm:text-xl">
        <h2>{ category.name }</h2>
        {/* This should indicate the number of ads in thos category */}
        <p className="font-thin text-sm sm:text-base">{ category.ads![0]?.count } Ads</p>
      </div>
    </div>
  )
}

export function SubCategoryCard({ subCategory }: { subCategory: SubCategory }) {
  return (
    <div className='w-32 sm:w-56 overflow-hidden h-full bg-secondary flex flex-col justify-between rounded-md shadow'>
      <AspectRatio ratio={5/4} className="relative w-full">
        <ImageWithFallbackUrl src={ subCategory.image ?? '' } alt='Category Image'  className='w-full h-auto rounded-t-sm' />
      </AspectRatio>
      <div className="p-2 sm:p-5 text-center sm:text-xl">
        <h2 className='overflow-hidden'>{ subCategory.name }</h2>
        <p className="font-thin text-sm sm:text-base">{ subCategory.ads![0].count + ' '} Ads</p>
      </div>
    </div>
  )
}