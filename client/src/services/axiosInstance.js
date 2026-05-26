import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "https://grocery-store-server-50z7.onrender.com/api";

export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});
