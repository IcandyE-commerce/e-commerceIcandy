'use client';
import { useParams } from 'next/navigation';
import Header from "../../layout/navbar/page";
import Footer from "../../layout/footer/page";
import whatsapp from "../../../public/main/whatsapp.png";
import Image from "next/image";
import { Productos } from '../../components/api/Productos';
import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {useCart} from "../../hooks/useCart"
import { Cart } from "../../components/api/Cart"
import { Seo } from '../../components/Shared/Seo/Seo';

export default function Page() {
  const { Product } = useParams();
  const ProdctsCtrl = new Productos();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const CartCtrl =  new Cart();
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const fetchData = async () => {
      if (!Product) return;
      try { 
        const response = await ProdctsCtrl.getBySlug(Product);
        setProduct(response);
      
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [Product]);
  
  const addCartWrapper = async (producto)=>{
    console.log(producto)
    const response = await CartCtrl.addCart(producto)

    setLoading(true);

    setTimeout(() =>{
      setLoading(false)
    },500)
  }
  if (!product) {
    return <div className="flex justify-center items-center h-screen">
      <p className="text-2xl">Cargando...</p>
    </div>;
  }

  return (
    <>
    <Seo title = "dfgdfgdf"/>
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="product-image w-full max-w-2xl mx-auto lg:max-w-none">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="rounded-lg overflow-hidden"
            >
              {product.attributes.screenshots.data.map((screenshot, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={screenshot.attributes.url}
                    alt={`${product.attributes.title} - Image ${index + 1}`}
                    width={800}
                    height={800}
                    layout="responsive"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="product-info">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{product.attributes.title}</h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">${product.attributes.price} MXN</p>
            <p className="text-sm md:text-base mb-4">Los gastos de envío se calculan en la pantalla de pago.</p>
            
            <div className="flex items-center mb-4">
              <span className="mr-4">Cantidad</span>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 border rounded text-lg">-</button>
              <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-20 text-center mx-2 border rounded text-lg" />
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 border rounded text-lg">+</button>
            </div>
            <p className="text-sm md:text-base mb-4 text-yellow-600">¡Cómpralo Ahora! ¡Solo quedan {product.attributes.Cantidad} piezas disponibles!</p>
            <div className="mb-4 space-y-3">
            <button className="bg-white text-black border border-black px-6 py-3 rounded-lg w-full text-lg hover:bg-pink-300 transition-colors" onClick={() => addCartWrapper(product.id)} disabled={loading}>
               {loading ? 'Cargando...' : 'Agregar al carrito'}
            </button>

              <button className="bg-black text-white px-6 py-3 rounded-lg w-full text-lg hover:bg-gray-800 transition-colors">
                Comprar ahora
              </button>
              <button className="bg-white text-black border border-black px-6 py-3 rounded-lg w-full flex items-center justify-center text-lg hover:bg-pink-300 transition-colors">
                <span className="text-red-500 mr-2">♥</span> Añadir a la lista de deseos
              </button>
            </div>
            <p className="text-sm md:text-base">{product.attributes.summary}</p><br/>

            
            <p className="text-sm md:text-base">Realiza tus compras de manera segura en "La Zona Sweet". Paga tus compras con Tarjeta de crédito, débito, transferencia bancaria y depósitos en "OXXO".</p>
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 right-0 mb-4 mr-4 z-50">
        <a href="https://www.whatsapp.com/catalog/5217224755623/?app_absent=0" target="_blank" rel="noopener noreferrer">
          <Image src={whatsapp} alt="WhatsApp" className="w-12 h-12 md:w-16 md:h-16" />
        </a>
      </div>
    </>
  );
}