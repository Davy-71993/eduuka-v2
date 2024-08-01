import React from 'react';
import Form from './form';
import Container from '@/components/Container';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Signin",
  description:
  "Sign in never to miss on a big deal.",
};

type Props = {
  searchParams: any
}
const Page = async({ searchParams }: Props) => {
  const supabase = createClient(cookies())
  const nextUrl = searchParams['next']
  const { data, error } = await  supabase.auth.getUser()

  if(data.user){
    if(nextUrl){
      return redirect(nextUrl)
    }
    return redirect('/')
  }
  return (
    <Container>
      <div className='w-full py-5 sm:pt-20 sm:pb-10 flex justify-center items-center'>
        <Form />
      </div>
    </Container>
  );
};

export default Page;
