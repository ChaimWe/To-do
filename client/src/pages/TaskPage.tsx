import { Divider, Layout, Space } from "antd";
import TaskList from "../components/taskComponents/TaskList";
import Header from "../components/Header";
import { useState } from "react";
import { useTasks } from "../hooks/taskHooks/useTasks";
import { useUpdateTask } from "../hooks/taskHooks/useUpdateTask";
import { useDeleteTask } from "../hooks/taskHooks/useDeleteTask";
import type { Task } from "../interfaces/taskInterfaces";
import { useCurrentUser } from "../hooks/userHooks/useCurrentUser";
import { StatusFilter } from "../enums/StatusFilter";
import { useNavigate } from "react-router-dom";
import AdminPage from "./AdminPage";

export default function TaskPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(StatusFilter.All);
  const [dataSort, setDataSort] = useState<boolean>(true);
  const { data, isLoading: tasksLoading } = useTasks(statusFilter, dataSort);
  const { mutate: updateTaskMutate } = useUpdateTask();
  const { mutate: deleteTaskMutate } = useDeleteTask();
  const { data: user, isLoading: userLoading } = useCurrentUser();

  const handleComplete = (task: Task) => {
    updateTaskMutate({
      _id: task._id,
      updates: { completed: !task.completed },
    });
  };
  const handleDelete = (_id: string) => {
    deleteTaskMutate({ _id });
  };
  const navigate = useNavigate();

  return (
    <Layout
      style={{
        padding: "15px",
        minHeight: "100vh",
        backgroundColor: "#F5F5F5",
      }}
    >
      <Space orientation="vertical" size="large" style={{ width: "100%" }}>
        <Header
          statusFilter={setStatusFilter}
          dataSorting={() => setDataSort((prev) => !prev)}
          dateSort={dataSort}
          // currentUser={user}
          // onAdminClick={() => navigate("/admin")}
          onTitleClick={() => navigate("/")}
        />
        <Divider>Task List</Divider>
        {userLoading ? (
          <p>User is loading...</p>
        ) : user ? (
  user.role === "admin" ? (
    <AdminPage />
  ) : (
    <TaskList
      data={data}
      isLoading={tasksLoading}
      handleComplete={handleComplete}
      handleDelete={handleDelete}
    />
  )
): (
          <p>Please log in to view your tasks</p>
        )}
      </Space>
    </Layout>
  );
}
