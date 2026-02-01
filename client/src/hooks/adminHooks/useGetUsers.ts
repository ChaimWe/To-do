import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/adminApi";
import { User } from "../../interfaces/adminInterfaces";
import { AxiosError } from "axios";

export function useGetUsers(){
    return useQuery<User[], AxiosError>({
        queryKey:["users"],
        queryFn: async () => {
            const response = await fetchUsers();
           return response.data;
        }
    })
}