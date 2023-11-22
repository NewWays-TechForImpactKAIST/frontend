import _axios from "axios";

const axios = _axios.create({
  baseURL:
    (import.meta.env.VITE_API_BASE_URL as string) ||
    "https://diversity-api.tech4impact.kr",
  withCredentials: true,
});

export default axios;
