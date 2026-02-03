import { List } from "antd";
import type { UserListProps } from "../../interfaces/adminInterfaces";
import UserCard from "./UserCard";
import React from "react";

function UsersList({
  data,
  isLoading,
  editUser,
  deleteUser,
  userTasks,
  userClick,
  tasksLoading,
}: UserListProps) {
  if (isLoading) return <p>Loading...</p>;
  if (!data || data.length === 0) return <p>No users found</p>;

  return (
    <List
      rowKey="_id"
      dataSource={data}
      renderItem={(user) => (
        <List.Item>
          <UserCard
            user={user}
            editUser={editUser}
            deleteUser={deleteUser}
            userTasks={userTasks}
            userClick={userClick}
            tasksLoading={tasksLoading}
          />
        </List.Item>
      )}
    />
  );
}
export default React.memo(UsersList);
