import React, { useContext, useEffect } from 'react';
import { CartContext } from '../Context/CartContext';
import { FaHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import emptyWishList from '../../assets/images/empty-whislist.jpg';

export default function WishList() {
  const { getWishListItems, addToCart, removeItemFromWishList, setWishListDetails, wishListDetails }
    = useContext(CartContext);

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const { data } = await getWishListItems();
        setWishListDetails(data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishList();
  }, [getWishListItems, setWishListDetails]);

  return (
    <div className="min-h-[100vh]">
      {wishListDetails?.length > 0 ? (
        <>
      <h1 className="my-2 text-4xl font-bold">Your Wishlist</h1>
        <ul className="flex flex-wrap justify-center my-2">
          {wishListDetails?.map((item, index) => {
            const isInWishlist = wishListDetails?.some((wishlistProduct) => wishlistProduct.id === item.id);
            return (
              <div key={index} className="w-full card md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-lg p-2 shadow-md relative">
                <FaHeart
                  onClick={() => removeItemFromWishList(item.id)}
                  className={`text-2xl top-0 right-0 cursor-pointer transition-all ${
                    isInWishlist ? 'text-red-500' : 'text-black'
                  }`}
                />
                <Link to={`/productdetails/${item.id}`}>
                  <div className="bg-white p-4">
                    <img src={item.imageCover} alt={item.title} className="w-full h-[250px] object-contain mb-2" />
                    <h2 className="text-main text-sm mb-2">{item.name}</h2>
                    <h2 className="font-medium text-lg">{item.title?.split(' ').slice(0, 2).join(' ')}</h2>
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
                  className="btn w-full bg-main py-1 text-white rounded"
                  onClick={() => addToCart(item.id)}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
          </ul>
          </>
      ) : (
          <div className=' flex justify-center items-center flex-col gap-2 my-4'>
      <h1 className="my-2 text-3xl font-bold capitalize">Your wishlist is empty.</h1>
      <img className='w-full h-[400px] object-contain'  src={emptyWishList} alt="emptyWishList" />
      </div>
      )}
    </div>
  );
}