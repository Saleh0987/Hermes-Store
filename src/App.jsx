import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Products from './Components/Products/Products.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Notfound from './Components/Notfound/Notfound.jsx'
import UserContextProvider from './Components/Context/UserContext.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import CartContextProvider from './Components/Context/CartContext.jsx';
import { Toaster } from 'react-hot-toast';
import CheckOut from './Components/checkOut/checkOut.jsx';
import AllOrders from './Components/AllOrders/AllOrders.jsx';
import BrandsItem from './Components/BrandsItem/BrandsItem.jsx';
import CategoriesItems from './Components/CategoriesItems/CategoriesItems.jsx';
import WishList from './Components/WishList/WishList.jsx';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword.jsx';
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx';

let routers = createBrowserRouter([
  
  {path: '' , element: <Layout/>, children :[
    {
      index:true, element:
    <ProtectedRoute>
      <Home/>
    </ProtectedRoute>},
    {
      path: 'cart', element:
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
    },
    {
      path: 'wishlist', element:
    <ProtectedRoute>
      <WishList />
    </ProtectedRoute>
    },

    {
      path: 'categories', element:
    <ProtectedRoute>
      <Categories/>
    </ProtectedRoute>},
    {
      path: 'brands/', element:
    <ProtectedRoute>
      <Brands/>
        </ProtectedRoute>
    },
    {
      path: 'brandsItem/:id', element:
    <ProtectedRoute>
      <BrandsItem/>
        </ProtectedRoute>
    },
    {
      path: 'products', element:
    <ProtectedRoute>
      <Products/>
        </ProtectedRoute>
    },
    {
      path: 'checkout', element:
    <ProtectedRoute>
      <CheckOut/>
        </ProtectedRoute>
    },
    {
      path: 'allorders', element:
    <ProtectedRoute>
      <AllOrders/>
        </ProtectedRoute>
    },
    {
      path: 'productdetails/:id', element:
    <ProtectedRoute>
      <ProductDetails />
    </ProtectedRoute>},
    {
      path: 'categoriesitems/:id', element:
    <ProtectedRoute>
      <CategoriesItems />
        </ProtectedRoute>
    },
    
    {path:'login' , element:<Login/>},
    {path:'register' , element:<Register/>},
    {path: 'forgetpassword', element: <ForgetPassword /> },
    {path: 'resetpassword', element: <ResetPassword />},
    {path: '*', element: <Notfound /> },
    
  ]}
])



function App() {

  return (
    <>
    <CartContextProvider>
    <UserContextProvider>
    <RouterProvider router={routers}>
        </RouterProvider>
        <Toaster />
    </UserContextProvider>
    </CartContextProvider>
    </>
  )
}

export default App;
