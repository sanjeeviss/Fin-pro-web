import { DeleteOutlined} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import { useOutletContext } from "react-router-dom";
import EditRoute from "./EditRoute";
import {DeleteRoute, GetRoute } from "../../../../services/Index";

export const Route = () => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const imageRef = useOutletContext();

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleDelete = (id) => {
    DeleteRoute(id)
      .then(() => {
        handleRefresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchRoute = async () => {
      setLoading(true);
      try {
        const res = await GetRoute();
        const newData = res.data;
        setData(newData.map((item) => ({ ...item, key: item.id }))); // Ensure key is set
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [refresh]);

  const RouteColumn = [
    {
      title: "#",
      dataIndex: "index",
      render: (text, record, index) => index + 1,
      fixed: "left",
      width: 50,
    },
    {
      title: "Starting point",
      dataIndex: "starting_point",
      key: "starting_point",
    },
    {
      title: "Ending point",
      dataIndex: "ending_point",
      key: "ending_point",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (_, item) => (
        <Space>
          <EditRoute data={item} handleRefresh={handleRefresh} />
          <Popconfirm
            title={null}
            description={`Are you sure to delete "${item.starting_point}"?`}
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
 
      <div className="outlet_content_wrapper">
        <div className="table_content">
          <span ref={imageRef}>
            <Table
              size="small"
              bordered={true}
              scroll={{ y: 500 }}
              dataSource={data}
              loading={loading}
              columns={RouteColumn}
              rowKey="id" // Set the rowKey prop
              pagination={{
                total: data.length,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} Route`,
              }}
            />
          </span>
        </div>
      </div>
    </>
  );
};
