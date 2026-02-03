import type { Task } from "./taskInterfaces";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface UserCardProps {
  user: User;
  editUser: (_id: string, updates: Partial<User>) => void;
  deleteUser: (_id: string) => void;
  userClick: (_id: string) => void;
  userTasks: Task[];
  tasksLoading: boolean;
}

export interface UserListProps {
  data: User[];
  isLoading: boolean;
  editUser: (_id: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  userTasks: Task[];
  userClick: (_id: string) => void;
  tasksLoading: boolean;
}