import {api} from "../axios/axios.config"
const token = localStorage.getItem("token");

export const getUserProfile = () =>
  api.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  
// Get settings
export const getAccountSettings = async () => {
  const res = await api.get("/users/settings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Update settings
export const updateAccountSettings = async (settings) => {
  const res = await api.put("/users/settings", settings, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
