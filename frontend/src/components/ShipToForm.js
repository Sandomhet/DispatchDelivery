import React, { useState } from "react";
import { Form, Input } from "antd";
import "../App.css";

const ShipToForm = () => {
  return (
    <Form labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false}>
      <Form.Item name="Ship To" style={{ marginBottom: 0 }}>
        <Form.Item style={{ fontSize: 20, fontWeight: 600 }}>Ship To</Form.Item>
        <Form.Item
          name="toName"
          label="Full Name:"
          labelCol={{ flex: "110px" }}
          rules={[{ required: true }]}
        >
          <Input
            style={{
              borderRadius: 20,
            }}
            placeholder="Receipt Name"
          />
        </Form.Item>
        <Form.Item
          name="toaddress"
          label="Address"
          labelCol={{ flex: "110px" }}
          rules={[{ required: true }]}
        >
          <Input
            style={{
              borderRadius: 20,
            }}
            placeholder="Address"
          />
        </Form.Item>
        <Form.Item
          name="toCity"
          label="City"
          labelCol={{ flex: "110px" }}
          rules={[{ required: true }]}
        >
          <Input
            style={{
              borderRadius: 20,
            }}
            placeholder="City"
          />
        </Form.Item>
        <Form.Item
          name="ToState"
          label="County:"
          labelCol={{ flex: "110px" }}
          rules={[{ required: true }]}
        >
          <Input
            style={{
              borderRadius: 20,
            }}
            placeholder="County"
          />
        </Form.Item>
        <Form.Item
          name="toZipCode"
          label="Zip Code:"
          labelCol={{ flex: "110px" }}
          rules={[{ required: true }]}
        >
          <Input
            style={{
              borderRadius: 20,
            }}
            placeholder="Zip Code"
          />
        </Form.Item>
        <Form.Item name="toPhone" label="Phone:" labelCol={{ flex: "110px" }}>
          <Input
            style={{
              borderRadius: 20,
            }}
            placeholder="Phone"
          />
        </Form.Item>
        <Form.Item name="toEmail" label="Email:" labelCol={{ flex: "110px" }}>
          <Input
            style={{
              borderRadius: 20,
            }}
            placeholder="Email"
          />
        </Form.Item>
      </Form.Item>
    </Form>
  );
};
export default ShipToForm;
