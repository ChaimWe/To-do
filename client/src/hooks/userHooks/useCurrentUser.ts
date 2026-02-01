import { useQuery } from "@tanstack/react-query";
import API from "../../api/API";
import { AxiosError } from "axios";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await API.get("users/me");
      return data;
    },
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error: AxiosError) => {
      if (error?.response?.status === 401) return false;
      return failureCount < 3;
    },
    throwOnError: false,
    refetchOnMount: (query) => {
      if (query.state.error?.response?.status === 401) return false;
      return true;
    },
    refetchOnWindowFocus: (query) => {
      if (query.state.error?.response?.status === 401) return false;
      return true;
    },
  });
}
