import React, { useState } from "react";
import { Button, Input, Form, message, Card } from "antd";
import { searchOrder } from "../utils"; // Ensure correct import path

const PREPARATION_TIME_MINUTES = 42;
const PREPARATION_TIME_MILLISECONDS = PREPARATION_TIME_MINUTES * 60 * 1000;

function Tracking() {
  const [loading, setLoading] = useState(false);
  const [orderID, setoOrderID] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);

  const calculateProgress = (orderTime, duration) => {
    const orderTimeMillis = new Date(orderTime).getTime();
    const currentTimeMillis = new Date().getTime();
    const elapsedTime = currentTimeMillis - orderTimeMillis ;
    const totalDurationMillis = duration * 1000 * 60;
    if (elapsedTime < PREPARATION_TIME_MILLISECONDS) { 
      return 0;
    }
    const progress = Math.min(((elapsedTime - PREPARATION_TIME_MILLISECONDS)/ totalDurationMillis) * 100, 100);
    return progress.toFixed(2); // To get a percentage value with two decimal places
  };

  const calculateEstimatedDeliveryTime = (orderTime, duration) => {
    const orderTimeDate = new Date(orderTime);
    const deliveryTimeDate = new Date(orderTimeDate.getTime() + PREPARATION_TIME_MILLISECONDS + duration * 1000 * 60);
    return deliveryTimeDate.toLocaleString(); // Format to a readable string
  };

  const handleTrack = async () => {
    if (orderID === "") {
      message.error("Please enter a tracking ID!");
      return;
    } else {
      setLoading(true);
      try {
        const data = await searchOrder(orderID);
        setOrderDetails(data); // Adjust based on your API response structure
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Form style={{ maxWidth: 600 }} layout="vertical">
      <Form.Item
        style={{ padding: 2 }}
        label="Tracking ID"
        name="trackingid"
        rules={[
          {
            required: true,
            message: "Please enter tracking ID!",
          },
        ]}
      >
        <Input.Group compact>
          <Input
            style={{ width: 450, marginRight: 5 }}
            placeholder="Enter your Tracking ID"
            value={orderID}
            onChange={(e) => setoOrderID(e.target.value)}
            onPressEnter={handleTrack}
          />
          <Button type="primary" onClick={handleTrack}>
            Track
          </Button>
        </Input.Group>
      </Form.Item>
      {orderDetails && (
        <Card title="Order Details" style={{ marginTop: 20 }}>
          <p>
            Progress:{" "}
            {calculateProgress(orderDetails.order_time, orderDetails.duration)}%
          </p>
          <p>
            Estimated Delivery Time:{" "}
            {calculateEstimatedDeliveryTime(
              orderDetails.order_time,
              orderDetails.duration
            )}
          </p>
        </Card>
      )}
    </Form>
  );
}

export default Tracking;
