import { User } from "../interfaces/adminInterfaces";
import API from "./API";

export const fetchUsers = ()=> API.get("/admin/users");

export const editUserApi = ({_id, updates}:{_id: string; updates: Partial<User>})=>
  API.put<User>(`/admin/users/${_id}`, updates);

export const deleteUserApi = (_id: string)=>
    API.delete(`/admin/users/${_id}`);