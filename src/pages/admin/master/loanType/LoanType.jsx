import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import { useOutletContext } from "react-router-dom";
import {  DeleteLoanType, GetLoanType } from "../../../../services/Index";
import EditLoanType from "./EditLoanType";

export const LoanType = () => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const imageRef = useOutletContext();

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleDelete = (id) => {
    DeleteLoanType(id)
      .then(() => {
        handleRefresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchLoan = async () => {
      setLoading(true);
      try {
        const res = await GetLoanType();
        const newData = res.data;
        setData(newData.map((item) => ({ ...item, key: item.id }))); // Ensure key is set
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [refresh]);

  const LoanTypeColumn = [
    {
      title: "#",
      dataIndex: "index",
      render: (text, record, index) => index + 1,
      fixed: "left",
      width: 50,
    },
    {
      title: "Loan Type",
      dataIndex: "loan_type",
      key: "loan_type",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (_, item) => (
        <Space>
          <EditLoanType data={item} handleRefresh={handleRefresh} />
          <Popconfirm
            title={null}
            description={`Are you sure to delete "${item.loan_type}"?`}
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
     
        <div className="table_content">
          <span ref={imageRef}>
            <Table
              size="small"
              bordered={true}
              scroll={{ y: 500 }}
              dataSource={data}
              loading={loading}
              columns={LoanTypeColumn}
              rowKey="id" // Set the rowKey prop
              pagination={{
                total: data.length,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} Loan Type`,
              }}
            />
          </span>
        </div>
    </>
  );
};
