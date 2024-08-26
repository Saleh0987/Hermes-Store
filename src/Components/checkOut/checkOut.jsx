import React, { useContext, useState } from 'react';
import style from './checkOut.module.css';
import { useFormik } from 'formik';
import { BiLoaderCircle } from "react-icons/bi";
import axios from 'axios';
import { CartContext } from '../Context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';


export default function checkOut() {
  const [selectButton, setSelectButton] = useState('');
  const [loadingCash, setLoadingCash] = useState(false);
  const [loadingVisa, setLoadingVisa] = useState(false);

  let { onlinePayment, cartId } = useContext(CartContext);
  let navigate = useNavigate();

async function handleOnlineSubmit(values) {
        setLoadingVisa(true);
        let res = await onlinePayment(cartId, values);
        if (res?.data?.status === 'success') {
            toast.success('Successfuly Order');
            window.location.href = res?.data?.session?.url;
        } else {
          setLoadingVisa(false);
        }

    }

  async function handleCashPayment() {
    setLoadingCash(true);
    setTimeout(() => {
      navigate('/allorders');
      toast.success('Order Successful');
      setLoadingCash(false);
    }, 3000);
  }



  let validation = Yup.object({
        details: Yup.string().required("Address is required").min(3, 'Minimum letter is 3').max(100, 'Maximum letters is 100'),
        city: Yup.string().required("City is required").min(2, 'Minimum letter is 2').max(10, 'Maximum letters is 10'),
        phone: Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/, 'phone must be valid number'),
    });

    let formik = useFormik({
    initialValues: {
      details: '',
      city: '',
      phone: '',
      },
      validationSchema: validation,
      onSubmit: handleOnlineSubmit
  })
  
    
  return (
    <>
      
            <div className="mt-10 mb-3 h-[80vh] flex justify-center">
          <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            
            <form onSubmit={formik.handleSubmit} className="bg-white rounded-md shadow-2xl p-5">
              <h1 className="text-gray-800 font-bold text-2xl text-center mb-8">Check Out</h1>
            {/* Details */}
              <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
                <MdOutlineAlternateEmail className="text-[18px]" />
                <input id="details" className=" pl-2 w-full outline-none border-none" type="text" name="details"
                  onBlur={formik.handleBlur}
                  value={formik.values.details}
                  onChange={formik.handleChange}
                  placeholder="Your Address" />
              </div>
              {formik.errors.details && formik.touched.details && <div className="p-3 mb-4 text-sm 
                text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 
                dark:text-red-400" role="alert">
                {formik.errors.details}</div>}
              
              {/* City */}
              <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl ">
                <RiLockPasswordFill className="text-[18px]" />
                <input className="pl-2 w-full outline-none border-none" type="text" name="city" id="city"
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  placeholder="Your City" />
              </div>
              {formik.errors.city && formik.touched.city &&
            <div className="p-3 mb-2 text-sm 
            text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 
            dark:text-red-400" role="alert">
            {formik.errors.city}
            </div>}
              
              {/* Phone */}
              <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl ">
                <RiLockPasswordFill className="text-[18px]" />
                <input className="pl-2 w-full outline-none border-none" type="tel" name="phone" id="phone"
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  placeholder="Your phone" />
              </div>
              {formik.errors.phone && formik.touched.phone &&
            <div className="p-3 mb-2 text-sm 
            text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 
            dark:text-red-400" role="alert">
            {formik.errors.phone}
            </div>}
              
              <div className="flex justify-between items-center gap-2">
              <button onClick={handleCashPayment}
                disabled={loadingCash || !(formik.isValid && formik.dirty)}
                type="submit" className="flex justify-center w-full bg-green-600 mt-5 py-2 rounded-2xl 
                hover:bg-green-900 hover:-translate-y-1 
              transition-all duration-500 text-white font-semibold mb-2">
              {loadingCash ? (
              <BiLoaderCircle className="animate-spin text-2xl ml-2" />
                ) : (
              'Pay Cash'
              )}
              </button>

              <button onClick={handleOnlineSubmit}
                disabled={loadingVisa || !(formik.isValid && formik.dirty)}
                type="submit"
                className="flex justify-center w-full bg-indigo-600 mt-5 py-2 rounded-2xl 
                hover:bg-indigo-700 hover:-translate-y-1 
              transition-all duration-500 text-white font-semibold mb-2">
              {loadingVisa ? (
              <BiLoaderCircle className="animate-spin text-2xl ml-2" />
                ) : (
              'Pay Visa'
                    )}
              </button>
              </div>


            </form>
            </div>
            
          </div>
      </div>



  </>
  )
}
