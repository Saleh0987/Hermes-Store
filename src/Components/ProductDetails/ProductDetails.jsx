import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaStar } from 'react-icons/fa';
import Spinner from '../Spinner/Spinner';
import Slider from "react-slick";
import { CartContext } from '../Context/CartContext';
import { BiLoaderCircle } from 'react-icons/bi';

export default function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart, addToWishList, wishListDetails, removeItemFromWishList } = useContext(CartContext);

  async function detailsData() {
    try {
      const productResponse = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(productResponse.data.data);
      setLoading(false);
      const relatedResponse = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      const allProducts = relatedResponse.data.data;
      const related = allProducts.filter((product) =>
        product.category.name === productResponse.data.data.category.name && product._id !== id
      );
      setRelatedProducts(related);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  const isInWishlist = wishListDetails?.some((wishlistProduct) => wishlistProduct.id === productDetails.id);
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
    setProductDetails(clickedProduct);
  };

  const handleAddToCart = async () => {
    setAddingToCart(true);
    await addToCart(productDetails.id);
      setAddingToCart(false);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5, 
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto py-2">
      <h1 className="text-3xl font-semibold mb-4">Product Details</h1>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/4 rounded">
              {productDetails.image > 1 ? (
                <Slider infinite speed={1000} slidesToShow={1} slidesToScroll={1} autoplay autoplaySpeed={1000}>
                  {productDetails.images?.map((image, index) => 
                    <img src={image} key={index} alt={productDetails.title} className="lg:w-full w-[250px] h-auto" />
                  )}
                </Slider>
              ) : (
                <img src={productDetails.imageCover} alt={productDetails.title} className="lg:w-full w-[250px] h-auto" />
              )}
            </div>
            <div className="w-full md:w-3/4 p-4 relative">
              <div className="flex items-center flex-wrap gap-2 mb-6">
                <h2 className="font-medium text-lg">{productDetails.title}</h2>
                <FaHeart
                  onClick={toggleFavorite}
                  className={`text-2xl top-0 right-0 cursor-pointer transition-all mb-1 ${
                    isInWishlist ? 'text-red-500' : 'text-black'}`}
                />
              </div>
              <p className="text-gray-500 text-sm mb-6">{productDetails.description}</p>
              <p className="text-red-700 font-bold text-sm mb-6">{productDetails.category?.name}</p>
              <div className="flex justify-between items-center mb-6">
                <h3>{productDetails.price} EGP</h3>
                <h3 className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  {productDetails.ratingsAverage}
                </h3>
              </div>
              <button
                className="w-full flex justify-center bg-main py-1 text-white rounded"
                onClick={handleAddToCart}
                disabled={addingToCart}
              >
                {addingToCart ? <BiLoaderCircle className="animate-spin text-2xl ml-2" /> : 'Add to Cart'}
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-semibold my-4">Related Products</h1>

          <Slider {...settings}>
            {relatedProducts.map((product) => (
              <div
                className="w-full mt-8 card md:w-1/2 lg:w-1/3 cursor-pointer xl:w-1/5 rounded-lg p-2 shadow-md"
                key={product._id}
                onClick={() => handleRelatedProductClick(product)}
              >
                <img src={product.imageCover} alt={product.title} className="w-full h-[250px] object-contain" />
                <h3 className="font-medium my-2">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                <p className="text-gray-500">{product.category?.name}</p>
                <div className="flex items-center justify-between my-2">
                  <p>{product.price} EGP</p>
                  <p className="flex items-center justify-between">
                    {product.ratingsAverage}
                    <FaStar className="text-yellow-500" />
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </>
      )}
    </div>
  );
}