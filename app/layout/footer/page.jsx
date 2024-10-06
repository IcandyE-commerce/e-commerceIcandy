import React from "react";
import Image from "next/image";
import iCandy from "/public/main/iCandy.png";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="mr-5">
          <Image
            src={iCandy}
            alt="iCandy"
            className="IcandyLogo w-44 mx-8 my-5"
          />
        </div>
        <div className="flex flex-col my-7">
          <a href="#" className="mb-4 text-black underline">
            Términos de servicio
          </a>
          <a href="#" className="mb-4 text-black underline">
            Políticas de envío
          </a>
          <a href="#" className="mb-4 text-black underline">
            Aviso de privacidad
          </a>
          <a href="#" className="mb-4 text-black underline">
            Política de rembolso
          </a>
        </div>
      </div>
      <div className="flex justify-center items-center my-4">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-2xl text-gray-600 hover:text-gray-900"
        >
          <FaFacebook />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-2xl text-gray-600 hover:text-gray-900"
        >
          <FaTwitter />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-2xl text-gray-600 hover:text-gray-900"
        >
          <FaInstagram />
        </a>
      </div>
      <p className="text-center text-gray-600">
        &copy; {new Date().getFullYear()} iCandy. Todos los derechos
        reservados.
      </p>
    </footer>
  );
}
