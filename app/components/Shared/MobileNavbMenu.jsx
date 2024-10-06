import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShoppingCart,faSearch, faHeart, } from "@fortawesome/free-solid-svg-icons";
import iCandy from "/public/main/iCandy.png";
import Image from "next/image";

const MobileNavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={menuRef} className="flex items-center justify-between h-full">   
     
      <div className="flex items-center space-x-16">
         <button onClick={toggleMenu} className="lg:hidden">
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
        <button>
          <FontAwesomeIcon icon={faHeart} className="h-5 w-5" />
        </button>
        <button>
          <Image src={iCandy} alt="Logo de ICandy" width={45} height={45} />
        </button>
        <button>
          <FontAwesomeIcon icon={faShoppingCart} className="h-5 w-5" />
        </button>
        <button>
          <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
        </button>
      </div>
      <div
        className={`lg:hidden fixed inset-0 bg-white z-50 w-1/2 transition-transform ease-in-out duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center justify-start h-full pt-10">
          <li className="border-b-2 border-gray-300 w-full py-2 text-left">
            <Link href="/">HOME</Link>
          </li>
          <li className="border-b-2 border-gray-300 w-full py-2 text-left">
            <Link href="/Productos">PRODUCTOS</Link>
          </li>
          <li className="border-b-2 border-gray-300 w-full py-2 text-left">
            <Link href="/Marcas">MARCAS</Link>
          </li>
          <li className="border-b-2 border-gray-300 w-full py-2 text-left">
            <Link href="/CATEGORIAS">CATEGORIAS</Link>
          </li>
          {user ? (
            <div className="border-b-2 border-gray-300 w-full py-2 text-left">
               <li className="border-b-2 border-gray-300 w-full py-2 text-left">
              <Link href="/MiCuenta/Cuenta"> MI CUENTA</Link>
            </li>
               <li className="  w-full py-2 text-left">
              <button onClick={logout}>CERRAR SESIÓN</button>
            </li>
            </div>
           
          ) : (
            <>
              <li className="border-b-2 border-gray-300 w-full py-2 text-left">
                <Link href="/join/login">INICIAR SESIÓN</Link>
              </li>
              <li className="border-b-2 border-gray-300 w-full py-2 text-left">
                <Link href="/join/register">REGISTRARSE</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MobileNavMenu;
