import { Button, Form, Input, message, Modal, Segmented } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useRegister } from "../../hooks/userHooks/useRegister";
import { useLogin } from "../../hooks/userHooks/useLogin";
import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";
import { RegisterPayload } from "../../interfaces/authInterfaces";
import { useAuthControl } from "../../stores/AuthControl";

export default function UserAuth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const queryClient = useQueryClient();
  const { mutate: login, isPending: loginPending } = useLogin();
  const { mutate: register, isPending: registerPending } = useRegister();
  const { data: currentUser } = useCurrentUser();
  const { loginOpen, openLogin, closeLogin } = useAuthControl();


  const handleRegister = (
    values: RegisterPayload & { confirmPassword: string },
  ) => {
    const { confirmPassword, ...payload } = values;

    register(payload, {
      onSuccess: async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        closeLogin();
        registerForm.resetFields();
        message.success("Registration successful");
      },
      onError: (error: any) => {
        const errMsg = error?.response?.data?.message ?? "Registration failed";
        message.error(errMsg);
      },
    });
  };

  const handleLogin = (values: { email: string; password: string }) => {
    login(values, {
      onSuccess: async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        closeLogin();
        loginForm.resetFields();
        message.success("Welcome back!");
      },
      onError: (error: any) => {
        const errMsg = error?.response?.data?.message ?? "Login failed";
        message.error(errMsg);
      },
    });
  };


  return (
    <>
      <Button onClick={() => !currentUser && openLogin()}>
        <UserOutlined /> {currentUser?.name ?? "Sign in"}
      </Button>

      <Modal
        title={mode === "login" ? "Sign In" : "Create Account"}
        open={loginOpen}
        onCancel={closeLogin}
        footer={null}
        afterClose={() => {
          loginForm.resetFields();
          registerForm.resetFields();
          setMode("login");
        }}
      >
        <Segmented
          block
          value={mode}
          onChange={(v) => setMode(v as "login" | "register")}
          options={[
            { label: "Sign In", value: "login" },
            { label: "Register", value: "register" },
          ]}
        />

        {mode === "login" && (
          <div style={{ marginTop: 24 }}>
            <Form form={loginForm} onFinish={handleLogin} layout="vertical">
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true }, { type: "email" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }, { min: 8 }]}
              >
                <Input.Password />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={loginPending}
                block
              >
                Sign In
              </Button>
            </Form>
          </div>
        )}

        {mode === "register" && (
          <div style={{ marginTop: 24 }}>
            <Form
              form={registerForm}
              onFinish={handleRegister}
              layout="vertical"
            >
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true }, { type: "email" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }, { min: 8 }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  { required: true },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match"),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={registerPending}
                block
              >
                Create Account
              </Button>
            </Form>
          </div>
        )}
      </Modal>
    </>
  );
}
