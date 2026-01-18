import API from "./axios";

export const loginUser = async (data) => {
  return API.post("/auth/login", data);
};

export const signupUser = async (data) => {
  return API.post("/auth/signup", data);
};
//console.log(import.meta.env.VITE_BACKEND_URL); // should log http://localhost:5000/api
