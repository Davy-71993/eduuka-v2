import React from 'react';
import Form from './form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Reset Password",
  description:
  "Reset your password",
};

const Page = () => {
  return (
    <div className='w-full pt-20 pb-10 flex justify-center items-center'>
      <Form />
    </div>
  );
};

export default Page;
