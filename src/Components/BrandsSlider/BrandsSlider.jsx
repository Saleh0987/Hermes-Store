import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function brandsSlider() {

  const [brands, setBrands] = useState([]);

  async function getRecentbrands() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
      
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRecentbrands();
  }, []);

 var settings = {
    dots: false,
    infinite: true,
    speed: 2500,
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

    
  return (
    <>
      <h2 className="text-2xl lg:text-3xl font-semibold my-4 text-center lg:text-start">
        Brands
      </h2>
      <Slider {...settings}>
        {brands?.map((brand, index) => (
          <Link
            key={index}
            className="my-2 border border-gray-300 p-1 text-center cursor-pointer"
            to={`/brandsItem/${brand._id}`}
          >
            <img
              src={brand.image}
              className="w-full h-[100px]"
              alt={brand.name}
            />
          </Link>
        ))}
      </Slider>
    </>
  );
}
