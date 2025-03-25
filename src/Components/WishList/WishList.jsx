import React, {useContext, useEffect, useState} from "react";
import {CartContext} from "../Context/CartContext";
import {FaHeart, FaStar} from "react-icons/fa";
import {Link} from "react-router-dom";
import emptyWishList from "../../assets/images/empty-whislist.jpg";
import {BiLoaderCircle} from "react-icons/bi";

export default function WishList() {
  const {
    getWishListItems,
    addToCart,
    removeItemFromWishList,
    setWishListDetails,
    wishListDetails,
  } = useContext(CartContext);

  const [loadingItems, setLoadingItems] = useState([]); // Track loading for "Add to Cart"
  const [removingItems, setRemovingItems] = useState([]); // Track loading for removing from wishlist

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const {data} = await getWishListItems();
        setWishListDetails(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishList();
  }, [getWishListItems, setWishListDetails]);

  const handleAddToCart = async (itemId) => {
    setLoadingItems((prev) => [...prev, itemId]);
    try {
      await addToCart(itemId);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoadingItems((prev) => prev.filter((id) => id !== itemId));
    }
  };

  const handleRemoveFromWishlist = async (itemId) => {
    setRemovingItems((prev) => [...prev, itemId]); // Add item to removing state
    try {
      await removeItemFromWishList(itemId);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    } finally {
      setRemovingItems((prev) => prev.filter((id) => id !== itemId)); // Remove item from removing state
    }
  };

  return (
    <div className="min-h-[100vh]">
      {wishListDetails?.length > 0 ? (
        <>
          <h1 className="text-2xl lg:text-3xl font-semibold my-4 text-center lg:text-start">
            Your Wishlist
          </h1>
          <ul className="flex flex-wrap justify-center my-2">
            {wishListDetails?.map((item) => {
              const isInWishlist = wishListDetails?.some(
                (wishlistProduct) => wishlistProduct.id === item.id
              );
              const isLoadingAdd = loadingItems.includes(item.id);
              const isLoadingRemove = removingItems.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="w-full card md:w-1/2 lg:w-1/4 xl:w-1/5 rounded-lg p-2 shadow-md relative"
                >
                  {isLoadingRemove ? (
                    <BiLoaderCircle className="text-2xl absolute top-2 right-4 text-gray-500 animate-spin" />
                  ) : (
                    <FaHeart
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className={`text-2xl absolute top-2 right-4 cursor-pointer transition-all ${
                        isInWishlist ? "text-red-500" : "text-black"
                      }`}
                    />
                  )}
                  <Link to={`/productdetails/${item.id}`}>
                    <div className="bg-white p-4">
                      <img
                        src={item.imageCover}
                        alt={item.title}
                        className="w-full h-[250px] object-contain mb-2"
                      />
                      <h2 className="text-main text-sm mb-2">{item.name}</h2>
                      <h2 className="font-medium text-lg">
                        {item.title?.split(" ").slice(0, 2).join(" ")}
                      </h2>
                      <div className="flex justify-between items-center my-2">
                        <h3>{item.price} EGP</h3>
                        <h3 className="flex items-center gap-1">
                          <FaStar className="text-yellow-500" />
                          {item.ratingsAverage}
                        </h3>
                      </div>
                    </div>
                  </Link>
                  <button
                    className="flex justify-center items-center bg-green-600 w-full py-1.5 my-2 
                    mx-auto mb-2 text-white text-lg 
                    hover:bg-orange-600 transition-all duration-500 rounded disabled:opacity-50"
                    onClick={() => handleAddToCart(item.id)}
                    disabled={isLoadingAdd}
                  >
                    {isLoadingAdd ? (
                      <BiLoaderCircle className="animate-spin text-2xl" />
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              );
            })}
          </ul>
        </>
      ) : (
        <div className="flex justify-center items-center flex-col gap-2 my-4">
          <h1 className="my-2 text-3xl font-bold capitalize">
            Your wishlist is empty.
          </h1>
          <img
            className="w-full h-[400px] object-contain"
            src={emptyWishList}
            alt="emptyWishList"
          />
        </div>
      )}
    </div>
  );
}
