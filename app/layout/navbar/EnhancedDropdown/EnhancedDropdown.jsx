'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons';

const EnhancedDropdown = ({ title, items, baseUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative group"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dropdown Trigger */}
      <button
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none transition duration-300 px-5 py-2 rounded-md hover:bg-gray-100"
      >
        <span className=" text-pink-600 font-semibold ">{title}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`h-4 w-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div 
          className="absolute left-0 mt-2 w-80 rounded-lg shadow-lg bg-white ring-1 ring-gray-200 z-20 
            transition-transform duration-300 ease-in-out transform scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100"
        >
          <div className="py-6 px-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <ul className="grid grid-cols-2 gap-6">
              {items.map((item) => (
                <li key={item.attributes.slug} className="flex items-center space-x-3">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-yellow-400"
                  />
                  <Link
                    href={`${baseUrl}/${item.attributes.slug}`}
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition duration-200 ease-in-out"
                  >
                    {item.attributes.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedDropdown;
