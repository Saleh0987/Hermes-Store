import React from 'react';
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom';


const NAV_LINKS = [
  { to: '', key: 'home', label: 'Home' },
  { to: 'products', key: 'Products', label: 'Products' },
  { to: 'categories', key: 'Categories', label: 'Categories' },
  { to: 'brands/?:id', key: 'Brands', label: 'Brands' },
];


const MobileNav = ({ closeNav, showNav }) => {
  
  const navStyle = showNav ? "translate-x-0" : "translate-x-[-100%]";

  return (
    <div className={`fixed ${navStyle} right-0 transition-all duration-500 left-0 
    top-0 bottom-0 h-[100vh] bg-[#000000e0] z-[1002]`}>
      
      {/* close icon */}
      <ImCross onClick={closeNav} className=' absolute top-[2rem] right-[2rem] w-[2rem] h-[2rem] cursor-pointer text-white' />
      
      {/* nav links */}
      <div className={`bg-emerald-700 ${navStyle} transition-all duration-500 delay-200 
      flex flex-col items-center justify-center w-[70%] h-[100%]`}>
      
          {NAV_LINKS.map((link) => (
        <ul className="space-y-10"  key={link.key}>
          <li className='text-[35px] font-medium hover:text-yellow-400 text-white'>
            <Link to={link.to} onClick={closeNav} >
              {link.label}
            </Link>
          </li>
        </ul>
          ))}

      </div>
    </div>
  )
}

export default MobileNav;