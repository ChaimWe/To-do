import type { AxiosResponse } from "axios";
import type { User } from "../interfaces/adminInterfaces";
import type { Task } from "../interfaces/taskInterfaces";
import API from "./API";

export const fetchUsers = (): Promise<AxiosResponse<User[]>> =>
  API.get("/admin/users");

export const fetchUserTasks = (_id: string): Promise<AxiosResponse<Task[]>> =>
  API.get<Task[]>(`/admin/users/tasks/${_id}`);

export const editUserApi = ({
  _id,
  updates,
}: {
  _id: string;
  updates: Partial<User>;
}): Promise<AxiosResponse<User>> =>
  API.put<User>(`/admin/users/${_id}`, updates);

export const deleteUserApi = (_id: string): Promise<AxiosResponse<void>> =>
  API.delete(`/admin/users/${_id}`);