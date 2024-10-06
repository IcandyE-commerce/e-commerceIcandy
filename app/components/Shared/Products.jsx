'use client';
import { useState, useEffect } from "react";
import { lilita } from "../../ui/font";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Productos } from "../api/index";
import Image from "next/image";
import Link from "next/link";
import "../../css/Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const productosCtrl = new Productos();

  useEffect(() => {
    (async () => {
      try {
        const response = await productosCtrl.getFavorites();
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const addToCart = (productId) => {
    console.log(`Producto agregado al carrito: ${productId}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-8">
      <section className="Buscado">
        <h1
          className={`${lilita.className} animated-title uppercase text-blue-400 text-center text-4xl lg:text-6xl`}
        >
          Lo mas buscado
        </h1>
      </section>
      <div className="mt-8 productos mb-24">
        <Slider {...settings}>
          {products.map((item, index) => (
            <div key={index} className="product">
              <div className="product-image-container">
                <Link key={item.id} href={`/Producto/${item.attributes.slug}`}>
                  <Image
                    src={item.attributes.cover.data.attributes.url}
                    alt="Producto"
                    layout="fill"
                    objectFit="contain"
                    className="product-image ml-16 xl:ml-0 2xl:ml-12"
                  />
                </Link>
              </div>
              <div className="title font-bold text-center uppercase">
                {item.attributes.title}
              </div>
              <div className="price text-orange-300 font-bold text-center text-3xl">
                $ {item.attributes.price}
              </div>
              <button
                onClick={() => addToCart(item.id)}
                className="add-to-cart mt-5 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center transition-colors duration-300 mx-auto text-2xl"
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="mr-2 fa-light fa-cart-shopping text-white"
                />
                Agregar
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
