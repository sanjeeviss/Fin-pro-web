import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import { useOutletContext } from "react-router-dom";
import { DeleteLoan, GetLoanByMode } from "../../../services/Index";
import EditLoan from "./EditLoan";
import LoanDetail from "./LoanDetail";
import AddLoan from "./AddLoan";
import PropTypes from "prop-types";

const Loan = ({ isActive, activeKey }) => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const imageRef = useOutletContext();

  const handleRefresh = () => setRefresh((prev) => !prev);

  const handleDelete = async (id) => {
    try {
      await DeleteLoan(id);
      handleRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchLoan = async () => {
      setLoading(true);
      try {
        const statusMapping = {
          "1": { mode: "hold" },
          "2": { mode: "pending" },
          "3": { mode: "collected" },
        };

        if (isActive) {
          const activeFilter = statusMapping[activeKey] || {};
          const res = await GetLoanByMode(activeFilter);
          
          const newData = res.data.map((item) => ({ ...item, key: item.id }));
          setData(newData);
        }
      } catch (err) {
        console.error("Error fetching loans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [refresh, activeKey, isActive]);



  // Define columns conditionally based on activeKey
  const LoanColumns = [
    {
      title: "#",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
      fixed: "left",
      width: 50,
    },
    {
      title: "Customer Name",
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
      title: "Balance Amount",
      dataIndex: "balance_amount",
      key: "balance_amount",
    },
  ];

  // Add action column only if activeKey is not 3
  if (activeKey !== "3") {
    LoanColumns.push({
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (_, item) =>  <Space>
      <AddLoan data={item} handleRefresh={handleRefresh} />
      {/* <EditLoan data={item} handleRefresh={handleRefresh} /> */}
      <LoanDetail data={item}/>
      {/* <Popconfirm
        title={null}
        description={`Are you sure to delete "${item.l_id}"?`}
        onConfirm={() => handleDelete(item.l_id)}
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary" danger icon={<DeleteOutlined />} />
      </Popconfirm> */}
    </Space>,
    });
  }

  return (
    <div className="table_content">
      <span ref={imageRef}>
        <Table
          size="small"
          bordered
          scroll={{ y: 500 }}
          dataSource={data}
          loading={loading}
          columns={LoanColumns}
          rowKey="id"
          pagination={{
            total: data.length,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} Loan`,
          }}
        />
      </span>
    </div>
  );
};

Loan.propTypes = {
  activeKey: PropTypes.string,
  isActive: PropTypes.bool,
};

export default Loan;
