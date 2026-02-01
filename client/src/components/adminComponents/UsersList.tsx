import { Button, Card, List, Popconfirm, Tag } from "antd";
import { User } from "../../interfaces/adminInterfaces";
import { UserCard } from "./UserCard";

export function UsersList({
  data,
  isLoading,
  editUser,
  deleteUser,
}: {
  data: User[];
  isLoading: boolean;
  editUser: (_id: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;
}) {
  
  if (isLoading) return <p>Loading...</p>;
  if (!data || data.length === 0) return <p>No users found</p>;

  return (
    <List
      rowKey="_id"
      dataSource={data}
      renderItem={(user) => (
        <List.Item>
         <UserCard user={user} editUser={editUser} deleteUser={deleteUser} />
        </List.Item>
      )}
    />
  );
}
