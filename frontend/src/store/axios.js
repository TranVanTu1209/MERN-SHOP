import axios from "axios";
import store from "./store";
import { logout } from "./actions/user";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      store.dispatch(logout());
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
