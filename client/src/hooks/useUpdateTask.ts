import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/taskApi";
import { Task } from "../interfaces/taskInterfaces";

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ _id, updates }: { _id: string; updates: Partial<Task> }) =>
      updateTask(_id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Failed to update task ", error);
    },
    meta: { operationName: "Update task" },
  });
}
