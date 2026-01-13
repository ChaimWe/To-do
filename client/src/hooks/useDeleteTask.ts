import { useMutation, useQueryClient } from "@tanstack/react-query";
import {deleteTask} from '../api/taskApi'


export function useDeleteTask(){

    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({_id}:{_id:string})=>deleteTask(_id),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['tasks']});
    },
    onError:(error)=>{
      console.error("Failed to update task ",error)
    },
    meta:{operationName: 'Update task'}
  })
}