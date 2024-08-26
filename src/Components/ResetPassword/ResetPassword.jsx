import React, { useContext, useState } from 'react'
import style from './ResetPassword.module.css'
import { userContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BiLoaderCircle } from 'react-icons/bi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdOutlineAlternateEmail } from 'react-icons/md';

export default function ResetPassword() {
 let { resetPasswordApi, email } = useContext(userContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isResetCode, setIsResetCode] = useState(false);
    let navigate = useNavigate();

    async function handleResetPassword(values) {
        setIsLoading(true);
        let res = await resetPasswordApi(values);
        if (res?.data?.token) {
            setIsResetCode(true);
            toast.success('Password reset successfully');
          navigate('/login');
        }
        else {
            setIsResetCode(false);
            toast.error(res?.response?.data?.message ? res?.response?.data?.message : "Failed Operation");
        }
        setIsLoading(false);
    }
    
    let validationMail = Yup.object({
        email: Yup.string().required("email is required").email("email is invalid"),
        newPassword: Yup.string().required("password is required").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'password must have spiacl characters, capital letters, small letters, numbers, and min 8 characters'),
    });

    let formik = useFormik({
        initialValues: {
            email: email!=null? email : '',
        },
        onSubmit: handleResetPassword,
        validationSchema: validationMail,
    });

  return <>
    
        <div className="md:mt-10 md:mb-5 flex justify-between px-4 h-[80vh]">
          <div className="flex w-full justify-center items-center bg-white space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            
            <form onSubmit={formik.handleSubmit} className="bg-white rounded-md shadow-2xl p-5">
              <h1 className="text-gray-800 font-bold text-2xl mb-8">ResetPassword</h1>
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
              
              {/* newPassword */}
              <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl ">
                <RiLockPasswordFill className="text-[18px]" />
                <input className="pl-2 w-full outline-none border-none" type="password" name="newPassword" id="newPassword"
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  placeholder="Your new Password" />
              </div>
              {formik.errors.newPassword && formik.touched.newPassword &&
            <div className="p-3 mb-2 text-sm 
          text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 
          dark:text-red-400" role="alert">
          {formik.errors.newPassword}
          </div>}
              
              {isLoading ? <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 
              transition-all duration-500 text-white font-semibold mb-2 ">
                <BiLoaderCircle className='animate-spin text-2xl m-auto' />
              </button> :
                <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 
              transition-all duration-500 text-white font-semibold mb-2">Confirm</button>}

              
            </form>
            </div>
            
          </div>
      </div>

  </>
}
