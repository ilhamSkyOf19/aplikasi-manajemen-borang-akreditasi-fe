import axios from "axios";
import { ENV } from "../types/env";

const instanceAxios = axios.create({
  baseURL: ENV.API_URL,
  timeout: 10000,
  withCredentials: true,
});

instanceAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // TIMEOUT
    if (error.code === "ECONNABORTED") {
      return (window.location.href = "/");
    }

    // autorized
    if (
      error.response?.status === 401 &&
      !error.config.url?.includes("/auth/me")
    ) {
      window.location.href = "/login";
    }

    if (!error.response) {
      console.error("Network error:", error.message);
      window.location.href = "/error-network";
      return;
    }

    return Promise.reject(error);
  },
);

export default instanceAxios;
