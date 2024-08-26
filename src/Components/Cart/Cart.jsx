import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../Context/CartContext';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import emptyCart from '../../assets/images/Empty-cart.svg'
import toast from 'react-hot-toast';
import { FaTrashAlt } from "react-icons/fa";
import swal from 'sweetalert';

export default function Cart() {
  const [loading, setLoading] = useState(true); 

  let { getCartItems,
    updateProductCount,
    deleteProductFromCart,
    removeCart,
    setCartItems,
    cartItems,
    setNumOfCartItems } = useContext(CartContext);


  async function getCart() {
    let {data} = await getCartItems();
    setCartItems(data);
    setNumOfCartItems(data?.products.length);
    setLoading(false);
  }

  async function updateCart(productId, count) {
    if (count != 0) {
      let {data} = await updateProductCount(productId, count);
      setCartItems(data);
      setNumOfCartItems(data?.products.length);
      toast.success("Quantity updated Successfuly");
    } else {
      deleteProduct(productId);
    }
  }

  async function deleteProduct(productId) {
    let {data} = await deleteProductFromCart(productId);
    setCartItems(data)
    setNumOfCartItems(data?.products.length);
    toast.error("Item removed Successfuly");
  }

    async function clearCart() {
    try {
      const willClear = await swal({
        title: 'Confirm Clear',
        text: 'Are you sure you want to clear the cart?',
        icon: 'warning',
        buttons: ['Cancel', 'Clear'],
        dangerMode: true,
      });

      if (willClear) {
        await removeCart();
        setCartItems([]);
        setNumOfCartItems(0);
        toast.error("Cleared Cart Successfuly");

      } else {
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }


  useEffect(() => {
      getCart();
  }, []);
  
    
  return <>
    

    {cartItems !== null && cartItems?.products?.length > 0 ?
      <div className="container mx-auto my-4">
      
      <h1 className="my-2 text-4xl font-bold">Cart Items</h1>
  
      <div className="flex flex-col">
        {cartItems?.products.map((product) =>
          <div key={product?.product?.id} className="rounded-lg ">
            <div className="justify-between items-center mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
              <img src={product?.product?.imageCover} alt="product-image" className="object-contain rounded-lg h-[200px] w-[200px] " />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">{product?.product?.title}</h2>
                  <p className="mt-1 text-xs text-gray-700">{product?.price} EGP</p>
                </div>
                <div className="mt-4 flex justify-between items-center sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center justify-end space-x-2 border-gray-100">
                    <span onClick={() => updateCart(product?.product?.id, product?.count - 1)}
                      className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                    <span>{product?.count}</span>
                    <span onClick={() => updateCart(product?.product.id, product?.count + 1)}
                      className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">{product?.price * product?.count} EGP</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" onClick={() => deleteProduct(product?.product.id)}
                      stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Sub total */}
        <div className="mt-6 h-full rounded-lg border mx-auto bg-white p-6 shadow-md md:mt-0 w-full">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">{cartItems.totalCartPrice} EGP</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">50 EGP</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">{cartItems.totalCartPrice + 50} EGP</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
            </div>
          <div className="flex flex-wrap justify-between mt-4 gap-4">
              <button onClick={clearCart}
              className="w-full md:max-w-[19%] flex justify-center items-center gap-1 rounded-md bg-red-600 py-1.5 font-medium text-blue-50 hover:bg-red-900">
                Clear Cart
                <FaTrashAlt />
        </button>
        <button className="w-full md:max-w-[78%] rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
          <Link to="/checkout">Check Out</Link>
        </button>
      </div>
        </div>
      </div>
      </div> :
      <div className=' flex justify-center items-center flex-col gap-2 my-4'>
      <h1 className="my-2 text-3xl font-bold capitalize">No Products in Your Cart</h1>
      <img className='w-full h-[400px] object-contain'  src={emptyCart} alt="emptyCart" />
      </div> }
      

  </>
}
