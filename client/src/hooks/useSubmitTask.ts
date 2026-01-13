import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/taskApi";

export function useSubmitTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['tasks']});
    },
    onError:(error)=>{
      console.error("Failed to add task ",error)
    },
    meta:{operationName: 'Add task'}
  })
}