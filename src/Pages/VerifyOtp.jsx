import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Sun, Moon } from 'lucide-react';
import { verifyOtpAndRegisterUser, resendOtpRequest } from '../services/authServices'; 

export default function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60); // countdown in seconds
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();
  const email = localStorage.getItem('pendingUserEmail');

  useEffect(() => {
    const root = document.documentElement;
    darkMode ? root.classList.add('dark') : root.classList.remove('dark');
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Countdown timer for resend OTP button
  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const toggleMode = () => setDarkMode(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("No registration session found.");
      return;
    }


    setLoading(true);
    try {
      const res = await verifyOtpAndRegisterUser({ email, otp });
      localStorage.removeItem('pendingUserEmail');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', res.data.user.email);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("No registration session found.");
      return;
    }

    setLoading(true);
    try {
      await resendOtpRequest({ email }); // call API to resend OTP
      toast.success('OTP resent to your email!');
      setResendTimer(60);  // reset countdown
      setCanResend(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-900 transition duration-300">
      {/* Dark mode toggle */}
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
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg animate-fadeIn">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Verify Your Email</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter the OTP sent to your email to complete registration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="otp"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder=" "
              className="peer w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="otp"
              className="absolute left-4 top-2 text-sm text-gray-500 dark:text-gray-400 transition-all 
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 
                peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              OTP Code
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold transition text-white ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Verifying...' : 'Verify & Register'}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="mt-4 text-center">
          <button
            onClick={handleResend}
            disabled={!canResend || loading}
            className={`text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline ${
              (!canResend || loading) && 'opacity-50 cursor-not-allowed'
            }`}
          >
            {canResend ? 'Resend OTP' : `Resend OTP in ${resendTimer}s`}
          </button>
        </div>
      </div>
    </div>
  );
}
