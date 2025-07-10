import React, { useEffect, useState } from "react";
import { toast } from "react-toastify"
import {
  getAccountSettings,
  updateAccountSettings,
} from "../services/userServies";
import { useDarkMode } from "../Components/CommonUI/DarkModeContext";

const AccountSettings = () => {
  const userMail = localStorage.getItem('email')
  const [settings, setSettings] = useState({
    email:"",
    username: "",
    twitterHandle: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getAccountSettings();
        setSettings(data);
      } catch (err) {
        toast.success("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
   
  try {
    const updated = await updateAccountSettings(settings);
    setSettings(updated);
    toast.success(" Settings updated successfully!");
  } catch (err) {
    toast.error(" Failed to update settings");
  } finally {
    setSaving(false);
  }
  };

  if (loading) return <div className="text-white">Loading settings...</div>;
  // if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className={`pt-24  p-4 ${
          darkMode ? "bg-[#1a1a1a] text-white" : "bg-white text-black"
        }`}>
      <form
        onSubmit={handleSubmit}
        className={`max-w-xl mx-auto p-8 rounded-2xl shadow-lg pt-5 transition-colors border border-black ${
          darkMode ? "bg-[#1a1a1a] text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={userMail}
            disabled
            className={`w-full p-3 rounded-md cursor-not-allowed ${
              darkMode
                ? "bg-[#121212] text-gray-400"
                : "bg-gray-100 text-gray-500"
            }`}
          />
          <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={settings.username}
            onChange={handleChange}
            className={`w-full p-3 rounded-md ${
              darkMode ? "bg-[#121212] text-white" : "bg-gray-100 text-black"
            }`}
          />
          <p className="text-sm text-gray-500 mt-1">
            Your username will be visible to other users
          </p>
        </div>

        {/* Twitter Handle */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">
            X (Twitter) Handle
          </label>
          <input
            type="text"
            name="twitterHandle"
            placeholder="e.g. mattshumer_"
            value={settings.twitterHandle}
            onChange={handleChange}
            className={`w-full p-3 rounded-md ${
              darkMode ? "bg-[#121212] text-white" : "bg-gray-100 text-black"
            }`}
          />
          <p className="text-sm text-gray-500 mt-1">
            Optionally share your X/Twitter username (without @)
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={saving}
          className={`w-full py-3 rounded-full font-semibold transition ${
            darkMode
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </form>
    </div>
  );
};

export default AccountSettings;
