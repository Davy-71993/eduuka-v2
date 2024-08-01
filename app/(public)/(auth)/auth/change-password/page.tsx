import React from 'react';
import Form from './form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Change Password",
  description:
  "Change your password.",
};

const Page = async() => {
  return (
    <div className='w-full pt-20 pb-10 flex justify-center items-center'>
      <Form />
    </div>
  );
};

export default Page;
