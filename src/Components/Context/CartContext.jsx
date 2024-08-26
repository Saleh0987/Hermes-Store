import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  let [cartItems, setCartItems] = useState(null);
  let [numOfCartItems, setNumOfCartItems] = useState(0);
  let [wishListDetails, setWishListDetails] = useState([]);
  let [wishlistCount, setWishlistCount] = useState(null);
  const [cartId, setCartId] = useState(null);
  
  let headers = {
    token: localStorage.getItem('userToken')
  }

  // ===================== CartItems =======================
  async function getCartItems() {
    try {
      if (localStorage.getItem('userToken')) {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",
          { headers });
        setCartItems(data);
        setNumOfCartItems(data?.numOfCartItems);
        setCartId(data?.data?._id);
        
        return data;
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }

  async function addToCart(productId) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
       { headers},
      );
      setCartItems(data);
      setNumOfCartItems(data?.numOfCartItems);
      toast.success(data.message, {
      position: 'top-center',
     })
      return data;
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  async function updateProductCount(productId, count) {
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers },
      );
      setCartItems(data);
      return data;
    } catch (error) {
      console.error(error);
    }
 }
 
  async function deleteProductFromCart(productId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers },
      );
      setCartItems(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function removeCart() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
    .then((res) => res)
    .catch((error) => error);
    }

  // ===================== WishList =======================
  async function getWishListItems() {
    try {
        if (localStorage.getItem('userToken')) {
          let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers });
        setWishListDetails(data?.data);  
        setWishlistCount(data?.count); 
        return data;
        }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }

  async function addToWishList(productId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId },
      { headers },
      );
      setWishListDetails(data?.data);
      setWishlistCount(data?.count); 
      toast.success("Item added to wishlist")
      getWishListItems() 
    } catch (error) {
      console.error(error);
    }
  }

  async function removeItemFromWishList(productId) {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
      getWishListItems() 
      toast.error('Item removed from wishlist');
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  }

  // ===================== Payment =======================
    async function onlinePayment(cartId, shippingAddress) {
        const url = `${window.location.protocol}//${window.location.host}`;
        console.log(url);
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
            shippingAddress: shippingAddress,
        }, { headers })
            .then((res) => res)
            .catch((error) => error);
    }

  useEffect(() => {
    getCartItems();
    getWishListItems();
  }, [])
  


  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        getCartItems,
        addToCart,
        updateProductCount,
        deleteProductFromCart,
        getWishListItems,
        addToWishList,
        removeItemFromWishList,
        wishListDetails,
        setWishListDetails,
        wishlistCount,
        setWishlistCount,
        numOfCartItems,
        setNumOfCartItems,
        removeCart,
        onlinePayment,
        cartId
      }}>
      {children}
    </CartContext.Provider>
  );
}
