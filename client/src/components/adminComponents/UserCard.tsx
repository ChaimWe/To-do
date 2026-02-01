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
} from "antd";
import { User } from "../../interfaces/adminInterfaces";
import { useEffect, useState } from "react";

const { Text } = Typography;

export function UserCard({
  user,
  editUser,
  deleteUser,
}: {
  user: User;
  editUser: (_id: string, updates: Partial<User>) => void;
  deleteUser: (_id: string) => void;
}) {
  const [tempName, setTempName] = useState(user.name);
  const [tempRole, setTempRole] = useState<User["role"]>(user.role);

  useEffect(() => {
    setTempName(user.name);
    setTempRole(user.role);
  }, [user.name, user.role]);

  const handleEdit = () => {
    if (tempName !== user.name || tempRole !== user.role) {
      editUser(user._id, { name: tempName, role: tempRole });
    }
  };

  return (
    <Card
      hoverable 
      style={{ width: "100%" }} 
      bodyStyle={{ padding: 16 }} 
    >
      <Row align="middle" gutter={16} wrap={false}>
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
            onChange={(value) => setTempRole(value)}
            options={[
              { value: "user", label: "User" },
              { value: "admin", label: "Admin" },
            ]}
            style={{ width: "100%" }}
          />
        </Col>

        <Col flex="100px">
          <Tag color={user.role === "admin" ? "red" : "blue"}>
            {user.role}
          </Tag>
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
    </Card>
  );
}
