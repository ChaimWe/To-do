import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../../interfaces/adminInterfaces";
import { editUserApi } from "../../api/adminApi";
import { message } from "antd";

export function useEditUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ _id, updates }: { _id: string; updates: Partial<User> }) =>
      editUserApi({ _id, updates }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      message.success("Successfully edited");
    },
    onError: (err) => {
      console.log("Editing user error: ", err);
      message.error("User edit failed");
    },
    meta: { operationName: "Edit user" },
  });
}
