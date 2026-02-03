import type { NewTask, Task } from "../interfaces/taskInterfaces";
import { StatusFilter } from "../enums/StatusFilter";
import API from "./API";

export const createTask = (task: NewTask) =>
  API.post<Task>("tasks/create-task", task);

export const updateTask = (id: string, updates: Partial<Task>) =>
  API.put<Task>(`tasks/task/${id}`, updates);

export const deleteTask = (id: string) => API.delete<Task>(`tasks/task/${id}`);

export const fetchTasks = (filter: string, sort: string) =>
  API.get("/tasks", {
    params: {
      completed: filter === StatusFilter.All ? undefined : filter,
      sort,
    },
  });
