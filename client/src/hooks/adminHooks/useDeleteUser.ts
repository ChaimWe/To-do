import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "../../api/adminApi";
import { message } from "antd";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (_id: string) => deleteUserApi(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      message.success("Successfully deleted");
    },
    onError: (err) => {
      console.log("Delete user error: ", err);
      message.error("User delete failed");
    },
    meta: { operationName: "Delete user" },
  });
}
