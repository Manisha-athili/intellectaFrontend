import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Star, GitFork, Sparkles } from "lucide-react";
import PromptGrid from "../Features/Prompts/PromptGrid";
import {getUserProfile}  from "../services/userServies"

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved !== null
      ? JSON.parse(saved)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const token = localStorage.getItem("token") || ""
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.data);
        setPrompts(res.data.prompts || []);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchUserData();
  }, [token]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  if (!user) return <div className="text-center mt-10 text-lg">Loading...</div>;

  const totalUpvotes = prompts.reduce((acc, p) => acc + (p.stars?.length || 0), 0);
  const totalForks = prompts.reduce((acc, p) => acc + (p.forkCount || 0), 0);

  return (
    <div className="min-h-screen pt-24 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold">👤 {user.name}</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-xl text-center shadow">
            <p className="text-3xl font-bold flex items-center justify-center gap-2">
              <Star size={20} className="text-yellow-400" /> {totalUpvotes}
            </p>
            <p className="mt-2">Total Upvotes</p>
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-xl text-center shadow">
            <p className="text-3xl font-bold flex items-center justify-center gap-2">
              <GitFork size={20} className="text-blue-400" /> {totalForks}
            </p>
            <p className="mt-2">Total Forks</p>
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-xl text-center shadow">
            <p className="text-3xl font-bold flex items-center justify-center gap-2">
              <Sparkles size={20} className="text-purple-400" /> {prompts.length}
            </p>
            <p className="mt-2">Total Prompts</p>
          </div>
        </div>

        {/* Prompt Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Prompts by {user.username}</h2>

          {prompts.length === 0 ? (
            <div className="bg-gray-200 dark:bg-gray-800 rounded-lg py-10 text-center">
              <p className="text-gray-500 dark:text-gray-300 text-lg mb-4">
                This user hasn't shared any prompts yet.
              </p>
              <button
                onClick={() => navigate("/")}
                className="inline-block px-6 py-2 border border-gray-400 dark:border-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              >
                Return to Prompt Library
              </button>
            </div>
          ) : (
            <PromptGrid prompts={prompts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
