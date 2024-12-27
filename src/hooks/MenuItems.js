import {
  LogoutOutlined,
  PieChartOutlined,
  UserOutlined,
  MoneyCollectOutlined, // Icon for Loan
  DatabaseOutlined,
  ExportOutlined,
  UserAddOutlined,
  WalletOutlined, // Icon for Expenses
} from "@ant-design/icons";
import React from "react";

const Menuitems = () => {
  const LayoutMenu = [
    {
      key: "/",
      icon: React.createElement(PieChartOutlined),
      label: "Dashboard",
    },
    {
      key: "/customer",
      icon: React.createElement(UserOutlined),
      label: "Customer",
    },
    {
      key: "/employee",
      icon: React.createElement(UserAddOutlined),
      label: "Employee",
    },
    {
      key: "/loan",
      icon: React.createElement(MoneyCollectOutlined),
      label: "Loan",
    },
    {
      key: "/expenses", 
      icon: React.createElement(WalletOutlined), 
      label: "Expenses",
    },
    {
      key: "/master",
      icon: React.createElement(DatabaseOutlined),
      label: "Master",
    },
    // {
    //   key: "/export",
    //   icon: React.createElement(ExportOutlined),
    //   label: "Export Data",
    // },
    {
      key: "/log-out",
      icon: React.createElement(LogoutOutlined),
      label: "Log Out",
    },
  ];

  return {
    LayoutMenu,
  };
};

export default Menuitems;
