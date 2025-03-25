import React, { useEffect, useState } from 'react'
import style from './Layout.module.css'
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import ResponsiveNav from '../Navbar/ResponsiveNav';

  const ScrollToTop = () => {
    const {pathname} = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

export default function Layout() {
  
    
  return (
    <>
      <ResponsiveNav />
      <ScrollToTop />
      <div className="container m-auto pt-20 min-h-[100vh]">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
