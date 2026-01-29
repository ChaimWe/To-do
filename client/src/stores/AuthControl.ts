import { create } from "zustand";

interface AuthState{
    loginOpen: boolean;
    openLogin: () => void;
    closeLogin: () => void;
}

export const useAuthControl = create<AuthState>((set)=>({
    loginOpen: false,
    openLogin:()=>set({loginOpen: true}),
    closeLogin:()=>set({loginOpen: false})
}))