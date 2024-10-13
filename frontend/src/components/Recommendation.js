import React, { useState } from "react";
import { Form, Divider, Button, List, message } from "antd";
import ShippingOptions from "./ShippingOptions";
import OrderSummary from "./OrderSummary";
import "../App.css";
import { checkout, createOrder } from "../utils";

const timeConversion = (minutes) => {
  const days = Math.floor(minutes / 1440); // 1 day = 1440 minutes
  const hours = Math.floor((minutes % 1440) / 60); // remaining hours
  const remainingMinutes = minutes % 60; // remaining minutes

  return `${days} days, ${hours} hours, ${remainingMinutes} minutes`;
};

const Recommendation = ({ options }) => {
  // options = [
  //   {
  //     option_id: "efec31e3-fb42-421e-9b12-0c62974d42b1",
  //     base_id: 3,
  //     transportation: "robot",
  //     distance: 6506.999,
  //     duration: 76200,
  //     price: 130.13998,
  //   },
  //   {
  //     option_id: "1593441f-c150-4298-88f9-a222b191d1c2",
  //     base_id: 3,
  //     transportation: "drone",
  //     distance: 5529.994380625566,
  //     duration: 2318,
  //     price: 552.9994380625566,
  //   },
  //   {
  //     option_id: "8bc13eeb-9736-456a-afe6-cd9b5c116747",
  //     base_id: 3,
  //     transportation: "robot",
  //     distance: 13013.998,
  //     duration: 91440,
  //     price: 86.75998666666668,
  //   },
  // ];
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("rgb(209, 209, 209)");
  const [optionId, setOptionId] = useState(0);
  const [price, setPrice] = useState(0);

  const handleChoice = (option) => {
    console.log(option);
    setOptionId(option.option_id);
    setPrice(option.price);
  };
  const handleClick = async () => {
    console.log(optionId);
    setLoading(true);
    try {
      const orderId = await createOrder(optionId);
      message.success("Create Order successfully");
      checkout(orderId);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="shipping-info-container">
      <h1 className="header-text">Select a Shipping Service Option</h1>
      <Divider style={{ color: "gray" }} />
      <main className="form-container">
        <section>
          <List
            style={{ marginTop: 20 }}
            loading={loading}
            dataSource={options}
            renderItem={(option) => {
              return (
                <List.Item>
                  <Button
                    key={option.transportation}
                    style={{ borderColor: `${color}` }}
                    className="ship-option-style-orign"
                    tabIndex="1"
                    onClick={() => handleChoice(option)}
                  >
                    <div
                      style={{
                        fontSize: 26,
                        fontWeight: "bold",
                        textAlign: "start",
                      }}
                    >
                      {option.name}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        textAlign: "start",
                        color: "grey",
                      }}
                    >
                      Total Distance: {option.distance.toFixed(2)} km
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        textAlign: "start",
                        color: "grey",
                      }}
                    >
                      Estimated Delivery Time: {timeConversion(option.duration)}
                    </div>
                    <div
                      style={{
                        fontSize: 25,
                        fontWeight: 500,
                        alignContent: "baseline",
                        textAlignLast: "right",
                        marginRight: 5,
                      }}
                    >
                      ${option.price.toFixed(2)}
                    </div>
                  </Button>
                </List.Item>
              );
            }}
          />
          {/* <section className="column">
            <div>
              {options.map((option) => (
                <Button
                  key={option.transportation}
                  style={{ borderColor: `${color}` }}
                  className="ship-option-style-orign"
                  tabIndex="1"
                  onClick={() => handleClick(option)}
                >
                  <div
                    style={{
                      fontSize: 26,
                      fontWeight: 400,
                      textAlign: "start",
                    }}
                  >
                    {option.transportation}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      textAlign: "start",
                      color: "grey",
                    }}
                  >
                    Total Distance: {option.distance.toFixed(2)} km
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      textAlign: "start",
                      color: "grey",
                    }}
                  >
                    Estimated Delivery Time: {option.duration}
                  </div>
                  <div
                    style={{
                      fontSize: 25,
                      fontWeight: 500,
                      alignContent: "baseline",
                      textAlignLast: "right",
                      marginRight: 5,
                    }}
                  >
                    ${option.price.toFixed(2)}
                  </div>
                </Button>
              ))}
            </div>
          </section> */}
        </section>
        <section className="column">
          <Form>
            <Form.Item labelAlign="left" className="section-title">
              Order Summary
            </Form.Item>
            <div className="payment-details-container">
              <div className="payment-details-title">Subtotal:</div>
              <div className="payment-details">${price.toFixed(2)}</div>
              <div className="payment-details-title">Tax:</div>
              <div className="payment-details">${(price * 0.1).toFixed(2)}</div>
              <div
                className="payment-details-title"
                style={{ fontWeight: 600 }}
              >
                Total:{" "}
              </div>
              <div className="payment-details" style={{ fontWeight: 600 }}>
                ${(price * 1.1).toFixed(2)}
              </div>
            </div>
          </Form>
          <Button
            type="primary"
            htmlType="submit"
            className="package-form-submit-button"
            style={{ borderRadius: 5 }}
            onClick={handleClick}
          >
            Continue to Payment
          </Button>
        </section>
      </main>
    </div>
  );
};

export default Recommendation;
