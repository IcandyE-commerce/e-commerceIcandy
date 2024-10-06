"use client";
import Header from "./layout/navbar/page";
import Footer from "./layout/footer/page";
import Carrusel from "../app/components/Shared/Carrusel";
import Banner from "./components/Shared/Banner";
import Products from "./components/Shared/Products.jsx";
import whatsapp from "../public/main/whatsapp.png";
import Image from "next/image";


export default function Home() {
  return (
    <>
    
          <Header />
       
      
      <Carrusel />
      <Banner />
      <Products />
      <Footer />
      <div className="fixed bottom-0 right-0 mb-8 mr-8 z-50">
        <a
          href="https://www.whatsapp.com/catalog/5217224755623/?app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={whatsapp} alt="WhatsApp" className="w-16 h-16" />
        </a>
      </div>
    </>
  );
}
