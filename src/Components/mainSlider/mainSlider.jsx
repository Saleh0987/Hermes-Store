import React, {useState} from "react";
import style from "./mainSlider.module.css";
import Slider from "react-slick";
import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 md:gap-0 m-2">
        <div className="md:w-3/4 rounded-tl-md rounded-bl-md">
          <Slider {...settings}>
            <img
              src={slide1}
              className="w-full h-[400px] object-cover rounded-tl-md rounded-bl-md"
              alt="slide1"
            />
            <img
              src={slide2}
              className="w-full h-[400px] object-cover rounded-tl-md rounded-bl-md"
              alt="slide2"
            />
            <img
              src={slide3}
              className="w-full h-[400px] object-cover rounded-tl-md rounded-bl-md"
              alt="slide3"
            />
          </Slider>
        </div>
        <div className="md:w-1/4 ">
          <img
            src={slide2}
            className="w-full h-[200px] object-cover rounded-tr-md"
            alt="slide2"
          />
          <img
            src={slide3}
            className="w-full h-[200px] object-cover rounded-br-md"
            alt="slide3"
          />
        </div>
      </div>
    </>
  );
}
