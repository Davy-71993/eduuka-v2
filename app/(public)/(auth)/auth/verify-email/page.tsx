import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Verify Email",
  description:
  "Verify your email",
};

const Page = () => {
  return (
    <div className='animate-in pt-20 pb-10 flex justify-center items-center'>
      <div className="w-full max-w-xl h-fit">
        <h1 className="text-2xl mb-5 font-thin text-center">Verify your email.</h1>
        <p className="text-center">We sent you an email, please check your inbox to verify your email and complete the signup process.</p>
      </div>
    </div>
  );
};

export default Page;
