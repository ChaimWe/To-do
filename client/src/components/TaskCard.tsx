import { Button, Card, Checkbox } from "antd";
import type { Task } from "../interfaces/taskInterfaces";
import React from "react";

function TaskCard({
  task,
  onComplete,
  onDelete,
}: {
  task: Task;
  onComplete: (_id:string) => void;
  onDelete: (_id:string) => void;
}) {

  return (
    <Card
      title="Task Details"
      extra={
        <Button danger onClick={() => onDelete(task._id)}>
          Delete
        </Button>
      }
       style={{
    backgroundColor: task.completed ? "#D6ECD2" : "#F8D7DA",
  }}
    >
      <h3>{task.title}</h3>
      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Category:</strong> {task.category}
      </p>
        <Checkbox
          checked={task.completed}
          onChange={() => onComplete(task._id)}
        >
        Completed
      </Checkbox>
      <p>Created on: {task.createdOn}</p>
    </Card>
  );
};
export default React.memo(TaskCard);