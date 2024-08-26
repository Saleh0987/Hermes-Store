import React, { useEffect, useState } from 'react'
import style from './categoriesSlider.module.css'
import Slider from "react-slick";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function CategoriesSlider() {

  const [categories, setCategories] = useState([]);

  async function getRecentcategories() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRecentcategories();
  }, []);

 var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6, // Show 4 slides by default
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 4,
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



    
  return <>
    <h2 className="text-3xl font-semibold my-2">Categories</h2>
    <Slider {...settings}>
      {categories?.map((category, index) => <Link to={`/categoriesitems/${category._id}`} key={index} className='my-2 p-1 text-center cursor-pointer'>
        <img src={category.image} className='w-full h-[200px]' alt={category.name} />
        <h3 className='my-2'>{category.name}</h3>
      </Link>)}
    </Slider>
  
  </>
}
