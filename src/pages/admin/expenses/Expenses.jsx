import { DeleteOutlined, WalletOutlined } from "@ant-design/icons";
import AdminPageHeader from "../../../components/adminPageHeader/AdminPageHeader";
import { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import { useOutletContext } from "react-router-dom";
import { DeleteExpenses, GetExpenses } from "../../../services/Index";
import AddExpenses from "./AddExpenses";
import EditExpenses from "./EditExpenses";
import dayjs from "dayjs";

export const Expenses = () => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const imageRef = useOutletContext();

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleDelete = (id) => {
    DeleteExpenses(id)
      .then(() => {
        handleRefresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const res = await GetExpenses();
        const newData = res.data;
        setData(newData.map((item) => ({ ...item, key: item.id }))); // Ensure key is set
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [refresh]);

  const ExpensesColumn = [
    {
      title: "#",
      dataIndex: "index",
      render: (text, record, index) => index + 1,
      fixed: "left",
      width: 50,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, item) =>parseInt(item.amount, 10),
    },
    {
      title: "Expense Date",
      dataIndex: "expense_date",
      key: "expense_date",
      render: (_, item) => dayjs(item.expense_date).format("DD/MM/YYYY"),
    },
   
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (_, item) => (
        <Space>
          <EditExpenses data={item} handleRefresh={handleRefresh} />
          <Popconfirm
            title={null}
            description={`Are you sure to delete "${item.category}"?`} 
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
        icon={<WalletOutlined />}
        title="Expenses"
        extra={<AddExpenses handleRefresh={handleRefresh} />}
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
              columns={ExpensesColumn}
              rowKey="id"
              pagination={{
                total: data.length,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} Expenses`,
              }}
            />
          </span>
        </div>
      </div>
    </>
  );
};
