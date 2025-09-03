import axios from "axios";
import { BASE_URL } from "../constants";
const baseUrl = BASE_URL

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


// request url
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.log("Server error  , please try agin letter");
      } else if (error.code === "ENCONNABORTED") {
        console.log("Request time out.. please try agin");
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstance
