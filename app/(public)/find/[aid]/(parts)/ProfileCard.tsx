import ActionButtons from '@/components/ActionButtons'
import ImageWithFallbackUrl from '@/components/ImageWithFallbackUrl'
import { Profile } from '@/lib/types'
import { Star } from 'lucide-react'

type Props = {
    profile?: Profile,
    scheme?: string,
    ad_seller?: string
}

export default function ProfileCard({ profile, scheme, ad_seller }: Props) {
  return (
    <div className="bg-secondary mt-5 xl:mt-0 w-full p-5 h-fit">
        <div className="w-40 h-40 relative mx-auto rounded-full overflow-hidden border-2">
            <ImageWithFallbackUrl
            src={profile?.image ?? '/profile.jpg'} alt='Seller Image'
            className='w-full h-auto' />
        </div>
        <h1 className="text-lg text-center pt-2">{ profile?.first_name } { profile?.last_name }</h1>
        <div className="flex justify-evenly py-2 w-full">
            <p className="text-foreground/50 w-fit">6 ads</p>
            <div className="w-fit flex text-yellow-500">
                <Star /><Star /><Star /><Star /><Star />
            </div>
        </div>
        {
            scheme === "price menu" &&
            <ActionButtons phone={ profile?.phone } ad_seller={ ad_seller } />
        }
    </div>
  )
}