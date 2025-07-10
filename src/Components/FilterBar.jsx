import React, { useEffect, useState } from 'react';
import { Filter, Tag } from 'lucide-react';

const categories = [
  'All Prompts',
  'Business',
  'RepoPrompt',
  'Writing',
  'Programming',
  'Marketing',
  'Design',
  'Productivity',
  'Cursor Rules',
  'MetaPrompting',
  'Personal Growth',
];

export default function FilterBar({ selectedCategory, setSelectedCategory }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setDarkMode(isDark);
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`transition-colors duration-300 rounded-xl p-6 shadow-inner mb-10 m-4 sm:m-6 md:m-10 pt-4 border backdrop-blur-md
        ${darkMode
          ? 'bg-[#000000] border-[#2A2830] hover:shadow-[0_0_30px_0_rgba(102,45,145,0.8)] hover:border-violet-500/50'
          : 'bg-white border-gray-200 hover:shadow-md hover:border-purple-400/50'}`}
    >
      <div className="flex items-center gap-2 text-sm mb-4">
        <Filter size={18} className="text-violet-500" />
        <span
          className={`font-semibold text-lg ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          Filter by category
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm mb-4">
        <Tag size={16} className="text-violet-500" />
        <span className={`${darkMode ? 'text-white' : 'text-gray-700'} text-base`}>
          Filter by:
        </span>
      </div>

      <div className="flex flex-wrap gap-3 justify-start">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border font-semibold text-sm sm:text-base transition-all duration-200
              ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-[0_4px_8px_rgba(238,130,238,0.4)]'
                  : darkMode
                    ? 'bg-[#1C1B23] border-[#2A2830] text-white hover:border-violet-500 hover:shadow-[0_0_8px_rgba(238,130,238,0.4)]'
                    : 'bg-gray-100 border-gray-300 text-black hover:border-purple-400 hover:shadow-md'
              }`}
          >
            {selectedCategory === cat && <span className="mr-1">✔</span>}
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
