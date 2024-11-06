import { motion } from "framer-motion";
import { useState } from "react";

const Search = ({ isOpen, setIsOpenSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const closeModal = () => {
    setIsOpenSearch(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white rounded-lg p-6 w-96 shadow-lg relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-gray-600"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">¿Qué deseas buscar?</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none"
              placeholder="Escribe aquí..."
            />
            <button
              onClick={closeModal}
              className="bg-pink-500 text-white mt-4 px-4 py-2 rounded-lg w-full"
            >
              Buscar
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Search;
