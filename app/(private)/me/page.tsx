
/**
 * Main dashboard
 */

import React from 'react'

export default function page() {
  return (
    <div className='p-5'>
      <div className="flex justify-between space-x-5">
        <div className="bg-blue-200 drop-shadow-xl p-5 rounded-md w-full flex flex-col items-center max-w-[300px]">
            <h4 className="text-center text-blue-900 font-bold text-2xl">Profile</h4>
            <p className="text-blue-700 text-center pt-5"><span className='font-bold'>50%</span> complete.</p>
            <button className='bg-blue-500 transition-colors hover:bg-blue-600 px-5 py-2 w-full rounded-lg mt-5 text-slate-200 font-bold max-w-[200px] mx-auto'>Finish your profile</button>
        </div>

        <div className="bg-purple-200 drop-shadow-xl p-5 rounded-md w-full flex flex-col items-center max-w-[300px]">
            <h4 className="text-center text-purple-900 font-bold text-2xl">Ads</h4>
            <p className="text-purple-700 text-center pt-5"><span className='font-bold'>4</span> ads, &nbsp; {" "} <span className='font-bold'>0</span> sold</p>
            <button className='bg-purple-500 transition-colors hover:bg-purple-600 px-5 py-2 w-full rounded-lg mt-5 text-slate-200 font-bold max-w-[200px] mx-auto'>Manage your ads</button>
        </div>

        <div className="bg-green-200 drop-shadow-xl p-5 rounded-md w-full flex flex-col items-center max-w-[300px]">
            <h4 className="text-center text-green-900 font-bold text-2xl">Chats</h4>
            <p className="text-green-700 text-center pt-5"><span className='font-bold'>2</span> unread.</p>
            <button className='bg-green-500 transition-colors hover:bg-green-600 px-5 py-2 w-full rounded-lg mt-5 text-slate-200 font-bold max-w-[200px] mx-auto'>View Chats</button>
        </div>
      </div>
      
    </div>
  )
}