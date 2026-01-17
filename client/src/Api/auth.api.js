import API from "./axios";

export const loginUser = async (data) => {
  return API.post("/auth/login", data);
};

export const signupUser = async (data) => {
  return API.post("/auth/signup", data);
};

