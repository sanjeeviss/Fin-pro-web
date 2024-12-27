import { Tabs } from "antd";
import AdminPageHeader from "../../../components/adminPageHeader/AdminPageHeader";
import { useState } from "react";
import { MoneyCollectOutlined } from "@ant-design/icons";
import Loan from "./Loan";

const LoanTab = () => {
  const [activeKey, setActiveKey] = useState("1");


  const items = [
    {
      key: "1",
      label: "Hold",
      children: <Loan activeKey={activeKey} isActive={activeKey === "1"} />,
    },
    {
      key: "2",
      label: "Pending",
      children: <Loan activeKey={activeKey} isActive={activeKey === "2"} />,
    },
    {
      key: "3",
      label: "Collected",
      children: <Loan activeKey={activeKey} isActive={activeKey === "3"} />,
    },
  ];
  const handleTabChange = (key) => {
    setActiveKey(key);
  };
  return (
    <>
      <AdminPageHeader icon={<MoneyCollectOutlined />} title="Loan" />
      <div className="page_content_wrapper">
      <div className="outlet_content_wrapper" style={{paddingTop:"20px"}}>

        <Tabs
          defaultActiveKey={activeKey}
          items={items}
          onChange={handleTabChange}
        />
      </div>
      </div>
    </>
  );
};

export default LoanTab;
