import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
  getProfile: () => API.get("/auth/profile"),
};

export const prescriptionAPI = {
  create: (data) => API.post("/prescriptions", data),
  getAll: (search = "") =>
    API.get(`/prescriptions${search ? `?search=${search}` : ""}`),
  getById: (id) => API.get(`/prescriptions/${id}`),
  update: (id, data) => API.put(`/prescriptions/${id}`, data),
  delete: (id) => API.delete(`/prescriptions/${id}`),
};

export const patientAPI = {
  getAll: () => API.get("/patients"),
  getHistory: (email) => API.get(`/patients/${email}/history`),
};

export default API;