import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Descriptions, Drawer, Row } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

const LoanDetail = ({ data }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        icon={<EyeOutlined />}
      />

      <Drawer
        title="Loan Detail"
        onClose={onClose}
        open={open}
        width={820}
        maskClosable={false}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <Descriptions column={2}>
                <Descriptions.Item label="Loan ID">
                  {data?.loan_id || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Customer ID">
                  {data?.customer_id || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Name">
                  {data?.name || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Loan Amount">
                  {data?.loan_amount || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Due Amount">
                  {data?.due_amount || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Balance Amount">
                  {data?.balance_amount || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Mobile No">
                  {data?.mobile_no || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {data?.email || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  {data?.address || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Tenure">
                  {data?.tenure || "N/A"}
                </Descriptions.Item>

                <Descriptions.Item label="Collection Route">
                  <div>
                    {data?.collection_route.starting_point} -{" "}
                    {data?.collection_route.ending_point}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Collected Date">
                  {data?.created_at
                    ? dayjs(data.created_at).format("DD-MM-YYYY")
                    : "N/A"}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

LoanDetail.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LoanDetail;
