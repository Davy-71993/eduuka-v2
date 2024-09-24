import React from 'react';
import Container from '../Container';
import Image from 'next/image';
import Link from 'next/link';
import { APP_NAME } from '@/lib/defaults';

const Footer = () => {
  return (
    <footer id='footer' className='w-full bg-primary min-h-96'>
      <Container clasName='py-10 text-background'>
        <div className="flex gap-2 items-center">
            <Image className="w-10 h-10" src='/android-chrome-512x512.png' alt='logo' height={100} width={100} />
            <h1 className="text-2xl font-bold uppercase">{ APP_NAME }</h1>
        </div>
        <div className="flex w-full gap-5">
            <div className="flex flex-col w-full">
                <p className="py-2 text-center w-full text-lg">Download mobile app.</p>
                <div className="flex flex-col w-full gap-5">
                    <Link className='w-full' href='https://apple.com'>
                        <div className="w-full bg-teal-500 rounded px-5 py-2 flex justify-center gap-2 items-center">
                            <svg  
                                version="1.1" 
                                fill='#e2e8f0'
                                id="Capa_1" 
                                className='h-10 w-10'
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 22.773 22.773">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> 
                                <g> 
                                    <g> 
                                        <path 
                                        d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z">
                                        </path> 
                                        <path 
                                        d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"></path> 
                                    </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g>
                            </svg>
                            <div className="flex flex-col w-fit">
                                <p className="text-sm line-clamp-1">Download from</p>
                                <p className="text-lg font-bold">AppStore</p>
                            </div>
                        </div>
                    </Link>
                    <Link className='w-full' href='https://google.com'>
                        <div className="w-full bg-slate-500 rounded px-5 py-2 flex justify-center gap-2 items-center">
                        <svg fill="#f0fdfa" className='h-10 w-10' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <title>ionicons-v5_logos</title>
                                <path d="M48,59.49v393a4.33,4.33,0,0,0,7.37,3.07L260,256,55.37,56.42A4.33,4.33,0,0,0,48,59.49Z"></path>
                                <path d="M345.8,174,89.22,32.64l-.16-.09c-4.42-2.4-8.62,3.58-5,7.06L285.19,231.93Z"></path>
                                <path d="M84.08,472.39c-3.64,3.48.56,9.46,5,7.06l.16-.09L345.8,338l-60.61-57.95Z"></path>
                                <path d="M449.38,231l-71.65-39.46L310.36,256l67.37,64.43L449.38,281C468.87,270.23,468.87,241.77,449.38,231Z"></path>
                            </g>
                        </svg>
                            <div className="flex flex-col w-fit">
                                <p className="text-sm line-clamp-1">Download from</p>
                                <p className="text-lg font-bold">PlayStore</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="flex w-full gap-5">
                <div className="flex flex-col gap-2 group">
                    <div className="w-full">
                        <h2 className='py-2 text-lg'>Learn how to...</h2>
                        <div className="w-10 border-b-2 border-background group-hover:w-full transition-all duration-300"></div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 group">
                    <div className="w-full">
                        <h2 className='py-2 text-lg'>Useful Links</h2>
                        <div className="w-10 border-b-2 border-background group-hover:w-full transition-all duration-300"></div>
                    </div>
                </div>
            </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
