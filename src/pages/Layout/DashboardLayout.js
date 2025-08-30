import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// Fixed the items array - removed syntax errors
const items = [
  getItem(
    <Link to="/dashboard">Logo</Link>,
    "0",
    <PieChartOutlined style={{ margin: "20px 0px" }} />
  ),
  // Add more menu items here as needed
  // getItem("Dashboard", "1", <DesktopOutlined />),
  // getItem("Files", "2", <FileOutlined />),
  // getItem("Team", "3", <TeamOutlined />),
  // getItem("Users", "4", <UserOutlined />),
];

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["0"]} // Changed to match the key in items
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              background: "#f5f5f5",
              borderRadius: borderRadiusLG,
              marginTop: "20px",
            }}
          >
            {/* This will render the child routes */}
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;