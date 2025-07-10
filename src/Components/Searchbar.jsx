import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ searchTerm, setSearchTerm, selectedOption, setSelectedOption }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { label: 'Newest', color: 'bg-green-400' },
    { label: 'Highest Rated', color: 'bg-purple-400' },
    { label: 'Most Forked', color: 'bg-blue-400' },
    { label: 'Most Used', color: 'bg-pink-400' },
  ];

  // Watch for dark mode changes via <html> class or localStorage
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setDarkMode(isDark);
    };

    // Initial check
    checkTheme();

    // Watch for theme changes using MutationObserver
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={`flex flex-col md:flex-row md:items-center justify-between gap-4 m-4 px-4 pt-4 rounded-xl 
        shadow-inner transition-shadow duration-200
        ${darkMode ? 'bg-[#000000] border-[#2A2830] text-white' : 'bg-white border-gray-300 text-black'}
        border backdrop-blur-md`}
    >
      {/* Search Box */}
      <div className={`flex items-center w-full rounded-xl px-3 py-3 mb-4 transition-shadow duration-200 border 
        ${darkMode 
          ? 'bg-[#15141A] border-[#2A2830] shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] hover:shadow-[0_4px_14px_0_rgba(124,58,237,0.2)]' 
          : 'bg-white border-gray-300 shadow-sm hover:shadow-md'}
        focus-within:border-violet-400`}
      >
        <Search className="text-violet-500 mr-3" size={25} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, description, category or prompt text..."
          className={`bg-transparent outline-none w-full mb-1 text-base sm:text-lg
            ${darkMode ? 'text-white placeholder-gray-400' : 'text-black placeholder-gray-500'}`}
        />
      </div>

      {/* Sort Dropdown */}
      <div className="relative w-full md:w-auto" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`flex items-center justify-between gap-2 px-4 py-1 pt-3 rounded-xl border transition w-full md:w-48
            ${darkMode 
              ? 'bg-[#1D1B24] border-[#2A2830] text-white hover:shadow-[0px_0px_60px_0px_rgba(102,45,145,0.9)]' 
              : 'bg-gray-100 border-gray-300 text-black hover:shadow-md'}
          `}
        >
          <span className={`w-3 h-3 rounded-full ${
            options.find((opt) => opt.label === selectedOption)?.color
          }`} />
          <span className="text-base p-1">{selectedOption}</span>
          <svg className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-black'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className={`absolute bottom-0 mb-2 w-full md:w-48 rounded-xl border text-sm shadow-xl z-50 
            ${darkMode ? 'bg-[#1C1B23] border-[#2A2830]' : 'bg-white border-gray-300'}`}
          >
            <ul className={`divide-y ${darkMode ? 'divide-[#2A2830]' : 'divide-gray-200'}`}>
              {options.map(({ label, color }) => (
                <li
                  key={label}
                  onClick={() => {
                    setSelectedOption(label);
                    setIsDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition text-base
                    ${label === selectedOption 
                      ? (darkMode ? 'bg-[#2A2830] text-white' : 'bg-gray-200 text-black')
                      : (darkMode ? 'hover:bg-[#2A2830] text-white' : 'hover:bg-gray-100 text-black')}
                  `}
                >
                  <span className={`w-3 h-3 rounded-full ${color}`} />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
