import React, { useState } from 'react'
import style from './Layout.module.css'
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import ResponsiveNav from '../Navbar/ResponsiveNav';

export default function Layout() {
    
  return (
    <>
    <ResponsiveNav />
    <div className="container pt-20 min-h-[100vh]">
      <Outlet></Outlet>
    </div>
    <Footer />
    </>
  )
}
