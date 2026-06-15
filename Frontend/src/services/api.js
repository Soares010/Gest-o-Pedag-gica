import axios from "axios";

const URL = "http://localhost:8000/";

export const api = axios.create({
  baseURL: URL,
});

api.interceptors.request.use((config) => {
  const getToken = JSON.parse(localStorage.getItem("auth"));
  const TOKEN = getToken?.token;
  //   console.log(TOKEN);

  if (TOKEN) {
    config.headers.Authorization = `Bearer ${TOKEN}`;
  }

  return config;
});
