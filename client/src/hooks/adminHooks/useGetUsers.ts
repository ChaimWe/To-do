import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/adminApi";

export function useGetUsers(){
    useQuery({
        queryKey:["users"],
        queryFn: async () => {
            const response = await fetchUsers();
           return response.data;
        }
    })
}