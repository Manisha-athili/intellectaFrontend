import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendRegistrationOtp } from '../services/authServices'; // Ensure correct API call
import { Sun, Moon } from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode !== null
        ? JSON.parse(savedMode)
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const navigate = useNavigate();

  const toggleMode = () => setDarkMode(prev => !prev);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await sendRegistrationOtp(form);
      localStorage.setItem('pendingUserEmail', form.email);
      toast.success('OTP sent to your email');
      navigate('/verify-otp');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error occurred');
    }
  };

  // Apply dark mode class
  useEffect(() => {
    const root = document.documentElement;
    darkMode ? root.classList.add('dark') : root.classList.remove('dark');
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white dark:bg-gray-900 transition duration-300">
      {/* Dark mode toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:scale-110 transition"
          aria-label="Toggle theme"
        >
          {/* {darkMode ? <Sun size={18} /> : <Moon size={18} />} */}
        </button>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg animate-fadeIn">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create an account</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Register to continue to the platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="name"
              className="absolute left-4 top-2 text-sm text-gray-500 dark:text-gray-400 transition-all 
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 
                peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
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
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-sm text-gray-500 dark:text-gray-400 transition-all 
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 
                peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Password
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
          >
            Send OTP
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
