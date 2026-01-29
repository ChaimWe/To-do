// apiClient.ts
import axios from "axios";
import { message } from "antd";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 403) {
      message.error("You do not have permission to perform this action");
    } else if (status === 401) {
      return Promise.reject(error);
    } else if (status === 500) {
      message.error("Server error occurred. Please try again later");
    } else if (!error.response) {
      message.error("Network error. Check your connection.");
    }
    return Promise.reject(error);
  }
);

export default API;
