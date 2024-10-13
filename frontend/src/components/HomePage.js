import React from "react";
import Tracking from "./Tracking";
import OrderHistory from "./OrderHistory";
import { Modal } from "antd";

const HomePage = ({ authed }) => {
  // // 接收 authed 作为 prop
  // return <OrderHistory />;
    if (authed) {
      return <OrderHistory/>
    } else {
      return <Tracking/>
    }
};

export default HomePage;
