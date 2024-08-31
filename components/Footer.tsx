
import Link from 'next/link'
import Container from './Container'
import FadingLine from './FadingLine'

const Footer = () => {
  
  return (
    <div className="w-full bg-primary text-primary-foreground">
        <Container>
            <>
                <div id='footer' className="flex flex-wrap space-x-5 w-full gap-5 p-5">
                    <div className="w-fit">
                        <h1 className="text-xl font-bold"><Link href='/about'>About eDuuka</Link></h1>
                        <h1 className='text-xl font-bold'><Link href='/about/policies'>Policies</Link></h1>
                    </div>
                    <div className="w-fit">
                        <h1 className="text-xl font-bold"><Link href='/find'>Buy</Link></h1>
                        <ul className='list-none text-sm my-4'>
                            <li className='my-2 hover:font-bold transition-all'><Link href='/support/#how-to-buy'>How to buy</Link></li>
                            <li className='my-2 hover:font-bold transition-all'><Link href='/stores'>Shops & Stores</Link></li>
                            <li className='my-2 hover:font-bold transition-all'><Link href='/signup'>Registration</Link></li>
                        </ul>
                    </div>
                    <div className="w-fit">
                        <h1 className="text-xl font-bold"><Link href='/me/ads/create'>Sell</Link></h1>
                        <ul className='list-none text-sm my-4'>
                            <li className='my-2 hover:font-bold transition-all'><Link href='/me/ads/create'>Start Selling</Link></li>
                            <li className='my-2 hover:font-bold transition-all'><Link href='/support/#how-to-sell'>Learn to Sell</Link></li>
                            <li className='my-2 hover:font-bold transition-all'><Link href='/me/stores/create'>Create Store</Link></li>
                        </ul>
                    </div>
                    <div className="w-fit">
                        <Link href="/support">
                            <h1 className="text-xl font-bold">Help & Support</h1>
                        </Link>
                        <ul className='list-none text-sm my-4'>
                            <li className='my-2 hover:font-bold transition-all'><Link href='/support/info-center'>Customer info center</Link></li>
                            <li className='my-2 hover:font-bold transition-all'><Link href='/support/how-to/#advertise'>Advertise with us</Link></li>
                            <li className='my-2 hover:font-bold transition-all'><Link href='/contact-us'>Contact us</Link></li>
                        </ul>
                    </div>
                </div>
                {/* <FadingLine/> */}
                <div className="w-full overflow-hidden">
                    <h1 className="text-xl font-bold mt-5">Stay Connected</h1>
                    <Link href='/blog'>Blog</Link>
                    <Link href='/blog'>News</Link>
                    <div className='flex space-x-2 sm:space-x-5 w-full'>
                        <Link href='#'>Facebook</Link>
                        <Link href='#'>Twitter</Link>
                        <Link href='#'>Instagram</Link>
                        <Link href='#'>LinkedIn</Link>
                        <Link href='#'>YouTube</Link>
                    </div>
                </div>
                <FadingLine/>
                <h4 className="text-sm text-center pb-5">Copyright &copy; 2023 DolineShop Inc. All rights reserved</h4>
        </>
        </Container>
    </div>
  )
}

export default Footer