import axios from "axios";

const client = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
