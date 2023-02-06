import axios, { HeadersDefaults } from "axios";

const axiosClient = axios.create();

// Replace this with our own backend base URL
axiosClient.defaults.baseURL = "https://api.example.org/";

type headers = {
  "Content-Type": string;
  Accept: string;
  Authorization: string;
};

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
} as headers & HeadersDefaults & any;

export default axiosClient;

export const getInstance = () => {
  const axiosApiInstance = axios.create();

  axiosApiInstance.interceptors.request.use(
    (config) => {
      if (token && !config.url.includes("authenticate")) {
        config.headers.common = {
          Authorization: `${token}`,
        };
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return axiosApiInstance;
};
