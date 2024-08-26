import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaStar,FaHeart } from 'react-icons/fa';
import { CartContext } from '../Context/CartContext';
import Spinner from '../Spinner/Spinner';
import { BiLoaderCircle } from 'react-icons/bi';

export default function Products() {
  let { addToCart, addToWishList, wishListDetails, removeItemFromWishList } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loadingProducts, setLoadingProducts] = useState([]);
  
  async function getProducts() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setProducts(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

    useEffect(() => {
      getProducts();
    }, [])
  
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === '' || product.category.name === selectedCategory)
  );

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

    
  return <>
    
    <h1 className="text-3xl mt-5">Products</h1>
    <div className="flex justify-center gap-2 m-2 items-center flex-col md:flex-row">
           {/* Search input */}
      <div>
        <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mt-2 border rounded-md"
    />
      </div>
      <div>
    {/* Category filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full p-3 mt-2 border rounded-md"
      >
      <option value="">All Categories</option>
      <option value="Electronics">Electronics</option>
      <option value="Music">Music</option>
      <option value="Men's Fashion">Men's Fashion</option>
      <option value="Women's Fashion">Women's Fashion</option>
      <option value="SuperMarket">SuperMarket</option>
      <option value="Baby & Toys">Baby & Toys</option>
      <option value="Home">Home</option>
      <option value="Books">Books</option>
      <option value="Beauty & Health">Beauty & Health</option>
      <option value="Mobiles">Mobiles</option>
    </select>
      </div>
    </div>
    

    {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap justify-center my-2">
          {filteredProducts.length === 0 ? (
            <div className="h-[50vh] flex items-center justify-center">
              <p className="text-gray-600">No products in this category.</p>
            </div>
          ) : (
              filteredProducts.map((product, index) => {
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
        <div key={index} className="w-full card md:w-1/2 lg:w-1/3 xl:w-1/5 rounded-lg p-2 shadow-md relative">
          <FaHeart
                  onClick={toggleFavorite}
                  className={`text-2xl top-0 right-0 cursor-pointer transition-all ${isInWishlist ? 'text-red-500' : 'text-black'}`}/>
        <Link to={`/productdetails/${product.id}`}>
          <div className="bg-white p-4 relative">
          <img src={product.imageCover} alt={product.title} className="w-full h-[250px] object-contain mb-3 " />
          <h2 className="text-main text-sm mb-2">{product.category.name}</h2>
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
            )
            })
          )}
        </div>
      )}
  
  </>
}
