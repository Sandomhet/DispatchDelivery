import React from "react";
import { Form } from "antd";

const options = [{ subtotal: "20", shipping: "50", tax: "10", total: "80" }];

const OrderSummary = ({ subtotal, shipping, tax, total }) => {
  return (
    <div>
      {options.map((option) => (
        <Form>
          <Form.Item labelAlign="left" className="section-title">
            Order Summary
          </Form.Item>
          <div className="payment-details-container">
            <div className="payment-details-title">Subtotal:</div>
            <div className="payment-details">${option.subtotal}</div>
            <div className="payment-details-title">Shipping:</div>
            <div className="payment-details"> ${option.shipping}</div>
            <div className="payment-details-title">Tax:</div>
            <div className="payment-details">${option.tax}</div>
            <div className="payment-details-title" style={{fontWeight: 600}}>Total: </div>
            <div className="payment-details" style={{fontWeight: 600}}>${option.total}</div>
          </div>
        </Form>
      ))}
    </div>
  );
};

export default OrderSummary;
