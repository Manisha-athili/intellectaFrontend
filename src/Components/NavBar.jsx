import React, { useState, useRef } from "react";
import {
  Sun,
  Moon,
  Plus,
  Menu,
  X,
  UserRound,
  LogOut,
  Star,
  Settings,
  User,
  Mail,
} from "lucide-react";
import "../Styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from './CommonUI/DarkModeContext';

export default function Navbar() {
    const { darkMode, setDarkMode } = useDarkMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("email");

  

  const toggleMode = () => setDarkMode(!darkMode);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setDropdownOpen(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <nav
        className="navbar  navbar-default"
      >
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="navbar-logo">
              <button onClick={()=>navigate('/')}>
                Intellecta<span className="navbar-logo-accent">Prompt</span>
              </button>
            </div>

            {/* Desktop Nav */}
            <div className="desktop-nav">
              <div className="desktop-nav-buttons">
                <button
                  onClick={() => setDarkMode(prev => !prev)}
                  className="theme-toggle-btn"
                  title={`${darkMode ? "Toggle Light Mode" : "Toggle  Dark Mode"}`}
                >
                  {darkMode ? <Sun size={20} className="text-yellow-300"  /> : <Moon size={18}  className="text-indigo-300" />}
                </button>
                {token && <button onClick={()=>navigate('/submit')}>
                  <Plus size={34}  className="border rounded-full px-1.5 py-1.5 border-gray-600 text-gray-600"/>
                </button>}

                {!token ? (
                  <>
                    <div className="flex space-x-2">
                      <button
                        className="login-btn"
                        onClick={() => navigate("/login")}
                      >
                        Log in
                      </button>
                      <button
                        className="signup-btn"
                        onClick={() => navigate("/register")}
                      >
                        Sign up
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="relative" ref={dropdownRef}>
                    <button className="profile-btn " onClick={toggleDropdown}>
                      <UserRound size={35} className="border rounded-full px-1.5 py-1.5 mt-1.5 border-gray-600 text-purple-500"/>
                    </button>
                    {dropdownOpen && (
                      <div className="dropdown-menu border border-purple-300">
                        <div className="dropdown-item">
                          <Mail size={16} /> <span style={{overflow: "hidden"}}>{userEmail}</span>
                        </div>
                        <div
                          className="dropdown-item"
                          onClick={() => navigate("/profile")}
                        >
                          <User size={16} /> Profile
                        </div>
                        <div
                          className="dropdown-item"
                          onClick={() => navigate("/settings")}
                        >
                          <Settings size={16} /> Account Settings
                        </div>
                        <div
                          className="dropdown-item"
                          onClick={() => navigate("/starred")}
                        >
                          <Star size={16} /> Starred Prompts
                        </div>
                        <div className="dropdown-item border-t border-purple-300 " id="logout" onClick={handleLogout}>
                          <LogOut size={16} /> Logout
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Buttons */}
            <div className="mobile-nav-buttons">
              <button
                onClick={toggleMode}
                className="theme-toggle-btn"
                title="Toggle color scheme"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={toggleMobileMenu}
                className="mobile-menu-btn"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu animate-fade-in-down">
            {!token ? (
              <div className="pt-2 space-y-3">
                <div className="flex space-x-2">
                  <button
                    className="login-btn w-full"
                    onClick={() => navigate("/login")}
                  >
                    Log in
                  </button>
                  <button
                    className="signup-btn w-full"
                    onClick={() => navigate("/register")}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-2 space-y-3 text-left px-4">
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <Mail size={16} /> {userEmail}
                </div>
                <button
                  className="dropdown-item w-full"
                  onClick={() => navigate("/profile")}
                >
                  <User size={16} /> Profile
                </button>
                <button
                  className="dropdown-item w-full"
                  onClick={() => navigate("/settings")}
                >
                  <Settings size={16} /> Account Settings
                </button>
                <button
                  className="dropdown-item w-full"
                  onClick={() => navigate("/starred")}
                >
                  <Star size={16} /> Starred Prompts
                </button>
                <button className="dropdown-item w-full" onClick={handleLogout}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
      {mobileMenuOpen && <div className="mobile-menu-spacer"></div>}
    </>
  );
}
