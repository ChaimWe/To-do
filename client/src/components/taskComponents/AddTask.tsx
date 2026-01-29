import { Button, Form, Input, Modal} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSubmitTask } from "../../hooks/taskHooks/useSubmitTask";
import { NewTask } from "../../interfaces/taskInterfaces";

export default function AddTask() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const { mutate: taskSubmitMutate } = useSubmitTask();

  const handleSubmit = async (values: NewTask) => {
    await taskSubmitMutate(values);
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setVisible(true)}
      >Task</Button>

      <Modal
        title="Add new Task"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxWidth: 400, margin: "0 auto", gap: 16 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}