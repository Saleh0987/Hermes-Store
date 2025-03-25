import React, {useContext, useEffect, useState} from "react";
import style from "./Cart.module.css";
import {CartContext} from "../Context/CartContext";
import {Link} from "react-router-dom";
import emptyCart from "../../assets/images/Empty-cart.svg";
import toast from "react-hot-toast";
import {FaTrashAlt} from "react-icons/fa";
import {BiLoaderCircle} from "react-icons/bi";
import swal from "sweetalert";

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [loadingActions, setLoadingActions] = useState({});

  let {
    getCartItems,
    updateProductCount,
    deleteProductFromCart,
    removeCart,
    setCartItems,
    cartItems,
    setNumOfCartItems,
  } = useContext(CartContext);

  async function getCart() {
    try {
      let {data} = await getCartItems();
      setCartItems(data);
      setNumOfCartItems(data?.products.length || 0);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateCart(productId, count, action) {
    setLoadingActions((prev) => ({...prev, [productId]: action})); 
    try {
      if (count !== 0) {
        let {data} = await updateProductCount(productId, count);
        setCartItems(data);
        setNumOfCartItems(data?.products.length || 0);
        toast.success("Quantity updated successfully");
      } else {
        await deleteProduct(productId);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update quantity");
    } finally {
      setLoadingActions((prev) => ({...prev, [productId]: null}));
    }
  }

  async function deleteProduct(productId) {
    setLoadingActions((prev) => ({...prev, [productId]: "delete"}));
    try {
      let {data} = await deleteProductFromCart(productId);
      setCartItems(data);
      setNumOfCartItems(data?.products.length || 0);
      toast.error("Item removed successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to remove item");
    } finally {
      setLoadingActions((prev) => ({...prev, [productId]: null}));
    }
  }

  async function clearCart() {
    setLoadingActions((prev) => ({...prev, clear: true}));
    try {
      const willClear = await swal({
        title: "Confirm Clear",
        text: "Are you sure you want to clear the cart?",
        icon: "warning",
        buttons: ["Cancel", "Clear"],
        dangerMode: true,
      });

      if (willClear) {
        await removeCart();
        setCartItems([]);
        setNumOfCartItems(0);
        toast.error("Cleared cart successfully");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    } finally {
      setLoadingActions((prev) => ({...prev, clear: false}));
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <BiLoaderCircle className="animate-spin text-4xl text-blue-500" />
        </div>
      ) :  cartItems?.products?.length > 0 ? (
        <div className="container mx-auto my-8">
          <h1 className="text-3xl font-semibold my-6 text-center lg:text-start text-gray-800">
            Cart Items
          </h1>

          <div className="flex flex-col gap-6">
            {cartItems?.products.map((product) => {
              const productId = product?.product?.id;
              const isIncreasing = loadingActions[productId] === "increase";
              const isDecreasing = loadingActions[productId] === "decrease";
              const isDeleting = loadingActions[productId] === "delete";

              return (
                <div
                  key={productId}
                  className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <Link to={`/productdetails/${productId}`}>
                    <img
                      src={product?.product?.imageCover}
                      alt={product?.product?.title}
                      className="w-32 h-32 object-contain rounded-md sm:w-40 sm:h-40"
                    />
                  </Link>
                  <div className="flex flex-col sm:flex-row sm:flex-1 sm:items-center sm:justify-between p-4 w-full">
                    <div className="text-center sm:text-left">
                      <h2 className="text-lg font-semibold text-gray-900 truncate max-w-xs">
                        {product?.product?.title}
                      </h2>
                      <p className="mt-1 text-sm text-gray-600">
                        {product?.price} EGP
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex flex-col items-center sm:flex-row sm:gap-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateCart(
                              productId,
                              product?.count - 1,
                              "decrease"
                            )
                          }
                          disabled={isDecreasing}
                          className={`px-3 py-1 bg-gray-200 rounded-l-md text-gray-700 hover:bg-blue-500 hover:text-white transition-colors duration-200 ${
                            isDecreasing ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          {isDecreasing ? (
                            <BiLoaderCircle className="animate-spin text-lg" />
                          ) : (
                            "-"
                          )}
                        </button>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800">
                          {product?.count}
                        </span>
                        <button
                          onClick={() =>
                            updateCart(
                              productId,
                              product?.count + 1,
                              "increase"
                            )
                          }
                          disabled={isIncreasing}
                          className={`px-3 py-1 bg-gray-200 rounded-r-md text-gray-700 hover:bg-blue-500 hover:text-white transition-colors duration-200 ${
                            isIncreasing ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          {isIncreasing ? (
                            <BiLoaderCircle className="animate-spin text-lg" />
                          ) : (
                            "+"
                          )}
                        </button>
                      </div>
                      <div className="flex items-center gap-4 mt-4 sm:mt-0">
                        <p className="text-sm font-medium text-gray-700">
                          {product?.price * product?.count} EGP
                        </p>
                        <button
                          onClick={() => deleteProduct(productId)}
                          disabled={isDeleting}
                          className={`text-red-500 hover:text-red-700 transition-colors duration-200 ${
                            isDeleting ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          {isDeleting ? (
                            <BiLoaderCircle className="animate-spin text-xl" />
                          ) : (
                            <FaTrashAlt className="text-xl" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Sub total */}
            <div className="mt-8 rounded-lg border bg-white p-6 shadow-md">
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
                <p className="text-lg font-bold text-gray-800">Total</p>
                <div>
                  <p className="mb-1 text-lg font-bold text-gray-800">
                    {cartItems.totalCartPrice + 50} EGP
                  </p>
                  <p className="text-sm text-gray-600">including VAT</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-between mt-6 gap-4">
                <button
                  onClick={clearCart}
                  disabled={loadingActions.clear}
                  className={`w-full md:w-auto px-4 py-2 flex justify-center items-center gap-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-200 ${
                    loadingActions.clear ? "opacity-50 cursor-not-allowed" : ""
                  }`}>
                  {loadingActions.clear ? (
                    <BiLoaderCircle className="animate-spin text-xl" />
                  ) : (
                    <>
                      Clear Cart <FaTrashAlt />
                    </>
                  )}
                </button>
                <button
                  className="w-full md:w-auto px-6 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors duration-200"
                  disabled={loadingActions.clear}>
                  <Link to="/checkout">Check Out</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-2 my-8">
          <h1 className="my-2 text-3xl font-bold capitalize text-gray-800">
            No Products in Your Cart
          </h1>
          <img
            className="w-full max-w-md h-[400px] object-contain"
            src={emptyCart}
            alt="emptyCart"
          />
        </div>
      )}
    </>
  );
}
