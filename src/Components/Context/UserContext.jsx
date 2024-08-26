import axios from 'axios';
import { createContext, useEffect, useState }  from 'react';

export let userContext = createContext();

export default function UserContextProvider({children}) {
 
 const [userData, setUserData] = useState(null);
   const [email, setEmail] = useState('');

   let headers = {
      token: localStorage.getItem('userToken'),
   }

   async function forgetPasswordApi(values) {
      return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values, { headers })
         .then((res) => res).catch((error) => error);
   }

   async function verifyResetCodeApi(values) {
      return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values, { headers })
         .then((res) => res).catch((error) => error);
   }

   async function resetPasswordApi(values) {
      return axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values, { headers })
         .then((res) => res).catch((error) => error);
   }


 useEffect(() => {
  if (localStorage.getItem('userToken')) {
   setUserData(localStorage.getItem('userToken'));
   }
 }, [])
 

   return <userContext.Provider
      value={{
         userData,
         setUserData,
         email,
         setEmail,
         forgetPasswordApi,
         verifyResetCodeApi,
         resetPasswordApi,
      }}>
    {children}
 </userContext.Provider>
}