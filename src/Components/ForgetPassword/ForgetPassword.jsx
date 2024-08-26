import React, { useContext, useState } from 'react'
import * as Yup from 'yup';
import style from './ForgetPassword.module.css'
import { useFormik } from 'formik';
import { userContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { MdOutlineAlternateEmail } from 'react-icons/md';

export default function ForgetPassword() {
  let { forgetPasswordApi, verifyResetCodeApi, setEmail } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetCode, setIsResetCode] = useState(false);
  let navigate = useNavigate();

  let validationMail = Yup.object({
        email: Yup.string().required("email is required").email("email is invalid"),
    })
    let formik1 = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: handleForgetPassword,
        validationSchema: validationMail,
    });
  
  async function handleForgetPassword(values) {
        setIsLoading(true);
        let res = await forgetPasswordApi(values);
        if (res?.data?.statusMsg === 'success') {
            setIsResetCode(true);
            setEmail(values.email);
            toast.success(res?.data?.message);
        }
        else {
            setIsResetCode(false);
            toast.error(res?.response?.data?.message ? res?.response?.data?.message : "Failed Operation");
        }
        setIsLoading(false);
  }
  
  async function handleResetCode(values) {
        setIsLoading(true);
        let res = await verifyResetCodeApi(values);
        console.log(res);
        if (res?.data?.status === 'Success') {
            toast.success('Correct Code');
            navigate('/resetpassword')
        }
        else {
            toast.error(res?.response?.data?.message ? res?.response?.data?.message : "Failed Operation");
        }
        setIsLoading(false);
    }

    let validationCode = Yup.object({
            resetCode: Yup.number("resetCode must be numbers").required("resetCode is required"),
        })
        let formik2 = useFormik({
            initialValues: {
                resetCode: '',
            },
            onSubmit: handleResetCode,
            validationSchema: validationCode,
        });


    
  return <>
    
        <div className="md:mt-10 md:mb-5 flex justify-between px-4 h-[80vh]">
          <div className="flex w-full justify-center items-center bg-white space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            
          {isResetCode ? <>
            <form onSubmit={formik2.handleSubmit} className="bg-white rounded-md shadow-2xl p-5">
              <h1 className="text-gray-800 font-bold text-2xl mb-8">Forget Password:</h1>
            {/* Code */}
              <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
                <MdOutlineAlternateEmail className="text-[18px]" />
                <input id="resetCode" className=" pl-2 w-full outline-none border-none" type="text" name="resetCode"
                  onBlur={formik2.handleBlur}
                  value={formik2.values.resetCode}
                  onChange={formik2.handleChange}
                  placeholder="C O D E" />
              </div>
              {formik2.errors.resetCode && formik2.touched.resetCode && <div className="p-3 mb-4 text-sm 
                text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 
                dark:text-red-400" role="alert">
                {formik2.errors.resetCode}</div>}
            
              {isLoading ? <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 
              transition-all duration-500 text-white font-semibold mb-2 ">
                <BiLoaderCircle className='animate-spin text-2xl m-auto' />
              </button> :
                <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 
              transition-all duration-500 text-white font-semibold mb-2">Send</button>}

            </form>
          
          </> : <>
            <form onSubmit={formik1.handleSubmit} className="bg-white rounded-md shadow-2xl p-5">
              <h1 className="text-gray-800 font-bold text-2xl mb-8">Forget Password:</h1>
            {/* Code */}
              <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
                <MdOutlineAlternateEmail className="text-[18px]" />
                <input id="email" className=" pl-2 w-full outline-none border-none" type="email" name="email"
                  onBlur={formik1.handleBlur}
                  value={formik1.values.email}
                  onChange={formik1.handleChange}
                  placeholder="E M A I L" />
              </div>
              {formik1.errors.email && formik1.touched.email && <div className="p-3 mb-4 text-sm 
                text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 
                dark:text-red-400" role="alert">
                {formik2.errors.email}</div>}
            
              {isLoading ? <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 
              transition-all duration-500 text-white font-semibold mb-2 ">
                <BiLoaderCircle className='animate-spin text-2xl m-auto' />
              </button> :
                <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 
              transition-all duration-500 text-white font-semibold mb-2">Send Code</button>}

            </form>
          </>}
 
            </div>
            
          </div>
      </div>

  </>
}
