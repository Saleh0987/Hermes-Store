import React, {useContext, useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {FaHeart, FaStar} from "react-icons/fa";
import Spinner from "../Spinner/Spinner";
import Slider from "react-slick";
import {CartContext} from "../Context/CartContext";
import {BiLoaderCircle} from "react-icons/bi";
import { space } from "postcss/lib/list";

export default function ProductDetails() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToCartIds, setAddingToCartIds] = useState([]);
  const {addToCart, addToWishList, wishListDetails, removeItemFromWishList} =
    useContext(CartContext);

  async function detailsData() {
    try {
      const productResponse = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(productResponse.data.data);
      setLoading(false);
      const relatedResponse = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      const allProducts = relatedResponse.data.data;
      const related = allProducts.filter(
        (product) =>
          product.category.name === productResponse.data.data.category.name &&
          product._id !== id
      );
      setRelatedProducts(related);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  const isInWishlist = wishListDetails?.some(
    (wishlistProduct) => wishlistProduct.id === productDetails.id
  );
  const toggleFavorite = () => {
    if (isInWishlist) {
      removeItemFromWishList(productDetails.id);
    } else {
      addToWishList(productDetails.id);
    }
  };

  useEffect(() => {
    detailsData();
  }, [id]);

  const handleRelatedProductClick = (clickedProduct) => {
    navigate(`/productdetails/${clickedProduct._id}`);
  };

  const handleAddToCart = async (productId) => {
    if (productId === productDetails.id) {
      setAddingToCart(true);
      await addToCart(productId);
      setAddingToCart(false);
    } else {
      setAddingToCartIds((prev) => [...prev, productId]); // Add product ID to loading state
      await addToCart(productId);
      setAddingToCartIds((prev) => prev.filter((id) => id !== productId)); // Remove when done
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 2500,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {breakpoint: 1024, settings: {slidesToShow: 3, slidesToScroll: 3}},
      {breakpoint: 600, settings: {slidesToShow: 2, slidesToScroll: 2}},
      {breakpoint: 480, settings: {slidesToShow: 1, slidesToScroll: 1}},
    ],
  };

  return (
    <div className="container mx-auto pt-5">
      <div className="p-1 border-gray-300 border shadow-md rounded-md">
        <h1 className="text-2xl lg:text-3xl font-semibold my-4 text-center lg:text-start">
          Product Details
        </h1>

        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-center border shadow-md p-1">
              <div className="w-full lg:w-1/2 rounded ">
                {productDetails.image > 1 ? (
                  <Slider
                    infinite
                    speed={1000}
                    slidesToShow={1}
                    slidesToScroll={1}
                    autoplay
                    autoplaySpeed={1000}
                  >
                    {productDetails.images?.map((image, index) => (
                      <div className="px-2" key={index}>
                        <img
                          src={image}
                          alt={productDetails.title}
                          className="lg:w-full w-[250px] h-auto mx-auto "
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <img
                    src={productDetails.imageCover}
                    alt={productDetails.title}
                    className="max-w-[300px] mx-auto lg:w-[250px] h-auto border border-gray-300 rounded-md shadow-md"
                  />
                )}
              </div>
              <div className="w-full md:w-3/4 p-4">
                <div className="flex items-center justify-between flex-wrap mb-6">
                  <h2 className="font-medium text-lg lg:text-2xl">
                    {productDetails.title}
                  </h2>
                  <FaHeart
                    onClick={toggleFavorite}
                    className={`text-2xl cursor-pointer transition-all animate-pulse ${
                      isInWishlist ? "text-red-500" : "text-black"
                    }`}
                  />
                </div>
                <p className="text-red-700 font-bold text-xl mb-6">
                  {productDetails.category?.name}
                </p>
                <p className="text-gray-500 text-sm lg:text-xl mb-6">
                  {productDetails.description}
                </p>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl lg:text-2xl">
                    {productDetails.price} EGP
                  </h3>
                  <h3 className="flex items-center gap-1 bg-white border-gray-300 border py-0.5 px-1 rounded-md shadow-md">
                    <FaStar className="text-yellow-500" />
                    {productDetails.ratingsAverage}
                  </h3>
                </div>
                <button
                  className="flex justify-center items-center bg-green-600 min-w-[200px] 
                    min-h-[40px] lg:min-w-[250px] lg:min-h-[40px] m-auto text-white text-xl 
                    hover:bg-orange-600 transition-all duration-500 rounded"
                  onClick={() => handleAddToCart(productDetails.id)}
                  disabled={addingToCart}
                >
                  {addingToCart ? (
                    <BiLoaderCircle className="animate-spin text-2xl ml-2" />
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            </div>

            <h1 className="text-2xl lg:text-3xl font-semibold mb-4 text-center lg:text-start my-4">
              Related Products
            </h1>

            <div className="border p-2">
              <Slider {...settings}>
                {relatedProducts.map((product) => (
                  <div
                    className="p-2 border"
                    key={product._id}
                    onClick={() => handleRelatedProductClick(product)}
                  >
                    <div className="w-full cursor-pointer rounded-lg bg-white shadow-md relative">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full h-[250px] object-contain"
                      />
                      <h3 className="font-medium my-2 px-2">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <p className="text-gray-500 px-2">
                        {product.category?.name}
                      </p>
                      <div className="flex items-center justify-between my-2 px-2">
                        <p>{product.price} EGP</p>
                        <p className="flex items-center justify-between">
                          {product.ratingsAverage}
                          <FaStar className="text-yellow-500 ml-1" />
                        </p>
                        <span className="absolute top-0 left-0 bg-orange-600 px-3 py-0.5 rounded-md text-white animate-pulse">
                          sale
                        </span>
                      </div>

                      <button
                        className="flex justify-center items-center bg-green-600 w-full py-1.5 my-2 mx-auto mb-2 text-white text-lg hover:bg-orange-600 transition-all duration-500 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product._id);
                        }}
                        disabled={addingToCartIds.includes(product._id)}
                      >
                        {addingToCartIds.includes(product._id) ? (
                          <BiLoaderCircle className="animate-spin text-xl ml-2" />
                        ) : (
                          "Add to Cart"
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
