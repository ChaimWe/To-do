import axios from "axios";
import { NewTask, Task } from "../interfaces/taskInterfaces";

const BASE_URL = "http://localhost:5000/api"

export const createTask = (task: NewTask) =>
  axios.post<Task>(BASE_URL+"/create-task", {
    ...task,
    createdOn: new Date().toLocaleDateString('en-GB'),
    completed: false,
  });

export const updateTask = (id: string, updates: Partial<Task>) =>
  axios.patch<Task>(BASE_URL+`/task/${id}`, updates);

export const deleteTask = (id: string) =>
  axios.delete<Task>(BASE_URL+`/task/${id}`);

export const fetchTasks = (filter: string, sort: string) =>
    axios.get(BASE_URL+"/tasks", {params: {  completed: filter === "all" ? undefined : filter, sort }});