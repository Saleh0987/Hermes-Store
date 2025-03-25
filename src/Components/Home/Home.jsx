import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios';
import RecentProducts from '../RecentProducts/RecentProducts';
import Spinner from '../Spinner/Spinner';
import CategoriesSlider from '../categoriesSlider/categoriesSlider';
import MainSlider from '../mainSlider/mainSlider';
import BrandSlider from '../BrandsSlider/BrandsSlider';

export default function Home() {
  const [loading, setLoading] = useState(true); 
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(15); 

  async function getRecentProducts() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setProducts(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

    useEffect(() => {
      getRecentProducts();
    }, [])
    
  const handleShowMore = () => {
    setVisibleProducts(prevVisible => prevVisible + 15); 
  };
    
  return <>
    <div className="container mx-auto my-8">
      <MainSlider />
      
      <CategoriesSlider />

      <h2 className="text-2xl lg:text-3xl font-semibold my-4 text-center lg:text-start">Recent Products</h2>
        {loading ? (
          <Spinner /> 
        
      ) : (
        <div className="flex flex-wrap justify-center my-2">
          {products.slice(0, visibleProducts).map((product, index) => (
            <RecentProducts key={index} product={product} />
          ))}
        </div>
      )}
      {visibleProducts < products.length && (
        <div className="flex items-center justify-center">
          <button onClick={handleShowMore}
            className="btn w-[20%] mt-7 bg-main py-1 text-white rounded">
          Show More
        </button>
        </div>
      )}
      
      <BrandSlider />
    </div>
  
  </>
}
