import { UsersList } from "../components/adminComponents/UsersList";
import { useDeleteUser } from "../hooks/adminHooks/useDeleteUser";
import { useEditUser } from "../hooks/adminHooks/useEditUser";
import { useGetUsers } from "../hooks/adminHooks/useGetUsers";
import { User } from "../interfaces/adminInterfaces";

export default function AdminPage() {
  const { data, isLoading: usersLoading } = useGetUsers();
  const { mutate: editUserMutate } = useEditUser();
  const { mutate: deleteUserMutate } = useDeleteUser();

  const handleEdit = (userId: string, updates: Partial<User>)=>
    editUserMutate({_id: userId, updates: updates});
  const handleDelete = (userId: string) => 
    deleteUserMutate(userId);
  return (
    <UsersList
      data={data || []}
      isLoading={usersLoading}
      editUser={handleEdit}
      deleteUser={handleDelete}
    />
  );
}
