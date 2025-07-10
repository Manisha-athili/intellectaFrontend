import React, { useState, useEffect } from 'react';
import { GitFork, Star, Link, MoveUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useDarkMode } from '../Components/CommonUI/DarkModeContext'; 

export default function PromptCard({
  id,
  title,
  description,
  categories,
  copiedCount,
  forkCount,
  stars,
  createdAt,
  username,
  author ,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { darkMode } = useDarkMode();
  //  const userEmail = localStorage.getItem("email");
  const navigate = useNavigate();

  
  const timeAgo = createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : '';

  return (
    <div
      onClick={() => navigate(`/prompts/${id}`)}
      className={`cursor-pointer relative rounded-2xl shadow-md p-5 w-full max-w-md transition-all duration-300 ease-in-out hover:scale-[1.05] overflow-hidden border-2 ${
        darkMode
          ? 'bg-gradient-to-br from-[#1c0f31] to-[#120824] text-white border-[#3e275c]'
          : 'bg-white text-black border-gray-200'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated top border */}
      <div
        className={`
        absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-purple-400
        transition-all duration-300 ease-in-out
        ${isHovered ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
      `}
      />

      {/* Card content */}
      <div className="relative z-10">
        <div className="flex justify-between">
          <h2
            className={`text-xl font-bold mb-2 transition-colors duration-300 ${
              darkMode ? 'hover:text-violet-300' : 'hover:text-purple-700'
            }`}
          >
            {title}
          </h2>

          <div className="flex items-center text-sm text-gray-400 mb-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 hover:text-yellow-500">
                <Star size={16} className="text-yellow-400" /> {stars.length}
              </span>
              <span className="flex items-center gap-1 hover:text-blue-500">
                <GitFork size={16} className="text-blue-400" /> {forkCount}
              </span>
              <span className="flex items-center gap-1 hover:text-purple-500">
                <Link size={16} className="text-purple-400" /> {copiedCount}
              </span>
            </div>
          </div>
        </div>

        <p
          className={`text-sm font-medium mb-4 transition-colors duration-300 ${
            darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-black'
          }`}
        >
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {categories?.map((cat) => (
            <span
              key={cat}
              className={`text-sm font-medium px-3 py-1 rounded-full border transition-all duration-300 ${
                darkMode
                  ? 'bg-[#2e1b4b] text-violet-300 border-violet-300/30 hover:bg-[#3d2563] hover:border-violet-400 hover:text-white'
                  : 'bg-gray-100 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-400 hover:text-black'
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        <div
          className={`border-t pt-3 text-xs flex justify-between items-center transition-colors duration-300 ${
            darkMode ? 'border-[#3e275c] text-gray-500' : 'border-gray-300 text-gray-500'
          }`}
        >
          <span className={darkMode ? 'hover:text-violet-300' : 'hover:text-purple-700'}>
            by {username}
          </span>
          <div className="flex items-center transition-transform duration-300 hover:translate-x-1">
            <span className={darkMode ? 'mr-2 hover:text-white' : 'mr-2 hover:text-black'}>
              {timeAgo}
            </span>
            <MoveUpRight
              size={13}
              className={`transition-colors duration-300 ${
                darkMode ? 'text-violet-300 group-hover:text-white' : 'text-purple-600'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Background shine effect */}
      <div
        className={`
        absolute inset-0 bg-gradient-to-r from-transparent via-violet-900/20 to-transparent
        opacity-0 transition-opacity duration-500
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `}
      />
    </div>
  );
}
