import React, { useContext, useState } from 'react';
import style from './Login.module.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { BiLoaderCircle } from "react-icons/bi";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../Context/UserContext';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';


export default function Login() {

  const [inCorrect, setInCorrect] = useState(null);
  const [loading, setloading] = useState(false);
  const { setUserData } = useContext(userContext);
  let navigate = useNavigate();

  async function Login(values) {
    try {
      setloading(true);
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      localStorage.setItem('userToken', data.token);
      navigate('/');
      setUserData(data.token);
      window.location.reload();
    } catch (error) {
      setloading(false);
      console.log(error.response.data.message);
      setInCorrect(error.response.data.message);
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email('invalid email').required('Email is required'),
    password: Yup.string().required('password is required'),
  });

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
      onSubmit: Login
  })

  
    
  return (
    <>
      <div className="md:mt-10 md:mb-5 flex justify-between px-4 h-[80vh]">
          <div className={`hidden lg:flex w-full lg:w-1/2 justify-around items-center rounded-md ${style.login_img_section }`}>
            <div className="bg-black opacity-20 inset-0 z-0">
            </div>
            <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
              <h1 className="text-white font-bold text-4xl font-sans">Hello Again!</h1>
              <p className="text-white text-2xl mt-1">Welcome Back</p>
              <div className="flex justify-center lg:justify-start mt-6">
              <Link to={'/register'}
                className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-main text-white mt-4 px-4 py-2 rounded-2xl font-bold mb-2">
                Get Started</Link>
              </div>
            </div>
          </div>
          <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            
            <form onSubmit={formik.handleSubmit} className="bg-white rounded-md shadow-2xl p-5">
              <h1 className="text-gray-800 font-bold text-2xl mb-8">Login</h1>
            {/* Email */}
              <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
                <MdOutlineAlternateEmail className="text-[18px]" />
                <input id="email" className=" pl-2 w-full outline-none border-none" type="email" name="email"
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Your Email" />
              </div>
              {formik.errors.email && formik.touched.email && <div className="p-3 mb-4 text-sm 
                text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 
                dark:text-red-400" role="alert">
                {formik.errors.email}</div>}
              
              {/* password */}
              <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl ">
                <RiLockPasswordFill className="text-[18px]" />
                <input className="pl-2 w-full outline-none border-none" type="password" name="password" id="password"
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="Your Password" />
              </div>
              {formik.errors.password && formik.touched.password &&
            <div className="p-3 mb-2 text-sm 
          text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 
          dark:text-red-400" role="alert">
          {formik.errors.password}
          </div>}
              
              {loading ? <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 
              transition-all duration-500 text-white font-semibold mb-2 ">
                <BiLoaderCircle className='animate-spin text-2xl m-auto' />
              </button> :
                <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 
              transition-all duration-500 text-white font-semibold mb-2">Login</button>}


              <div className="flex flex-col gap-2 lg:flex-row lg:justify-between mt-4">
                <Link to={'/forgetpassword'} className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password ?</Link>
                <Link to={'/register'} href="#" className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Don't have an account yet?</Link>
              </div>

              <div className="flex items-center justify-center my-4 bg-red-600 rounded-lg">
                {inCorrect && <h1 className='py-1 text-white'>{inCorrect}</h1>}
                </div>

              
            </form>
            </div>
            
          </div>
      </div>
  </>
  )
}
