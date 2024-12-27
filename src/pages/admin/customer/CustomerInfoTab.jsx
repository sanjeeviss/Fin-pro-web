import { Button, Drawer, Tabs } from "antd";
import { useEffect, useState } from "react";
import CustomerDetail from "./CustomerDetail";
import LoanInfo  from "./LoanInfo";
import PropTypes from "prop-types";
import { EyeOutlined } from "@ant-design/icons";
import { GetCustomerDetail } from "../../../services/Index";

const CustomerInfoTab = ({ data }) => {
  const [activeKey, setActiveKey] = useState("1");
  const [open, setOpen] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [customerLoan, setCustomerLoan] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCustomerDetail = async () => {
    if (open) {
      setLoading(true);
      try {
        const res = await GetCustomerDetail(data.c_id);
        setCustomerData(res.data);
        setCustomerLoan(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCustomerDetail();
  }, [open,data.c_id]);

  const onClose = () => {
    setOpen(false);
  };
  const items = [
    {
      key: "1",
      label: "Customer Information",
      children: (
        <CustomerDetail
          loading={loading}
          customerData={customerData}
          activeKey={activeKey}
          isActive={activeKey === "1"}
        />
      ),
    },
    {
      key: "2",
      label: "Customer Loan",
      children: (
        <LoanInfo
          loading={loading}
          customerData={customerLoan}
          activeKey={activeKey}
          isActive={activeKey === "2"}
        />
      ),
    },
  ];
  const handleTabChange = (key) => {
    setActiveKey(key);
  };
  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        icon={<EyeOutlined />}
      />

      <Drawer
        title="Customer Detail"
        onClose={onClose}
        open={open}
        width={1000}
        maskClosable={false}
      >
        <Tabs
          defaultActiveKey={activeKey}
          items={items}
          onChange={handleTabChange}
        />
      </Drawer>
    </>
  );
};
CustomerInfoTab.propTypes = {
  data: PropTypes.object,
};

export default CustomerInfoTab;
