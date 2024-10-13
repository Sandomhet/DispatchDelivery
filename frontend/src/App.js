import React, { useEffect, useState } from "react";
import { Layout, Dropdown, Menu, Button, Tabs, Modal } from "antd";
import HomePage from "./components/HomePage";
import About from "./components/About";
import Shipping from "./components/Shipping";
import { UserOutlined } from "@ant-design/icons";
import SignupButton from "./components/SignupButton";
import LoginForm from "./components/LoginForm";
// import OrderSummary from "./components/OrderSummary";
// import OrderHistory from "./components/OrderHistory";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
//   Link,
//   redirect,
// } from "react-router-dom";
import Recommendation from "./components/Recommendation";

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const App = () => {
  const [authed, setAuthed] = useState(false); // Remember to set to false at final implementation
  const [currentTab, setCurrentTab] = useState("0");
  const [options, setOptions] = useState([]);
  // const [activeKey, setActiveTabKey] = useState("1");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setAuthed(authToken !== null);
  }, []);
  const handleLoginSuccess = () => {
    setAuthed(true);
  };
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    setAuthed(false);
  };
  const userMenu = () => {
    if (authed) {
      return (
        <Menu>
          <Menu.Item key="logout" onClick={handleLogOut}>
            Log Out
          </Menu.Item>
        </Menu>
      );
    }
    return (
      <Menu>
        <Menu.Item key="signup">
          <SignupButton />
        </Menu.Item>
        <Menu.Item key="login">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </Menu.Item>
      </Menu>
    );
  };

  const handleRecommendation = (data) => {
    console.log(data);
    setOptions(data);
  };
  const handleTabChange = (key) => {
    setCurrentTab(key);
  };
  const renderContent = (key) => {
    switch (key) {
      case "1":
        return (
          <Shipping
            provideOptions={handleRecommendation}
            navigateToRecommendation={handleTabChange}
          />
        );
      case "2":
        return <Recommendation options={options} />;
      case "3":
        return <About />;
      default:
        return <HomePage authed={authed} />;
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        className="site-header-backgroud"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="site-name-font">Shipping Service</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Tabs
            defaultActiveKey="0"
            onChange={handleTabChange}
            destroyInactiveTabPane={true}
            className="equal-width-tabs"
          >
            <TabPane tab="Home" key="0" />
            <TabPane tab="Shipping" key="1" />
            {/* <TabPane tab="Recommendation" key="2" /> */}
            <TabPane tab="About Us" key="3" />
          </Tabs>
          <div
            style={{
              marginLeft: 30,
              marginTop: 48,
            }}
            alignItem="center"
          >
            <Dropdown trigger="click" overlay={userMenu}>
              <Button icon={<UserOutlined />} shape="circle" />
            </Dropdown>
          </div>
        </div>
      </Header>
      <Content
        className="site-layout-background"
        style={{
          paddingTop: 20,
          paddingLeft: 100,
          paddingRight: 100,
          height: "calc(100% - 64px)",
          overflow: "auto",
        }}
      >
        {/* <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router> */}
        {renderContent(currentTab)}
      </Content>
    </Layout>
  );
};

export default App;
