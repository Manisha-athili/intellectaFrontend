import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { resetPassword } from '../services/authServices';

export default function ResetPassword() {
  const [form, setForm] = useState({
    email: localStorage.getItem('resetEmail') || '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    darkMode ? root.classList.add('dark') : root.classList.remove('dark');
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleMode = () => setDarkMode(prev => !prev);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(form);
      toast.success("Password reset successful!");
      localStorage.removeItem('resetEmail');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
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
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Reset Your Password</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your OTP and set a new password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {['email', 'otp'].map((field) => (
            <div className="relative" key={field}>
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor={field}
                className="absolute left-4 top-2 text-sm text-gray-500 dark:text-gray-400 transition-all 
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
                  peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 
                  peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
              >
                {field === 'otp' ? 'OTP Code' : 'Email'}
              </label>
            </div>
          ))}

          {/* Password fields with toggle */}
          {['newPassword', 'confirmPassword'].map((field) => (
            <div className="relative" key={field}>
              <input
                type={showPassword[field] ? 'text' : 'password'}
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor={field}
                className="absolute left-4 top-2 text-sm text-gray-500 dark:text-gray-400 transition-all 
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
                  peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 
                  peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
              >
                {field === 'newPassword' ? 'New Password' : 'Confirm Password'}
              </label>

              {/* Eye toggle */}
              <div
                onClick={() =>
                  setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
                }
                className="absolute top-3 right-3 cursor-pointer text-gray-500 dark:text-gray-400"
              >
                {showPassword[field] ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white rounded-md font-semibold transition`}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
ResetPassword.jsx