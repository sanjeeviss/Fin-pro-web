import { DeleteOutlined, UserAddOutlined} from "@ant-design/icons";
import AdminPageHeader from "../../../components/adminPageHeader/AdminPageHeader";
import { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import { useOutletContext } from "react-router-dom";
import {
  DeleteEmployee,
  GetEmployee,
} from "../../../services/Index";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import EmployeeDetail from "./EmployeeDetail";

export const Employees = () => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const imageRef = useOutletContext();

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleDelete = (id) => {
    DeleteEmployee(id)
      .then(() => {
        handleRefresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const res = await GetEmployee();
        const newData = res.data;
        setData(newData.map((item) => ({ ...item, key: item.id }))); // Ensure key is set
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [refresh]);

  const EmployeeColumn = [
    {
      title: "#",
      dataIndex: "index",
      render: (text, record, index) => index + 1,
      fixed: "left",
      width: 50,
    },
    {
      title: "Employee Name",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    {
      title: "Employee Number",
      dataIndex: "employee_number",
      key: "employee_number",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile_no",
      key: "mobile_no",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (_, item) => (
        <Space>
          <EmployeeDetail data={item}/>
          <EditEmployee data={item} handleRefresh={handleRefresh} />
          <Popconfirm
            title={null}
            description={`Are you sure to delete "${item.employee_name}"?`}
            onConfirm={() => handleDelete(item.id)}
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
        icon={<UserAddOutlined />}
        title="Employee"
        extra={<AddEmployee handleRefresh={handleRefresh} />}
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
              columns={EmployeeColumn}
              rowKey="id" // Set the rowKey prop
              pagination={{
                total: data.length,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} Employee`,
              }}
            />
          </span>
        </div>
      </div>
    </>
  );
};
