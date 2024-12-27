import { Tabs } from "antd";
import { AuditOutlined } from "@ant-design/icons";
import AdminPageHeader from "../../../components/adminPageHeader/AdminPageHeader";
import { useState } from "react";
import { LoanType } from "./loanType/LoanType";
import { Route } from "./route/Route";
import AddLoanType from "./loanType/AddLoanType";
import AddRoute from "./route/AddRoute";

const Master = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const items = [
    {
      key: "1",
      label: "Loan Type",
      children: <LoanType activeKey={activeKey} isActive={activeKey === "1"} />,
    },
    {
      key: "2",
      label: "Route",
      children: <Route activeKey={activeKey} isActive={activeKey === "2"} />,
    },
  ];
  const handleTabChange = (key) => {
    setActiveKey(key);
  };
  return (
    <>
      <AdminPageHeader icon={<AuditOutlined />} title="Master" />
      <div className="page_content_wrapper">
      <div className="outlet_content_wrapper" style={{paddingTop:"20px"}}>

        <Tabs
          defaultActiveKey={activeKey}
          items={items}
          onChange={handleTabChange}
          tabBarExtraContent={{
            right: activeKey === "1" ? <AddLoanType /> : <AddRoute />,
          }}
        />
      </div>
      </div>
    </>
  );
};

export default Master;
