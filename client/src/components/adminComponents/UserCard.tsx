import {
  Button,
  Card,
  Input,
  Popconfirm,
  Row,
  Col,
  Select,
  Space,
  Tag,
  Typography,
  Collapse,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import type { User, UserCardProps } from "../../interfaces/adminInterfaces";
import TaskCard from "../taskComponents/TaskCard";

const { Text } = Typography;
const { Panel } = Collapse;

function UserCard({
  user,
  editUser,
  deleteUser,
  userClick,
  userTasks,
  tasksLoading,
}: UserCardProps) {
  const [tempName, setTempName] = useState(user.name);
  const [tempRole, setTempRole] = useState<User["role"]>(user.role);
  const [showTasks, setShowTasks] = useState(false);


  useEffect(() => {
    setTempName(user.name);
    setTempRole(user.role);
  }, [user]);

  const handleEdit = () => {
    if (tempName !== user.name || tempRole !== user.role) {
      editUser(user._id, { name: tempName, role: tempRole });
    }
  };

  const handleUserClick = () => {
    userClick(user._id);
    setShowTasks((prev) => !prev);
  };

  return (
    <Card hoverable style={{ width: "100%" }} bodyStyle={{ padding: 16 }}>
      <Row align="middle" gutter={[16, 16]} wrap={false}>
        <Col flex="200px">
          <Text type="secondary">Name</Text>
          <Input
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
        </Col>

        <Col flex="260px">
          <Text type="secondary">Email</Text>
          <div>{user.email}</div>
        </Col>

        <Col flex="140px">
          <Text type="secondary">Role</Text>
          <Select
            value={tempRole}
            onChange={setTempRole}
            options={[
              { value: "user", label: "User" },
              { value: "admin", label: "Admin" },
            ]}
            style={{ width: "100%" }}
          />
        </Col>

        <Col flex="100px">
          <Tag color={user.role === "admin" ? "red" : "blue"}>{user.role}</Tag>
        </Col>

        <Col>
          <Button loading={tasksLoading} onClick={handleUserClick}>
            {showTasks ? "Hide Tasks" : "Get User Tasks"}
          </Button>
        </Col>

        <Col flex="auto" style={{ textAlign: "right" }}>
          <Space>
            <Button type="primary" onClick={handleEdit}>
              Save
            </Button>
            <Popconfirm
              title="Delete this user?"
              onConfirm={() => deleteUser(user._id)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        </Col>
      </Row>

      {showTasks && userTasks?.length > 0 && (
        <Collapse style={{ marginTop: 16 }}>
          <Panel header="Tasks" key="tasks">
            <Row gutter={[16, 16]}>
              {userTasks.map((task) => (
                <Col key={task._id} xs={24} sm={12} md={8} lg={6}>
                  <TaskCard
                    task={task}
                    onComplete={() => message.error("Only for owner")}
                    onDelete={() => message.error("Only for owner")}
                  />
                </Col>
              ))}
            </Row>
          </Panel>
        </Collapse>
      )}
    </Card>
  );
}

export default React.memo(
  UserCard,
  (prev, next) => prev.user === next.user && prev.userTasks === next.userTasks,
);
