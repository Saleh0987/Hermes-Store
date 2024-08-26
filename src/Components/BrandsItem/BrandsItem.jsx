import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { Link, useParams } from 'react-router-dom';
import { FaHeart, FaStar } from 'react-icons/fa';
import { CartContext } from '../Context/CartContext';
import { BiLoaderCircle } from 'react-icons/bi';

const Brands = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [brandProducts, setBrandProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState([]);
  const { addToCart, addToWishList, wishListDetails, removeItemFromWishList } = useContext(CartContext);

  async function getBrand() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
      setBrand(data.data);
      let productsResponse = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`);
      setBrandProducts(productsResponse.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBrand();
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
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-4 text-center">Brand Details</h1>
      
      {loading ? (
        <Spinner />
      ) : brand ? (
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <img src={brand.image} alt={brand.name} className="w-full h-[250px] object-contain mb-2" />
          <p className="text-gray-700">{brand.name}</p>
        </div>
      ) : (
        <p>No brand found.</p>
      )}

      {loading ? (
        <Spinner />
      ) : brandProducts.length > 0 ? (
        <div className="flex flex-wrap justify-evenly my-4">
          {brandProducts.map((product, index) => {
            const isInWishlist = wishListDetails?.some((wishlistProduct) => wishlistProduct.id === product.id);
            const toggleFavorite = () => {
              if (isInWishlist) {
                removeItemFromWishList(product.id);
              } else {
                addToWishList(product.id);
              }
            };
            
            const isProductLoading = loadingProducts.includes(index);

            return (
              <div key={index} className="card w-full md:w-1/2 lg:w-1/3 xl:w-1/5 rounded-lg p-2 shadow-md relative">
                <FaHeart
                  onClick={toggleFavorite}
                  className={`text-2xl top-0 right-0 cursor-pointer transition-all ${isInWishlist ? 'text-red-500' : 'text-black'}`}/>
                <Link to={`/productdetails/${product.id}`}>
                  <div className="bg-white p-4">
                    <img src={product.imageCover} alt={product.title} className="w-full h-[250px] object-cover mb-2" />
                    <h2 className="text-main text-sm mb-2">{product.name}</h2>
                    <h2 className="font-medium text-lg">{product.title.split(' ').slice(0, 2).join(' ')}</h2>
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
                  className="w-full bg-main flex justify-center py-1 text-white rounded"
                  onClick={() => handleAddToCart(product.id, index)}
                  disabled={isProductLoading}>
                  {isProductLoading ? <BiLoaderCircle className="animate-spin text-2xl ml-2" /> : 'Add to Cart'}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">Products coming soon!</p>
      )}
    </div>
  );
};

export default Brands;