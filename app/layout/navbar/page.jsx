"use client";

import Image from "next/image";
import imagecorazones from "/public/main/corazones.png";
import iCandy from "/public/main/iCandy.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser,faShoppingCart,faSearch,faHeart,} from "@fortawesome/free-solid-svg-icons";
import iCandyFase from "/public/main/IcandyFrase.png";
import Link from "next/link";
import { lilita } from "../../ui/font";
import { useState, useRef, useEffect,useContext  } from "react";
import MobileNavMenu from "../../components/Shared/MobileNavbMenu";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import EnhancedDropdown from './EnhancedDropdown/EnhancedDropdown';
import { Label } from "semantic-ui-react";
import "../../css/Navbar.css";
import "../../css/Search.css";
import Search from "../../components/Shared/Search";
import { useMediaQuery } from "@react-hook/media-query";
import { ToastContainer, toast } from "react-toastify";
import {CategoriasContext } from "../../context/CategoriasContext"
import {MarcasContext} from "../../context/MarcasContext";

const Header = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const loginDropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const {total} = useCart();
  const isPhone = useMediaQuery("(max-width: 480px)");
  const { categorias, error } = useContext(CategoriasContext);
  const { marcas, errorMarcas } = useContext(MarcasContext);
  
  const [showCategoriasDropdown, setShowCategoriasDropdown] = useState(false);
  const [showMarcasDropdown, setShowMarcasDropdown] = useState(false);
  const marcasRef = useRef(null);
  const [isMarcasOpen, setIsMarcasOpen] = useState(false);
  const [isCategoriasOpen, setIsCategoriasOpen] = useState(false);
  const categoriasRef = useRef(null);

  const toggleMarcas = () => setIsMarcasOpen(!isMarcasOpen);
  const toggleCategorias = () => setIsCategoriasOpen(!isCategoriasOpen);

  const handleLoginClick = () => {
    setShowLoginDropdown((prevState) => !prevState);
  };
 useEffect(() => {
    const handleClickOutside = (event) => {
      if (marcasRef.current && !marcasRef.current.contains(event.target)) {
        setIsMarcasOpen(false);
      }
      if (categoriasRef.current && !categoriasRef.current.contains(event.target)) {
        setIsCategoriasOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClickOutside = (event) => {
    if (
      loginDropdownRef.current &&
      !loginDropdownRef.current.contains(event.target)
    ) {
      setShowLoginDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSearch = () => {
    setIsOpenSearch(!isOpenSearch);
  };

  const handleLogout = ()=>{
    logout();
    toast.success("Sesion Cerrada")
  }
  return (
    <>
  
    <div className="relative mt-10">
      <div className="fixed-message">
      <ToastContainer/>

        <div className="mensaje text-center py-1">
          <h1
            className={`${lilita.className} text-sm lg:text-2xl uppercase text-white animate-slide`}
          >
            Precio Especial apartir de 4000 mil pesos
          </h1>
        </div>
      </div>

      <nav className="lg:absolute mt-3 right-10 lg:right-12 left-12 bg-white text-pink-500 flex items-center justify-between px-4 lg:border border-pink-700 rounded-sm shadow-xl z-10 mx-auto">
        {isPhone && <MobileNavMenu />}{" "}
        {!isPhone && (
          <>
            <div className="logo w-16 lg:w-14 ">
              <Image src={iCandy} alt="Logo de ICandy" />
            </div>

            <ul className="hidden lg:flex justify-center w-full space-x-16 font-bold items-center text-sm lg:text-xl text-pink-500">
            <li>
                <Link href="/" className="text-pink-600">
                  HOME
                </Link>
              </li>
              {/* <li>
                <Link href="/Productos" className="text-pink-600">
                  PRODUCTOS
                </Link>
              </li> */}
    {marcas && marcas.data && (
          <EnhancedDropdown
            title="MARCAS"
            items={marcas.data}
            baseUrl="/Marcas"
          />
        )}

{categorias && categorias.data && (
          <EnhancedDropdown
            title="CATEGORIAS"
            items={categorias.data}
            baseUrl="/Categorias"
          />
        )}
                      </ul>

            {/* Iconos */}
            <div className="iconos flex space-x-12">
              <div className="relative" ref={loginDropdownRef}>
                <FontAwesomeIcon
                  icon={faUser}
                  className="hidden lg:flex Login h-7 lg:h-9 text-black cursor-pointer"
                  onClick={handleLoginClick}
                />
                {showLoginDropdown && (
                  <div className="absolute bg-white shadow-md rounded-md py-2 mt-2 -m-11 z-2">
                    {user ? (
                      <div>
                        <Link href="/MiCuenta/Cuenta" className="block px-3 py-1 hover:bg-gray-200 ">
                          Mi Cuenta
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="block px-3 py-1 hover:bg-gray-200 hover:text-pink-500"
                        >
                          Cerrar Sesión
                        </button>
                      </div>
                    ) : (
                      <>
                        <Link
                          href="/join/login"
                          className="block px-3 py-1 hover:bg-gray-200"
                        >
                          Iniciar sesión
                        </Link>
                        <Link
                          href="/join/register"
                          className="block px-4 py-2 hover:bg-gray-200"
                        >
                          Registrarse
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
              <Link href="/Cart/Productos?step=1" className="relative">
                <FontAwesomeIcon icon={faShoppingCart} className="h-6 lg:h-9" />
                {total > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/4 -translate-y-1/4">
                    {total}
                  </span>
                )}
              </Link>
              <FontAwesomeIcon
                icon={faHeart}
                className="h-7 lg:h-9 text-black"
              />
              <button onClick={toggleSearch}>
                <FontAwesomeIcon
                  icon={faSearch}
                  className="search h-7 lg:h-9"
                />
              </button>
            </div>
            <Search isOpen={isOpenSearch} setIsOpenSearch={setIsOpenSearch} />
          </>
        )}
      </nav>

      <Image
        src={imagecorazones}
        alt="Corazones de Dulces"
        className="Corazones"
      />

      <div className="absolute inset-0 flex items-center justify-center mt-24">
        <div className="slogan text-white text-center">
          <h1
            className={`${lilita.className} font-bold text-2xl md:text-5xl lg:text-5xl text-white`}
          >
            Los Mejores Dulces y Botanas aquí en
          </h1>
          <Image
            src={iCandyFase}
            alt="Corazones de Dulces"
            className="IcandyFrase w-52 mx-24 lg:w-96 lg:mx-44"
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Header;
