import { LoginPayload, RegisterPayload } from "../interfaces/userInterfaces";
import API from "./API";

export const registerUser = async (data: RegisterPayload) => {
  const response = await API.post("/users/register", data );
  return response.data;
};

export const userLogin = async (data: LoginPayload) => {
  const response = await API.post("/users/login", data );
  return response.data;
};
