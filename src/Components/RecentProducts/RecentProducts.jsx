import React, {useContext, useState} from "react";
import {FaHeart, FaStar} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {CartContext} from "../Context/CartContext";
import {BiLoaderCircle} from "react-icons/bi";
import { userContext } from "../Context/UserContext";

export default function RecentProducts({product}) {
  let {addToCart, addToWishList, wishListDetails, removeItemFromWishList} =
    useContext(CartContext);
  let {userData} = useContext(userContext);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const navigate = useNavigate();

  const isInWishlist = wishListDetails?.some(
    (wishlistProduct) => wishlistProduct.id === product.id
  );
  const toggleFavorite = () => {
    if (isInWishlist) {
      removeItemFromWishList(product.id);
    } else {
      addToWishList(product.id);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    await addToCart(product.id);
    setIsAddingToCart(false);
  };

  return (
    <div className="w-full card md:w-1/2 lg:w-1/4 xl:w-1/5 rounded-lg p-2 shadow-md relative">
      <FaHeart
        onClick={toggleFavorite}
        className={`text-2xl absolute top-2 right-4 cursor-pointer transition-all ${
          isInWishlist ? "text-red-500" : "text-black"
        }`}
      />
      <Link to={`/productdetails/${product.id}`}>
        <div className="bg-white p-4 ">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-[250px] object-contain mb-2"
          />
          <h2 className="text-main text-sm mb-2">{product.name}</h2>
          <h2 className="font-medium text-lg">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h2>
          <div className="flex justify-between items-center my-2">
            <h3>{product.price} EGP</h3>
            <h3 className="flex items-center gap-1">
              <FaStar className="text-yellow-500" />
              {product.ratingsAverage}
            </h3>
          </div>
          <span className="absolute top-2 left-2 bg-orange-600 px-2 rounded-md text-white animate-pulse">
            new
          </span>
        </div>
      </Link>
      <button
        className="flex justify-center items-center bg-green-600 w-full py-1.5 my-2 
        mx-auto mb-2 text-white text-lg 
        hover:bg-orange-600 transition-all duration-500 rounded"
        onClick={userData ? handleAddToCart : navigate("/login")}
        disabled={isAddingToCart}
      >
        {isAddingToCart ? (
          <BiLoaderCircle className="animate-spin text-2xl ml-2" />
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
}
