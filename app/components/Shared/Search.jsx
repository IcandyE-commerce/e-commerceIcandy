const Search = ({ isOpen, onSearch, setIsOpenSearch }) => {

    const handleClose = () =>{
        console.log("Cerrado");
        setIsOpenSearch(false);
    }

    const handleSearch = () =>{
        console.log("Buscando");
    }

  return isOpen ? (
    <div className="lg:absolute right-10 lg:right-0 left-0 flex items-center justify-between lg:border  ">
      <button
        className="absolute top-0 left-0 h-full px-4"
        onClick={handleClose}
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
      <input
        type="text"
        placeholder="Buscar..."
        className="w-full px-20 py-2 text-black "
        onChange={onSearch}
      />
      <button
        className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        onClick={handleSearch}
      >
        Buscar
      </button>
    </div>
  ) : null;
};

export default Search;
