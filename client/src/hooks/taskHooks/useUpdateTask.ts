import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../../api/taskApi";
import { Task } from "../../interfaces/taskInterfaces";
import { message } from "antd";

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ _id, updates }: { _id: string; updates: Partial<Task> }) =>
      updateTask(_id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false });
    },
    onError: (error) => {
      console.error("Failed to update task ", error);
      message.error("Failed to update task")
    },
    meta: { operationName: "Update task" },
  });
}
