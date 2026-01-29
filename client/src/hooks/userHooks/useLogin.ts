import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../../api/userApi";

export function useLogin(){
    return useMutation({
        mutationFn:userLogin
    })
}