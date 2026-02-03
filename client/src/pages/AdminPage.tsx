import { useState } from "react";
import UsersList from "../components/adminComponents/UsersList";
import { useDeleteUser } from "../hooks/adminHooks/useDeleteUser";
import { useEditUser } from "../hooks/adminHooks/useEditUser";
import { useGetUsers } from "../hooks/adminHooks/useGetUsers";
import useUserTasks from "../hooks/adminHooks/useUserTasks";
import type { User } from "../interfaces/adminInterfaces";

export default function AdminPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { data: users, isLoading: usersLoading } = useGetUsers();
  const { mutate: editUserMutate } = useEditUser();
  const { mutate: deleteUserMutate } = useDeleteUser();
  const { data: userTasks = [], isLoading: tasksLoading } =
    useUserTasks(selectedUserId);
  const handleSelectUser = (_id: string) => {
    setSelectedUserId(_id);
  };

  const handleEdit = (userId: string, updates: Partial<User>) =>
    editUserMutate({ _id: userId, updates: updates });
  const handleDelete = (userId: string) => deleteUserMutate(userId);
  return (
    <>
      <UsersList
        data={users || []}
        isLoading={usersLoading}
        editUser={handleEdit}
        deleteUser={handleDelete}
        userClick={handleSelectUser}
        userTasks={userTasks}
        tasksLoading={tasksLoading}
      />
    </>
  );
}
