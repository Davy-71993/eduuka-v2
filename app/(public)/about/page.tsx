import Container from '@/components/Container'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "About",
  description:
  "An online market place",
};

type Props = {}

export default function AboutPage({}: Props) {
  return (
    <Container clasName='pt-5'>
        <div className="flex flex-col space-y-5">
            <p className="font-bold text-lg sm:text-2xl md:text-4xl lg:text-6xl text-center sm:p-5 md:px-10 max-w-[50rem] mx-auto text-primary">
                EDUUKA is a cutting-edge online marketplace that connects buyers and 
                sellers from around the world in a seamless and efficient manner. <br />
            </p>
            <p className='text-base sm:text-xl md:text-2xl lg:text-3xl text-primary/85 max-w-[70rem] mx-auto'>
                <Image src="/about/01.jpg" alt='01' height={1000} width={1000} className='sm:float-left sm:mr-5 mb-5 rounded-sm w-full sm:w-1/2 sm:max-w-96 h-auto' />
                We are revolutionalizing the way consumers shop online. <br /> 

                Our platform provides a user-friendly interface for both consumers 
                and businesses to easily list and sell their products or services to 
                the nearest and best paying customers and clients. <br />

                With eDuuka, you can find a wide range of products and services, 
                from electronics and clothing to home goods and beauty products. 
                Our platform offers a secure and safe shooping environment ensuring 
                that all transactions are safe and relaible. <br />

                One of the key features of eDuuka is our robust search and filtering 
                options, allowing users to easily find what they are looking for.
                Additionally, our platform offers personalized recommendations based 
                on user preferences, making the shopping experience more convinient 
                and enjoyable. 
                <span>
                    <Image src="/about/02.jpg" alt='02' height={1000} width={1000} className='sm:float-right sm:mr-5 mb-5 sm:ml-5 mt-5 rounded-sm w-full sm:w-1/2 sm:max-w-96 h-auto' />
                </span>

                In addition to providing a platform for buying and selling, eDuuka also offers 
                varous resources and tools for businesses to optimize their online presence
                and increase sales. From marketing strategies to customer support, our platform is 
                designed to help businesses succeed in the competitive online marketplace. <br />

                Overall, eDuuka marketplace is revolutionalizing they way people buy and 
                sell online. With our user-friendly interface, secure shoping environment and 
                a personalized recommendation system, we are proud to offer a convinient and 
                efficient online marketplace for consumers and businesses alike. <Link href='/signup' className='text-blue-500 hover:text-blue-600 font-bold'>Join us today</Link> 
                &nbsp;  and experience the future of online shopping with eDuuka.
            </p>
            
        </div>
    </Container>
  )
}