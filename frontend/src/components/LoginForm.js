import React, { useState } from "react";
import { Form, Button, Input, message, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { login } from "../utils";

const LoginForm = ({ onLoginSuccess }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoginOnClick = () => {
    setModalVisible(true);
  };
  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);

    try {
      await login(data);
      message.success("Sign in successfully");
      setModalVisible(false);
      onLoginSuccess();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="text" style={{ padding: 0 }} onClick={handleLoginOnClick}>
        Sign In
      </Button>
      <Modal
        title="Sign In"
        footer={null} //delete the bottom two buttons "OK" and "Cancel"
        visible={modalVisible}
        onCancel={handleModalCancel}
      >
        <Form onFinish={handleFormSubmit}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              disabled={loading}
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password disabled={loading} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LoginForm;
