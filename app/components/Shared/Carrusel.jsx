'use client'
import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/Carrusel.css";

export default function Carrusel() {
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`arrow prev-arrow ${className}`} onClick={onClick} />
    );
  };

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`arrow next-arrow ${className}`} onClick={onClick} />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, 
    autoplaySpeed: 5000, 
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          arrows: false, 
          autoplay: true, 
        },
      },
    ],
  };

  return (
    <div className="carousel-container my-8">
      <Slider className="carousel" {...settings} ref={sliderRef}>
        <div>
          <img
            src="https://wallpapercave.com/wp/wp11661628.jpg"
            alt="Imagen 2"
            className="carousel-image"
          />
        </div>
        <div>
          <img
            src="https://wallpapercave.com/wp/wp10447796.jpg"
            alt="MRBeast"
            className="carousel-image"
          />
        </div>

        <div>
          <img
            src="https://wallpapercave.com/wp/wp11632927.jpg"
            alt="Pringles"
            className="carousel-image"
          />
        </div>

        <div>
          <img
            src="https://wallpapercave.com/wp/wp2023004.png"
            alt="Dortios"
            className="carousel-image"
          />
        </div>
        <div>
          <img
            src="https://wallpapercave.com/wp/wp10121230.jpg"
            alt="Dulces"
            className="carousel-image"
          />
        </div>
      </Slider>
    </div>
  );
}
