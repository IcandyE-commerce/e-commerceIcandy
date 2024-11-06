import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch, faHeart, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import iCandy from "/public/main/iCandy.png";
import Image from "next/image";
import { useCart } from "../../hooks/useCart"; 
import { useContext } from "react";
import { CategoriasContext } from "../../context/CategoriasContext";
import { MarcasContext } from "../../context/MarcasContext";

const MobileNavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMarcasOpen, setIsMarcasOpen] = useState(false); // Control para abrir/cerrar submenú de Marcas
  const [isCategoriasOpen, setIsCategoriasOpen] = useState(false); // Control para abrir/cerrar submenú de Categorías
  const menuRef = useRef(null);
  const { user, logout } = useAuth();
  const { total } = useCart();
  const { categorias } = useContext(CategoriasContext);
  console.log(categorias);
  
  const { marcas } = useContext(MarcasContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMarcas = () => {
    setIsMarcasOpen(!isMarcasOpen);
  };

  const toggleCategorias = () => {
    setIsCategoriasOpen(!isCategoriasOpen);
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
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
          {total > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/4 -translate-y-1/4">
              {total}
            </span>
          )}
        </button>
        <button>
          <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
        </button>
      </div>

      <div className={`lg:hidden fixed inset-0 bg-white z-50 w-2/3 transition-transform ease-in-out duration-300 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <ul className="flex flex-col items-start justify-start h-full pt-10 px-4 space-y-4">
          <li className="w-full py-2">
            <Link href="/">HOME</Link>
          </li>
          
          {/* Marcas con Submenú */}
          <li className="w-full py-2">
            <button onClick={toggleMarcas} className="flex items-center justify-between w-full">
              Marcas <FontAwesomeIcon icon={faChevronDown} className={`ml-2 transition-transform ${isMarcasOpen ? "rotate-180" : ""}`} />
            </button>
            {isMarcasOpen && (
              <ul className="mt-2 space-y-2">
                {marcas && marcas.data && marcas.data.map((marca) => (
                  <li key={marca.id} className="pl-4">
                    <Link href={`/Marcas/${marca.attributes.slug}`}>{marca.attributes.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Categorías con Submenú */}
          <li className="w-full py-2">
            <button onClick={toggleCategorias} className="flex items-center justify-between w-full">
              Categorías <FontAwesomeIcon icon={faChevronDown} className={`ml-2 transition-transform ${isCategoriasOpen ? "rotate-180" : ""}`} />
            </button>
            {isCategoriasOpen && (
              <ul className="mt-2 space-y-2">
                {categorias && categorias.data && categorias.data.map((categoria) => (
                  <li key={categoria.id} className="pl-4">
                    <Link href={`/Categorias/${categoria.attributes.slug}`}>{categoria.attributes.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {user ? (
            <>
              <li className="w-full py-2">
                <Link href="/MiCuenta/Cuenta">MI CUENTA</Link>
              </li>
              <li className="w-full py-2">
                <button onClick={logout}>CERRAR SESIÓN</button>
              </li>
            </>
          ) : (
            <>
              <li className="w-full py-2">
                <Link href="/join/login">INICIAR SESIÓN</Link>
              </li>
              <li className="w-full py-2">
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
