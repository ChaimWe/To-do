import { useQuery } from "@tanstack/react-query";
import type { Task } from "../interfaces/taskInterfaces";
import { fetchTasks } from "../api/taskApi";
import { useState } from "react";

export function useTasks(statusFilter: string, dataSort: boolean) {
  const sortDir = !dataSort ? "asc" : "dsc";
  return useQuery<Task[]>({
    queryKey: ["tasks", statusFilter, dataSort],
    queryFn: async () => {
      const response = await fetchTasks(statusFilter, sortDir);
      return response.data;
    },
  });
}
