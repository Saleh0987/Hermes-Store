import React, { useContext, useState } from 'react'
import style from './AllOrders.module.css'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { CartContext } from '../Context/CartContext';
import delvery from '../../assets/images/delev.jpg';
export default function AllOrders() {


  let { 
    removeCart,
    setCartItems,
    setNumOfCartItems } = useContext(CartContext);

  async function clearCart() {
        await removeCart();
        setCartItems(null);
        setNumOfCartItems(0);
  }

  useEffect(() => {
    clearCart();
    
  }, [])
  

  return <>
    
    <div className="my-4 container mx-auto flex justify-center flex-col items-center">
      <h1 className="text-3xl text-center capitalize">thanks for shipping</h1>
      <h2 className="text-2xl text-center capitalize">waiting call you</h2>
      <img src={delvery} className='w-full object-contain h-[400px]' alt="delevery" />
    </div>  
  </>
}
