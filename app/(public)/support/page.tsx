import Container from '@/components/Container'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description:
  "Istant support from the uDuuka technical team",
};

type Props = {}
export default function SupportPage({}: Props) {
  const submitQuery = async(e: FormData) => {
    "use server"
    console.log(e.get('email'))
  }
  return (
    <Container clasName='pt-5 flex flex-col space-y-3 sm:space-y-5 md:space-y-10'>
      <h1 className="text-lg sm:text-2xl md:text-4xl text-primary text-center max-w-4xl mx-auto">
        We are revolutionalizing the online shopping experience.
      </h1>
      <div className="flex flex-wrap gap-2 sm:space-x-5 sm:gap-5 justify-center">
        <Link href="/about">
          <div className="w-fit px-3 sm:px-5 py-1 hover:bg-accent-foreground/60 transition-colors bg-accent-foreground/50 text-primary-foreground text-sm sm:text-base md:text-xl rounded-lg">Learn about eDuuka</div>
        </Link>
        <Link href="#how-to-sell">
          <div className="w-fit px-3 sm:px-5 py-1 hover:bg-accent-foreground/60 transition-colors bg-accent-foreground/50 text-primary-foreground text-sm sm:text-base md:text-xl rounded-lg">How to sell</div>
        </Link>
        <Link href="#how-to-buy">
          <div className="w-fit px-3 sm:px-5 py-1 hover:bg-accent-foreground/60 transition-colors bg-accent-foreground/50 text-primary-foreground text-sm sm:text-base md:text-xl rounded-lg">How to buy</div>
        </Link>
        <Link href="#premium">
          <div className="w-fit px-3 sm:px-5 py-1 hover:bg-accent-foreground/60 transition-colors bg-accent-foreground/50 text-primary-foreground text-sm sm:text-base md:text-xl rounded-lg">Go premium</div>
        </Link>
        <Link href="/me/ads/create">
          <div className="w-fit px-3 sm:px-5 py-1 hover:bg-accent-foreground/60 transition-colors bg-accent-foreground/50 text-primary-foreground text-sm sm:text-base md:text-xl rounded-lg">Advertise</div>
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-3 lg:space-x-6 items-center text-accent-foreground/60">
        <Image src="/help/get-teh-deal.avif" alt='Get the deal' height={1000} width={1000} className='w-full sm:w-1/2 max-w-[600px] rounded-sm '/>
        <div className="w-full h-fit flex flex-col space-y-5">
        <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-2xl mx-auto'>We are here 24/7 to support so that you never miss out on a deal.</h1>
        <div className="flex flex-col space-y-5 max-w-2xl mx-auto">
          <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold'>Have any inquiries? Reach our team immediately.</h2>
          <form action={ submitQuery } className='flex flex-col'>
            <Input name='email' placeholder='Your email' type='email' className='border border-primary w-full rounded-sm text-lg' />
            <Textarea name='query' placeholder='Write your query here' className='border border-primary w-full text-lg rounded-sm resize-none my-5 h-36 overflow-hidden py-3' />
            <Input type='submit' title='Submit' className='text-xl w-fit bg-primary text-primary-foreground self-end'/>
          </form>
        </div>
        </div>
      </div>
      <section id='how-to-sell' className=' pt-10'>
        <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary mb-5'>How to Sell </h1>
        <div className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:space-x-5 items-center">
          <div className="w-full sm:w-1/2 lg:w-2/3 items-center pl-10 h-fit">
            <ol className='text-lg list-decimal md:text-xl xl:text-2xl flex flex-col space-y-5 pl-5 sm:pr-5'>
              <li>
                <span className='font-bold'><Link href="/signup" className='text-primary'>Signup</Link></span><br />
                Signup using your e-mail and password (or do it via Google, Apple or Facebook).
              </li>
              <li>
                <span className='font-bold'><Link href="/me/profile/edit" className='text-primary'>Edit your Profile</Link></span><br />
                Make sure you add your correct address and phone number so that clients can easily and quickly reach you! 
              </li>
              <li>
                <span className='font-bold'>Make photos of your item.</span><br />
                Feel free to make a lot of photos using your smartphone or camera. Make sure they are clear enough and they 
                show your item in the best light.
              </li>
              <li>
                <span className='font-bold'>Press Post Ad.</span><br />
                Choose a proper category, write a clear name and full description of 
                your item. Enter a fair price, select attributes and upload your photos. Then send your advert to review!
              </li>
              <li>
                <span className='font-bold'>Answer the messages and calls from your clients!.</span><br />
                If everything is ok with your advert, {`it’ll`} be on eDuuka in a couple of hours after 
                sending to moderation. {`We’ll`} send you a letter and notification when your advert goes live. 
                Check your messages and be ready to earn money! 
              </li>
            </ol>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 h-fit flex flex-col space-y-5">
            <Image src="/help/turn-it-into-money.avif" alt='sell' height={1000} width={1000} className='rounded-sm w-full h-auto' />
            <Link href="/me/ads/create" className='block w-fit rounded-sm text-xl font-bold text-primary-foreground px-6 py-3 bg-primary/90 hover:bg-primary self-end'>Start Selling</Link>
          </div>
        </div>
      </section>
      <section id='how-to-buy' className=' pt-10'>
        <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary mb-5'>How to Buy</h1>
        <div className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:space-x-5 items-center">
          <div className="w-full sm:w-1/2 lg:w-1/3 h-fit">
            <Image src="/help/shop-now.avif" alt='sell' height={1000} width={1000} className='rounded-sm w-full h-auto' />
          </div>
          <div className="w-full sm:w-1/2 lg:w-2/3 items-center pl-10 h-fit flex flex-col space-y-5">
            <ol className='text-lg list-decimal md:text-xl xl:text-2xl flex flex-col space-y-5 pl-5 sm:pr-5'>
              <li>
                <span className='font-bold'>Search for the item.</span><br />
                Find what you need using search panel and filters. We have millions of adverts, 
                choose exactly what you are looking for.
              </li>
              <li>
                <span className='font-bold'>Contact a seller.</span><br />
                You may use chat on eDuuka or call them via phone. Or navigate the item location on the map and reach the 
                scene. Discuss all the details, negotiate about the price.
              </li>
              <li>
                <span className='font-bold'>Take your item or order a delivery.</span><br />
                We check our sellers carefully, but {`it’s`} always better to check twice, right? Meet a 
                seller in public place and be sure to pay only after collecting your item.
              </li>
              <li>
                <span className='font-bold'>Leave your feedback about the seller.</span><br />
                Feel free to tell us about your purchase. Your feedback will be published online on 
                the {`seller’s`} page and will be very helpful for other buyers. {`Let’s`} build a safe 
                and professional business community together! 
              </li>
            </ol>
            <Link href="/find" className='block w-fit rounded-sm text-xl font-bold text-primary-foreground px-6 py-3 bg-primary/90 hover:bg-primary self-end'>Start Shopping</Link>
          
          </div>
        </div>
      </section>
      <section id="premium" className='pt-10'>
        <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary mb-5'>How Premium services work</h1>
        <div className="flex flex-col-reverse sm:flex-row sm:space-y-0 sm:space-x-5">
          <div className="w-full sm:w-1/2 lg:w-2/3 flex flex-col space-y-5 py-5">
            <h1 className="text-lg sm:text-xl md:text-2xl">
            Premium services are the promotional tools for the users which help to advertise the items as 
            much as possible in the particular category, to sell all the goods faster and get in several 
            times more clients. And also be enabled to use AI powered tools like the shoppihg assistant.
            </h1>
            <Link href="/me/premium" className='bg-primary/90 w-fit hover:bg-primary text-xl font-bold px-6 py-3 rounded-sm text-primary-foreground'>Go Premium</Link>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <Image src="/help/premium.avif" alt='premium' height={1000} width={1000} className='w-full h-auto rounded-sm'/>
          </div>
        </div>
      </section>
    </Container>
  )
}