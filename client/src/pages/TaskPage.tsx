import { Divider, Layout, Space } from "antd";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { Task } from "../interfaces/taskInterfaces";

export default function TaskPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dataSort, setDataSort] = useState<boolean>(true);
  const { data, isLoading, error } = useTasks(statusFilter, dataSort);
  const { mutate: updateTaskMutate } = useUpdateTask();
  const { mutate: deleteTaskMutate } = useDeleteTask();

  const handleComplete = (_id: string) => {
    const task = data?.find((task: Task) => task._id === _id);
    if (!task) return;
    updateTaskMutate({ _id, updates: { completed: !task.completed } });
  };
  const handleDelete = (_id: string) => {
    deleteTaskMutate({ _id });
  };
  return (
    <Layout
      style={{
        padding: "15px",
        minHeight: "100vh",
        backgroundColor: "#F5F5F5",
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Header
          statusFilter={setStatusFilter}
          dataSorting={() => setDataSort((prev) => !prev)}
          dateSort={dataSort}
        />
        <Divider>Task List</Divider>
        <TaskList
          data={data}
          isLoading={isLoading}
          handleComplete={handleComplete}
          handleDelete={handleDelete}
        />
      </Space>
    </Layout>
  );
}
