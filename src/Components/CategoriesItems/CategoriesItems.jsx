import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import { FaHeart, FaStar } from 'react-icons/fa';
import { CartContext } from '../Context/CartContext';
import { BiLoaderCircle } from 'react-icons/bi';

export default function CategoriesItems() {
  const { id } = useParams();
  const [categories, setCategories] = useState(null);
  const [categoriesItems, setCategoriesItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [brandProducts, setBrandProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState([]);

  let { addToCart, addToWishList, wishListDetails, removeItemFromWishList  } = useContext(CartContext);

  async function getCategoriesItems() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
      setCategories(data.data);
      let productsResponse = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`);
      setCategoriesItems(productsResponse.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }

  useEffect(() => {
    getCategoriesItems();
  }, [id]);

   const handleAddToCart = async (productId, index) => {
    setLoadingProducts((prevLoading) => [...prevLoading, index]);
    try {
      await addToCart(productId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProducts((prevLoading) => prevLoading.filter((item) => item !== index));
    }
  };

  return (
    <>
      <h1 className="text-2xl lg:text-3xl font-semibold my-4 text-center lg:text-start">
        Categories Items
      </h1>
      <div className="my-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link
            key={categories?._id}
            className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={categories?.image}
              alt={categories?.name}
              className="w-full h-[250px] object-cover mb-2"
            />
            <p className="text-center text-gray-700">{categories?.name}</p>
          </Link>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : categoriesItems?.length > 0 ? (
        <div className="flex flex-wrap justify-evenly my-4">
          {categoriesItems?.map((product, index) => {
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
            const isProductLoading = loadingProducts.includes(index);

            return (
              <div
                key={index}
                className="card w-full md:w-1/2 lg:w-1/4 xl:w-1/5 rounded-lg p-2 shadow-md relative"
              >
                <FaHeart
                  onClick={toggleFavorite}
                  className={`text-2xl top-0 right-0 cursor-pointer transition-all ${
                    isInWishlist ? "text-red-500" : "text-black"
                  }`}
                />
                <Link to={`/productdetails/${product.id}`}>
                  <div className="bg-white p-4 ">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-full h-[250px] object-cover mb-2"
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
                  </div>
                </Link>
                <button
                  className="flex justify-center items-center bg-green-600 w-full py-1.5 my-2 
                  mx-auto mb-2 text-white text-lg 
                  hover:bg-orange-600 transition-all duration-500 rounded"
                  onClick={() => handleAddToCart(product.id, index)}
                  disabled={isProductLoading}
                >
                  {isProductLoading ? (
                    <BiLoaderCircle className="animate-spin text-2xl ml-2" />
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">Products coming soon!</p>
      )}
    </>
  );
}
