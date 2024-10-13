import React from "react";
import { Button, Form } from "antd";
import { useState } from "react";

const { Item } = Form;
const options = [
  { name: "Fastest", deliveryBy: "Date1", cost: 20.0 },
  { name: "Recommended", deliveryBy: "Date2", cost: 20.0 },
  { name: "Lowest Cost", deliveryBy: "Date3", cost: 20.0 },
];

const ShippingOptions = () => {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("rgb(209, 209, 209)");

  const handleClick = () => {};

  return (
    <Form labelAlign="left">
      <Item>
        <div className="section-title">Shipping Service</div>
        <div>
          {options.map((option) => (
            <Button
              key={option.name}
              style={{ borderColor: `${color}` }}
              className="ship-option-style-orign"
              tabIndex="1"
              onClick={handleClick}
            >
              <div
                style={{ fontSize: 26, fontWeight: 400, textAlign: "start" }}
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
                Total Distance: {option.distance}km
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
                  fontSize: 20,
                  fontWeight: 500,
                  alignContent: "baseline",
                  textAlignLast: "right",
                  marginRight: 5,
                }}
              >
                ${option.price}
              </div>
            </Button>
          ))}
        </div>
      </Item>
    </Form>
  );
};

export default ShippingOptions;
