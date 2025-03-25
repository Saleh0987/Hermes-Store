import React, {useContext, useEffect, useState} from "react";
import style from "./Products.module.css";
import axios from "axios";
import {Link} from "react-router-dom";
import {FaStar, FaHeart} from "react-icons/fa";
import {CartContext} from "../Context/CartContext";
import Spinner from "../Spinner/Spinner";
import {BiLoaderCircle} from "react-icons/bi";

export default function Products() {
  let {addToCart, addToWishList, wishListDetails, removeItemFromWishList} =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loadingProducts, setLoadingProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  async function getProducts() {
    try {
      let {data} = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  // Filter products based on search and category
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "" || product.category.name === selectedCategory)
  );

  // Calculate pagination
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleAddToCart = async (productId, index) => {
    const adjustedIndex = startIndex + index;
    setLoadingProducts((prevLoading) => [...prevLoading, adjustedIndex]);
    try {
      await addToCart(productId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProducts((prevLoading) =>
        prevLoading.filter((item) => item !== adjustedIndex)
      );
    }
  };

  // Pagination controls with scroll to top
  const goToPage = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages)); 
    setCurrentPage(newPage);
    window.scrollTo({top: 0, behavior: "smooth"}); 
  };

  return (
    <>
      <h1 className="text-2xl lg:text-3xl font-semibold my-4 text-center lg:text-start">
        All Products
      </h1>
      <div className="flex justify-between items-center flex-col gap-4 md:flex-row">
        {/* Search input */}
        <div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[250px] lg:w-[450px] p-2 border rounded-md outline-none"
          />
        </div>
        <div>
          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-1 border rounded-md"
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
        <>
          <div className="flex flex-wrap justify-center my-2">
            {currentProducts.length === 0 ? (
              <div className="h-[50vh] flex items-center justify-center">
                <p className="text-gray-600 text-xl lg:text-2xl">
                  No products in this category.
                </p>
              </div>
            ) : (
              currentProducts.map((product, index) => {
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

                const isProductLoading = loadingProducts.includes(
                  startIndex + index
                );

                return (
                  <div
                    key={product.id}
                    className="w-full card md:w-1/2 lg:w-1/4 xl:w-1/5 rounded-lg p-2 shadow-md relative"
                  >
                    <FaHeart
                      onClick={toggleFavorite}
                      className={`text-2xl top-0 right-0 cursor-pointer transition-all ${
                        isInWishlist ? "text-red-500" : "text-black"
                      }`}
                    />
                    <Link to={`/productdetails/${product.id}`}>
                      <div className="bg-white p-4 relative">
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className="w-full h-[250px] object-contain mb-3"
                        />
                        <h2 className="text-main text-sm mb-2">
                          {product.category.name}
                        </h2>
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
              })
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
