import { useQuery } from "@tanstack/react-query";
import type { Task } from "../../interfaces/taskInterfaces";
import { fetchTasks } from "../../api/taskApi";
import { AxiosError } from "axios";

export function useTasks(statusFilter: string, dataSort: boolean) {
  const sortDir = !dataSort ? "asc" : "desc";
  return useQuery<Task[], AxiosError>({
    queryKey: ["tasks", statusFilter, dataSort],
    queryFn: async () => {
      const response = await fetchTasks(statusFilter, sortDir);
      return response.data;
    },
    retry: (failureCount, error) => {
      if (error?.response?.status === 401) return false;
      return failureCount < 3;
    },
    throwOnError: false,
    refetchOnMount: (query) => query.state.error?.response?.status !== 401,
    refetchOnWindowFocus: (query) =>
      query.state.error?.response?.status !== 401,
  });
}
