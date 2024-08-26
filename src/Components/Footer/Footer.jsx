import React, { useState } from 'react'
import style from './Footer.module.css'
export default function Footer() {

  const paymentMethods = [
    { name: 'Amazon Pay', src: 'https://www.logo.wine/a/logo/Amazon_Pay/Amazon_Pay-Logo.wine.svg' },
    { name: 'American Express', src: 'https://www.logo.wine/a/logo/American_Express/American_Express-Logo.wine.svg' },
    { name: 'MasterCard', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
    { name: 'PayPal', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' }
  ];
  const appStores = [
    { name: 'App Store', src: 'https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg' },
    { name: 'Google Play', src: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg' }
  ];

  return (<>

    <footer className='bg-gray-200 px-4 mt-12 py-8 font-sans text-slate-700 z-50 overflow-hidden'>
      <div className="container flex flex-col gap-5 md:gap-10">
        <div>
          <h1 className='text-2xl pb-3 text-black'>Get the FreshCart app</h1>
          <p>We will send you al link, open it on your phone to download the app</p>
        </div>
        <div className='flex flex-col md:flex-row gap-6 justify-center'>
          <input type="email" placeholder='E-mail ...' className='w-full md:w-5/6 p-2 rounded-md focus:outline-main' />
          <button  className='bg-main w-full md:w-48 rounded-md text-white py-1' >Share App Link</button>
        </div>
        <div className='flex flex-col md:flex-row justify-between items-center border-y-2 border-slate-300 py-3 gap-5'>
          <div className='flex justify-between items-center md:gap-4'>
          <h3>Payment Partners</h3>
          <div className='flex gap-1 md:gap-3 cursor-pointer'>
          {paymentMethods.map((method,index)=>(<img key={index} src={method.src} className='w-12'/>))}
          </div>
          </div>
          <div className='flex justify-center items-center flex-col gap-2 md:flex-row md:gap-5'>
            <h3>Get deliveries with FreshCart</h3>
            <div className='flex justify-center gap-1 md:gap-3 cursor-pointer'>
              {appStores.map((app,index)=>(<img key={index} src={app.src} className='w-24'/>))}
            </div>
          </div>
        </div>
      </div>
    </footer>

  </>
  )
}