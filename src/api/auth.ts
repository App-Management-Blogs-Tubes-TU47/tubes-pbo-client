import { callAlert } from "@/components/custom-alert";
import { useAuthStore } from "@/hooks/useAuthStore";
import axios from "axios";

const auth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

auth.interceptors.request.use((config) => {
  const token = useAuthStore.getState().users.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // config.headers["Content-Type"] = "application/json";
  config.headers["Content-Type"] =
    config.headers["Content-Type"] || "application/json";
  return config;
});
auth.interceptors.response.use(
  (response) => response, // Jika sukses, lanjutkan responsenya
  (error) => {
    if (error.response?.status === 401) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Unauthorized",
      //   text: "Your session has expired. Please log in again.",
      //   confirmButtonText: "OK",
      // }).then(() => {
      //   useAuthStore.getState().clearUsers();
      //   window.location.href = "/login";
      // });
      callAlert({
        type: "error",
        title: "Unauthorized",
        message: "Your session has expired. Please log in again.",
        onConfirm: () => {
          useAuthStore.getState().clearUsers();
          window.location.href = "/login";
        }
      })
    }

    return Promise.reject(error);
  }
);

export default auth;
