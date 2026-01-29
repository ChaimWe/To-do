import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/userApi";

export function useRegister(){
    return useMutation({
        mutationFn:registerUser
    })
}