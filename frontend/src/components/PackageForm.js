import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  DatePicker,
  TimePicker,
  message,
} from "antd";
import "../App.css";
import moment from "moment";
import Recommendation from "./Recommendation";


const format = "HH";

const PackageForm = () => {
  return (
    <Form labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false}>
      <Form.Item>
        <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>
          Package
        </div>
        <Form.Item
          label="Total Weight:"
          name="totalWeight"
          labelCol={{ flex: "110px" }}
          rules={[{ required: true }]}
        >
          <Input
            style={{
              marginLeft: 10,
              borderRadius: 20,
            }}
          />
        </Form.Item>
        <Form.Item
          label="Number Of Package:"
          name="fromWeight"
          labelCol={{ flex: "110px" }}
          colon={false}
          rules={[{ required: true }]}
        >
          <Input
            style={{
              marginLeft: 10,
              borderRadius: 20,
            }}
          />
        </Form.Item>
        <Form.Item>
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, marginTop:20 }}>
            Additional Service
          </div>
          <Form.Item style={{ margin: 0, padding: 0 }}>
            <Checkbox style={{ fontSize: 14 }}>Signature Option (+$)</Checkbox>
          </Form.Item>
          <Form.Item style={{ margin: 0, padding: 0 }}>
            <Checkbox style={{ fontSize: 14 }}>Pickup Service (+$)</Checkbox>
          </Form.Item>
          <Form.Item
            label="Pickup Date:"
            name="pickupDate"
            labelCol={{ flex: "110px" }}
            style={{ marginLeft: 25, marginBottom: 0 }}
          ></Form.Item>
          <div>
            <DatePicker
              style={{ marginLeft: 20, width: "calc(90%)", borderRadius: 40 }}
            />
          </div>
          <Form.Item
            label="Pickup Time:"
            name="pickupTime"
            labelCol={{ flex: "110px" }}
            style={{ marginLeft: 25, marginBottom: 0 }}
          ></Form.Item>
          <div>
            <TimePicker.RangePicker
              defaultValue={moment("12", format)}
              format={format}
              style={{ marginLeft: 20, width: "calc(90%)", borderRadius: 20 }}
            />
          </div>
          <Form.Item style={{ margin: 0, padding: 0 }}>
            <Checkbox style={{ fontSize: 14 }}>Delivery Service (+$)</Checkbox>
          </Form.Item>
          <Form.Item
            label="Delivery Date:"
            name="deliveryDate"
            labelCol={{ flex: "110px" }}
            style={{ marginLeft: 25, marginBottom: 0 }}
          ></Form.Item>
          <div>
            <DatePicker
              style={{ marginLeft: 20, width: "calc(90%)", borderRadius: 40 }}
            />
          </div>
          <Form.Item
            label="Delivery Time:"
            name="deliveryTime"
            labelCol={{ flex: "110px" }}
            style={{ marginLeft: 25, marginBottom: 0 }}
          ></Form.Item>
          <div>
            <TimePicker.RangePicker
              defaultValue={moment("12", format)}
              format={format}
              style={{ marginLeft: 20, width: "calc(90%)", borderRadius: 20 }}
            />
          </div>
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export default PackageForm;
