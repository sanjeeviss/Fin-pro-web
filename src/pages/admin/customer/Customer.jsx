import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import AdminPageHeader from "../../../components/adminPageHeader/AdminPageHeader";
import { useEffect, useState } from "react";
import AddCustomer from "./AddCustomer";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import EditCustomer from "./EditCustomer";
import { useOutletContext } from "react-router-dom";
import { DeleteCustomer, GetCustomer } from "../../../services/Index";
import CustomerInfoTab from "./CustomerInfoTab";

export const Customer = () => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const imageRef = useOutletContext();

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleDelete = (id) => {
    DeleteCustomer(id)
      .then(() => {
        handleRefresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const res = await GetCustomer();
        const newData = res.data;
        setData(newData.map((item) => ({ ...item, key: item.id }))); // Ensure key is set
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [refresh]);

  const CustomerColumn = [
    {
      title: "#",
      dataIndex: "index",
      render: (text, record, index) => index + 1,
      fixed: "left",
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile_no",
      key: "mobile_no",
    },
  
    {
      title: "Loan Amount",
      dataIndex: "loan_amount",
      key: "loan_amount",
    },
    {
      title: "Due Amount",
      dataIndex: "due_amount",
      key: "due_amount",
    },
    {
      title: "Intrest",
      dataIndex: "intrest_amount",
      key: "intrest_amount",
    },
    {
      title: "Status",
      dataIndex: "active",
      render: (_, item) => <Tag color="success">{item.active=="YES"?"Active":"InActive"}</Tag>,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (_, item) => (
        <Space>
          <CustomerInfoTab data={item}/>
          <EditCustomer data={item} handleRefresh={handleRefresh} />
          <Popconfirm
            title={null}
            description={`Are you sure to delete "${item.name}"?`}
            onConfirm={() => handleDelete(item.c_id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <AdminPageHeader
        icon={<UserOutlined />}
        title="Customer"
        extra={<AddCustomer handleRefresh={handleRefresh} />}
      />
      <div className="outlet_content_wrapper">
        <div className="table_content">
          <span ref={imageRef}>
            <Table
              size="small"
              bordered={true}
              scroll={{ y: 500 }}
              dataSource={data}
              loading={loading}
              columns={CustomerColumn}
              rowKey="id" // Set the rowKey prop
              pagination={{
                total: data.length,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} Customer`,
              }}
            />
          </span>
        </div>
      </div>
    </>
  );
};
