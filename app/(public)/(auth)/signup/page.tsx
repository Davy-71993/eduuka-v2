import React from 'react';
import Form from './form';
import Container from '@/components/Container';

interface PageProps {}

const Page: React.FC<PageProps> = (props) => {
  return (
    <Container>
      <div className='w-full py-5 sm:pt-20 sm:pb-10 flex justify-center items-center'>
        <Form />
      </div>
    </Container>
  );
};

export default Page;
