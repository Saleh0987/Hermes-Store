import React, { useState } from 'react'
import style from './Spinner.module.css'
import { ThreeDots, Watch } from 'react-loader-spinner';

export default function Spinner() {



    
  return <>
  <div className="flex justify-center items-center h-[80vh]">
   <ThreeDots
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
      </div>
  </>
}
