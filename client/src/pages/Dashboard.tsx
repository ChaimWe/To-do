import { Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <Row justify="center" style={{ marginTop: 40 }}>
      <Col>
        <Button onClick={() => navigate("tasks")}>
          Tasks
        </Button>
      </Col>
    </Row>
  );
}