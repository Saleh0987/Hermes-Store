"use client";
import React, { useState } from 'react';
import Nav from './Nav.jsx';
import MobileNav from './MobileNav.jsx';



const ResponsiveNav = () => {
  
  const [showNav, setShowNav] = useState(false);
  const openNavHandler = () => setShowNav(true);
  const closeNavHandler = () => setShowNav(false);

  return (
    <div className='fixed w-full bg-gray-200 px-4 md:px-0 top-0 z-50'>
      <Nav openNav={openNavHandler} />
      <MobileNav showNav={showNav} closeNav={closeNavHandler} />
    </div>
  )
}

export default ResponsiveNav;