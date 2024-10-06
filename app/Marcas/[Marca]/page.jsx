'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MarcaaApi } from '../../components/api/Marcas';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

export default function Page() {
  const { Marca } = useParams();
  const MarcaCtrl = new MarcaaApi();
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // Estado para manejar el orden de los productos

  useEffect(() => {
    const fetchData = async () => {
      if (!Marca) return;
      try {
        const response = await MarcaCtrl.getBySlug(Marca);
        setProducts(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [Marca]);

  const handleAddToCart = (product) => {
    // Lógica para agregar el producto al carrito
    console.log(`Producto agregado al carrito: ${product.attributes.title}`);
  };

  const handleSortChange = (event) => {
    const sortValue = event.target.value;
    setSortOrder(sortValue);

    const sortedProducts = [...products].sort((a, b) => {
      if (sortValue === 'asc') {
        return a.attributes.price - b.attributes.price;
      } else if (sortValue === 'desc') {
        return b.attributes.price - a.attributes.price;
      }
      return 0;
    });

    setProducts(sortedProducts);
  };

  if (!Marca) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl">Cargando...</p>
      </div>
    );
  }

  const addToCart = (productId) => {
    console.log(`Producto agregado al carrito: ${productId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Productos en la categoría: {Marca}</h1>
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2">Ordenar por precio:</label>
        <select id="sort" value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Menor a mayor</option>
          <option value="desc">Mayor a menor</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            {product.attributes.screenshots && product.attributes.screenshots.data && (
              <Link key={product.id} href={`/Producto/${product.attributes.slug}`}>
                <Image
                  src={product.attributes.screenshots.data[0].attributes.url}
                  alt={product.attributes.title}
                  width={300}
                  height={300}
                  layout="intrinsic"
                  objectFit="contain"
                  className="rounded-lg mb-4 mx-auto"
                />
              </Link>
            )}
            <h2 className="title font-bold text-center uppercase">{product.attributes.title}</h2>
            <div className="price text-orange-300 font-bold text-center text-xl">
              ${product.attributes.price}
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className="add-to-cart mt-5 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center transition-colors duration-300 mx-auto text-lg"
            >
              <FontAwesomeIcon
                icon={faCartShopping}
                className="mr-2 fa-light fa-cart-shopping text-white"
              />
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
