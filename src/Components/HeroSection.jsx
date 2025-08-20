import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Stars, ArrowDown } from "lucide-react";
import {useNavigate} from 'react-router-dom'

export default function HeroSection() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate()
  const token = localStorage.getItem('token');

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
    <section
      className={`relative overflow-hidden flex items-center justify-center pt-24 px-4 sm:px-6 md:px-10 lg:px-16 text-center transition-colors duration-300
        ${darkMode ? "bg-[#000000] text-white" : "bg-white text-black"}`}
    >
      <div className="max-w-4xl w-full">
        {/* Floating Icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mb-4 text-purple-400 animate-bounce"
        >
          <Stars size={24} />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center px-4 py-2 text-sm sm:text-base font-medium border rounded-full shadow-md mb-6
            ${darkMode ? "border-purple-300 text-purple-300" : "border-purple-500 text-purple-500 bg-purple-50"}`}
        >
          <Star size={16} className="mr-2" />
          AI Prompt Engineering Made Simple
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 mb-4"
        >
          Craft Perfect AI Prompts
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className={`text-base sm:text-lg md:text-xl mb-8 transition-colors duration-300
            ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Discover and share powerful prompts for AI models.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <button className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold shadow-md transition-all duration-300"
          onClick={() => token? navigate('/submit'): navigate('/login')}
          >
            ✨ Create Prompt
          </button>

          <button
            className={`w-full sm:w-auto px-6 py-3 rounded-full border font-semibold shadow-inner transition-all duration-300 flex items-center justify-center space-x-2 
              ${darkMode
                ? "bg-black/20 border-white/30 hover:bg-white/10 text-white"
                : "bg-gray-100 border-gray-300 hover:bg-gray-200 text-black"
              }`}
              onClick={()=>navigate('#')}
          >
            <span>💬</span>
            <span>Browse Prompts</span>
          </button>
        </motion.div>

        {/* Down Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className={`grid place-items-center mt-12 animate-bounce ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <ArrowDown className="flex items-center" />
        </motion.div>
      </div>
    </section>
  );
}
