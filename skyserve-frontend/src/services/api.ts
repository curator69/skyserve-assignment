import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post("/users/login", { email, password });
    return response.data;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await api.post("/users/register", {
      name,
      email,
      password,
    });
    return response.data;
  },
};

export const geoDataService = {
  uploadFile: async (formData: FormData) => {
    const response = await api.post("/geodata/upload", formData);
    return response.data;
  },

  getUserData: async () => {
    const response = await api.get("/geodata/data");
    return response.data;
  },

  toggleVisibility: async (id: string) => {
    const response = await api.patch(`/geodata/data/${id}/visibility`);
    return response.data;
  },

  deleteData: async (id: string) => {
    const response = await api.delete(`/geodata/data/${id}`);
    return response.data;
  },
};

export default api;
