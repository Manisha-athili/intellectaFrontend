import { api } from "../axios/axios.config";


const token = localStorage.getItem("token");

export const getAllPrompts = (queryParams = {}) =>
  api.get("/prompts", { params: queryParams });

export const getPromptById = (id) => api.get(`/prompts/${id}`);
export const createPrompt = (data) =>
  api.post("/prompts", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const updatePrompt = (id, updatedData) =>
  api.put(`/prompts/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deletePrompt = (id) =>
  api.delete(`/prompts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const incrementCopiedCount = async (promptId) => {
  return await api.post(`/prompts/${promptId}/copy`,  {},{ headers: {
      Authorization: `Bearer ${token}`,
    },});
};


export const toggleStarPrompt = (id) =>
  api.post(`/prompts/${id}/star`,{}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


export const getStarredPrompts = () =>
  api.get('/prompts/s/starred',{
    headers: {
      Authorization: `Bearer ${token}`,
    }})

export const forkPrompt = (id,data) =>
  api.post(`/prompts/${id}/fork`,{data}, {
    headers: {
      Authorization: `Bearer ${token}`,
       'Content-Type': 'application/json' 
    },
  });
