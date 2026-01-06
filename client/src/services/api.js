import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api"
// });

// const API = axios.create({
//   baseURL: "https://gymbuddy-backend-smug.onrender.com/api"
// });

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
