
/**
 * Main dashboard
 */

import { Profile } from '@/lib/types'
import Link from 'next/link'
import React from 'react'
import { EditProfile, PersonalInfo, ProfileImageCard, UserData } from './ProfileSegments'
import { getProfile } from '@/lib/actions/db_actions'
import { Lock, User } from 'lucide-react'
import { redirect } from 'next/navigation'


export default async function page({ searchParams }: { searchParams: any}) {
  const profile  = await getProfile()
  if(!profile){
    return redirect('/me/create-profile')
  }
  return (
    <div className='flex flex-col sm:flex-row-reverse h-full'>
     <div className="w-full sm:w-1/3 h-fit sm:h-full bg-secondary text-center px-3 flex flex-col space-y-2 py-5">
      <ProfileImageCard profile={ profile ?? {} } />
      <div className="py-5 w-full text-left flex flex-col gap-5">
        <Link href="/me?p=personal-info" className='text-xl hover:text-primary transition-all flex gap-5'>
          <User />
          <span>Personal Info</span>
        </Link>
        <Link href="/me?p=user-data" className='text-xl hover:text-primary transition-all flex gap-5'>
          <Lock />
          <span>User Contact Info</span>
        </Link>
      </div>
     </div>
     <div className="w-full p-5">
        {
          profile &&
          <RenderProfileSegment segment={ searchParams['p']} profile={ profile } />
        }
      </div>
    </div>
  )
}


const RenderProfileSegment = ({ segment, profile }: { segment: string, profile?: Profile}) => {
  
  switch (segment) {
    case 'personal-info':
      return (
        <PersonalInfo profile={ profile } />
      )

    case 'profile-image':
      return (
        <EditProfile profileID={ profile?.id!} />
      )
    
    case 'user-data':
      return (
        <UserData profile={ profile } />
      )
  
    default:
      return (
        <PersonalInfo profile={ profile } />
      );
  }

}