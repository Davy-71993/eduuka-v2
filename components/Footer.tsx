
import Link from 'next/link'
import Container from './Container'
import FadingLine from './FadingLine'

const Footer = () => {
  
  return (
    <Container clasName='w-full bg-primary text-primary-foreground'>
        <>
            <div className="sm:grid sm:grid-cols-2 py-5 md:grid-cols-3 lg:grid-cols-5 gap-5">
                <div className="col">
                    <h1 className="text-xl font-bold mt-5"><Link href='/buy'>Buy</Link></h1>
                    <ul className='list-none text-sm my-4'>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/help/#how-to-buy'>How to buy</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Live virtual market</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Shops & Stores</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/register?as=buyer'>Registration</Link></li>
                    </ul>
                </div>
                <div className="col">
                    <h1 className="text-xl font-bold mt-5"><Link href='/my-shop/sell'>Sell</Link></h1>
                    <ul className='list-none text-sm my-4'>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/help/#how-to-buy'>Start Selling</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Learn to Sell</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Create Store</Link></li>
                    </ul>
                    <div className="col">
                        <h1 className="text-xl font-bold mt-5">Tools & Apps</h1>
                        <ul className='list-none text-sm my-4'>
                            <li className='my-2 hover:font-bold transition-all'><Link href='/help/#how-to-buy'>Develpers</Link></li>
                            <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Site map</Link></li>
                            <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Mobile Apps</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="col">
                    <h1 className="text-xl font-bold mt-5">Stay Connected</h1>
                    <ul className='list-none text-sm my-4'>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/blog/#how-to-buy'>Blog</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Facebook</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Twitter</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Instagram</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>LinkedIn</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>YouTube</Link></li>
                    </ul>
                </div>
                <div className="col">
                    <h1 className="text-xl font-bold mt-5"><Link href='/about'>About DolineShop</Link></h1>
                    <ul className='list-none text-sm my-4'>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Company Info</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>News</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Investors</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Careers</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Government Relations</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Advertise with us</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Policies</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Verified Rights Owner program</Link></li>
                    </ul>
                </div>
                <div className="col">
                    <h1 className="text-xl font-bold mt-5">Help & Contact</h1>
                    <ul className='list-none text-sm my-4'>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/blog/#how-to-buy'>Customer info center</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Contact us</Link></li>
                    </ul>
                    <div className="col">
                    <h1 className="text-xl font-bold mt-5">Comunity</h1>
                    <ul className='list-none text-sm my-4'>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/help/#how-to-buy'>Announcements</Link></li>
                        <li className='my-2 hover:font-bold transition-all'><Link href='/#'>Discussion boards</Link></li>
                    </ul>
                    </div>
                </div>
            </div>
            <FadingLine/>
            <h4 className="text-sm text-center pb-5">Copyright &copy; 2023 DolineShop Inc. All rights reserved</h4>
      </>
    </Container>
  )
}

export default Footer