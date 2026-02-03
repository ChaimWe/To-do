import { useQuery } from "@tanstack/react-query";
import { fetchUserTasks } from "../../api/adminApi";

export default function useUserTasks(userId: string | null) {
  return useQuery({
    queryKey: ["userTasks", userId],
    queryFn: async () => {
      if (!userId) return [];
      const response = await fetchUserTasks(userId);
      return response.data;
    },
    enabled: !!userId,
  });
}
