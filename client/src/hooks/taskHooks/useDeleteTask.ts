import { useMutation, useQueryClient } from "@tanstack/react-query";
import {deleteTask} from '../../api/taskApi'
import { message } from "antd";


export function useDeleteTask(){

    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({_id}:{_id:string})=>deleteTask(_id),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['tasks']});
    },
    onError:(error)=>{
      console.error("Failed to delete task ",error);
      message.error("Failed to delete task")
    },
    meta:{operationName: 'Delete task'}
  })
}