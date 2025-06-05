import Axios from "axios";
import { getBaseUrl, getDocUrl } from "./getBaseUrl";

const BASEURL = getBaseUrl();
export const DOC_URL = getDocUrl();

export const axiosInstance = Axios.create({
  baseURL: BASEURL,
  timeout: 20000,
  withCredentials: true, // Ensure cookies are included in every request
});

axiosInstance.defaults.headers.common["Accept"] = "*/*";

axiosInstance.interceptors.request.use(
  (config) => {
    // You can do stuff like set loading state here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401/403 redirects or logging
    if (error?.response?.status === 401) {
      window.location.href = "#/";
    }
    return Promise.reject(error);
  }
);
