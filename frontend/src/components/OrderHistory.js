import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Divider, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../App.css";
import { getOrderHistory, searchOrder } from "../utils";

function OrderHistory() {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrderHistory = async (query = {}) => {
    setLoading(true);
    try {
      const data = await getOrderHistory();
      console.log("data", data)
      setOrderData(data);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const handleSearch = async () => {
    // fetchOrderHistory({ id: orderId });
    setLoading(true);
    try {
      const data = await searchOrder(orderId);
      console.log("data",data);
      setOrderData([data])
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
    setLoading(false);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "order_time",
      key: "Date",
    },
    {
      title: "Order ID",
      dataIndex: "id",
      key: "OrderId",
    },
    {
      title: "From City",
      dataIndex: "from_city",
      key: "FromCity",
    },
    {
      title: "To City",
      dataIndex: "to_city",
      key: "ToCity",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "Status",
    },
  ];

  return (
    <div>
      <Row justify="space-between">
        <Col>
          <h1 className="header-text">Order History</h1>
        </Col>
        <Col>
          <Space>
            <Input
              placeholder="Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              prefix={<SearchOutlined />}
            />
            <Button type="primary" onClick={handleSearch} loading={loading}>
              Filter
            </Button>
          </Space>
        </Col>
      </Row>
      <Divider />
      <Table columns={columns} dataSource={orderData} loading={loading} />
    </div>
  );
}

export default OrderHistory;

