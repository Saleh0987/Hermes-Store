import React, { useContext, useState } from 'react';
import { FaBurger } from 'react-icons/fa6';
import { BiCycling, BiShoppingBag } from 'react-icons/bi';
import { HiBars3BottomRight } from 'react-icons/hi2';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';
import { userContext } from '../Context/UserContext';
import { CartContext } from '../Context/CartContext';
import { ImExit } from "react-icons/im";
import { FaHeart } from 'react-icons/fa';
import swal from 'sweetalert';
import toast from 'react-hot-toast';


 function logOut() {
   localStorage.removeItem('userToken');
   setUserData(null);
   navigate('/login');
 }

const NAV_LINKS = [
  { to: '', key: 'home', label: 'Home' },
  { to: 'products', key: 'products', label: 'Products' },
  { to: 'categories', key: 'categories', label: 'Categories' },
 { to: 'brands/?:id', key: 'brands', label: 'Brands' },
  
];

const Nav = ({ openNav }) => {
  const { userData, setUserData } = useContext(userContext);
  const navigate = useNavigate();
  const { numOfCartItems, wishlistCount } = useContext(CartContext);

  function logOut(event) {
      event.preventDefault(); 
    swal({
      title: 'Confirm Logout',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      buttons: ['Cancel', 'Logout'],
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        toast.success('Good Bye');
        localStorage.removeItem('userToken');
        setUserData(null);
        navigate('/login');
      } else {
        
      }
    });
  }

  return (
    <div className='h-[10vh] sm:mx-12 py-3'>
      <div className="container mx-auto flex h-[100%] items-center justify-between">
        <div className="flex items-center space-x-2">
            {userData ? (
            <Link to="">
              <h1 className='text-3xl font-extralight'>Hermès</h1>
              {/* <img src={logo} width={120} alt="Freshcart_Logo" /> */}
            </Link>
          ) : (
            <Link to="/register">
              <h1>Hermès</h1>
              {/* <img src={logo} width={120} alt="Freshcart_Logo" /> */}
            </Link>
          )}
        </div>
        
     {/* Nav Links */}
      {userData && (
        <ul className="hidden lg:flex items-center space-x-4">
          {NAV_LINKS.map((link) => (
            <li key={link.key} className='text-[20px] hover:text-red-600'>
              <NavLink to={link.to}>
                  {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        )}

        {/* Buttons */}
        <div className="flex items-center space-x-4">
      
      {userData ? (
       <>
        <Link to="wishlist" className='sm:px-4 sm:py-3 px-2 py-2 bg-blue-950 transition-all duration-200 
          hover:bg-red-600 flex items-center rounded-md space-x-2 text-white relative '>
          <FaHeart className='text-[1.5rem]' />
         <span className="absolute top-0 size-6 right-0 text-[16px] flex items-center text-white justify-center bg-red-500 rounded-full">
        {wishlistCount}
         </span>
          </Link>
          <Link to="cart"  className='sm:px-4 sm:py-3 px-2 py-2 hover:bg-green-700 transition-all duration-200 
          bg-orange-600 flex items-center rounded-md text-white relative'>
         <BiShoppingBag className='text-[1.5rem]' />
         <span className="absolute top-0 size-6 right-0 text-[16px] flex items-center text-white justify-center bg-black rounded-full">
          {numOfCartItems}
         </span>
        </Link>
        <Link onClick={logOut} title='LogOut' className='sm:px-4 sm:py-3 px-2 bg-blue-950 py-2 hover:bg-red-600 transition-all duration-200 
           flex items-center rounded-md text-white'>
            <ImExit className='text-[1.5rem]'/>
        </Link>
       </>
      ) :  (
        <>
         <Link to="login" className='px-2 py-2 sm:px-3 sm:py-3 text-[14px] bg-blue-950 transition-all duration-200 
          hover:bg-red-600 flex items-center rounded-md space-x-2 text-white'>
              Login
          </Link>
          <Link to="register" className='px-2 py-2 sm:px-3 sm:py-3 text-[14px] hover:bg-green-700 transition-all duration-200 
          bg-orange-600 flex items-center rounded-md text-white'>
            Register
        </Link>
         </>
       )}
        
          {userData && <HiBars3BottomRight
            onClick={openNav}
            className='lg:hidden w-[2rem] h-[2rem] cursor-pointer text-black'
          />}
        </div>
      </div>
    </div>
  );
}

export default Nav;