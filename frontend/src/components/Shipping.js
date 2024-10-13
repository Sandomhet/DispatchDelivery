import React, { useState } from "react";
import { Button, Divider, Form, Input, message } from "antd";
import "../App.css";
import ShipFromForm from "./ShipFromForm";
import ShipToForm from "./ShipToForm";
import PackageForm from "./PackageForm";
import Recommendation from "./Recommendation";
import { getShippingOptions } from "../utils";

const Shipping = ({ provideOptions, navigateToRecommendation }) => {
  const [loading, setLoading] = useState(false);
  // const [orderInfo, setOrderInfo] = useState({});

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      const resp = await getShippingOptions(data);
      message.success("Get Options successfully");
      console.log(resp);
      provideOptions(resp || []);
      navigateToRecommendation("2");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shipping-info-container">
      <h1 className="header-text">Create a Shipment</h1>
      <Divider style={{ color: "gray" }} />
      <Form
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        onFinish={handleFormSubmit}
      >
        <Form.Item name="shipfrom" style={{ marginBottom: 0 }}>
          <Form.Item style={{ fontSize: 20, fontWeight: 600 }}>
            Ship From
          </Form.Item>
          <Form.Item
            name="shipper"
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
            name="fromState"
            label="State:"
            labelCol={{ flex: "110px" }}
            rules={[{ required: true }]}
          >
            <Input
              style={{
                borderRadius: 20,
              }}
              placeholder="State"
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
          <Form.Item
            name="fromPhone"
            label="Phone:"
            labelCol={{ flex: "110px" }}
          >
            <Input
              style={{
                borderRadius: 20,
              }}
              placeholder="Phone"
            />
          </Form.Item>
          <Form.Item
            name="fromEmail"
            label="Email:"
            labelCol={{ flex: "110px" }}
          >
            <Input
              style={{
                borderRadius: 20,
              }}
              placeholder="Email"
            />
          </Form.Item>
        </Form.Item>
        <Form.Item name="Ship To" style={{ marginBottom: 0 }}>
          <Form.Item style={{ fontSize: 20, fontWeight: 600 }}>
            Ship To
          </Form.Item>
          <Form.Item
            name="consignee"
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
            name="toAddress"
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
            name="toState"
            label="State:"
            labelCol={{ flex: "110px" }}
            rules={[{ required: true }]}
          >
            <Input
              style={{
                borderRadius: 20,
              }}
              placeholder="State"
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
        <Form.Item name="Package" style={{ marginBottom: 0 }}>
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>
            Package
          </div>
          <Form.Item
            name="totalWeight"
            label="Total Weight:"
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
            name="fromWeight"
            label="Number Of Package:"
            labelCol={{ flex: "110px" }}
            colon={false}
          >
            <Input
              style={{
                marginLeft: 10,
                borderRadius: 20,
              }}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Confirm
          </Button>
        </Form.Item>
      </Form>
      {/* <main className="form-container">
        <section>
          <section className="column">
            <ShipFromForm />
          </section>
          <section className="column">
            <ShipToForm />
          </section>
        </section>
        <section className="column">
          <PackageForm />
          <Button
            type="primary"
            htmlType="submit"
            className="package-form-submit-button"
            onClick={handleClick}
          >
            Continue
          </Button>
        </section>
      </main> */}
    </div>
  );
};

export default Shipping;
