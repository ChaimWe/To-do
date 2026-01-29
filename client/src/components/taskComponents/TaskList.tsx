import TaskCard from "./TaskCard";
import type { Task } from "../../interfaces/taskInterfaces";
import { Col, Row } from "antd";
import React from 'react';

function TaskList({
  data,
  isLoading,
  handleComplete,
  handleDelete,
}: {
  data: Task[] | undefined;
  isLoading: boolean;
  handleComplete: (task: Task) => void;
  handleDelete: (_id: string) => void;
}) 

  {
  if (data instanceof Error) return <p>Server error</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data || data.length === 0) return <p>No tasks found</p>;
  return (
    <>
      <Row gutter={[16, 16]}>
        {data?.map((task: Task) => (
          <Col key={task._id} xs={24} sm={12} md={8} lg={6}>
            <TaskCard
              key={task._id}
              task={task}
              onComplete={() => handleComplete(task)}
              onDelete={() => handleDelete(task._id)}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default React.memo(TaskList);