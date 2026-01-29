import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../api/taskApi";
import { message } from "antd";

export function useSubmitTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['tasks']});
    },
    onError:(err)=>{
      console.error("Submit task failure: ",err);
      message.error("Failed to add task")
    },
    meta:{operationName: 'Add task'}
  })
};