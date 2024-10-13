import React, { useState } from "react";
import { Form, Input, Checkbox, Col, Row } from "antd";
import "../App.css";

const ShipFromForm = () => {
  return (
    <Form labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false}>
      <Form.Item name="shipfrom" style={{ marginBottom: 0 }}>
        <Form.Item style={{ fontSize: 20, fontWeight: 600 }}>
          Ship From
        </Form.Item>
        <Form.Item
          name="fromName"
          label="Full Name"
          labelCol={{ flex: "110px" }}
          rules={[{ required: true }]}
        >
          <Input
            style={{
              borderRadius: 20,
            }}
            placeholder="Shipper Name"
          />
        </Form.Item>
        <Form.Item
          name="fromAddress"
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
          name="fromCity"
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
          name="FromState"
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
          name="fromZipCode"
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
        <Form.Item name="fromPhone" label="Phone:" labelCol={{ flex: "110px" }}>
          <Input
            style={{
              borderRadius: 20,
            }}
            placeholder="Phone"
          />
        </Form.Item>
        <Form.Item name="fromEmail" label="Email:" labelCol={{ flex: "110px" }}>
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
export default ShipFromForm;
