import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Sun, Moon } from 'lucide-react';
import { forgotPassword } from '../services/authServices'; // maps to sendOtpForReset

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null
      ? JSON.parse(saved)
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    darkMode ? root.classList.add('dark') : root.classList.remove('dark');
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleMode = () => setDarkMode(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email });
      toast.success('OTP sent to your email');
      localStorage.setItem('resetEmail', email);
      navigate('/reset-password'); 
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-900 transition duration-300">
      {/* Theme toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:scale-110 transition"
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Forgot Password</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your email to receive a reset OTP
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
              className="peer w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-sm text-gray-500 dark:text-gray-400 transition-all
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500
                peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Email Address
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
