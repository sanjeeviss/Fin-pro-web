import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Descriptions, Drawer, Row } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

const EmployeeDetail = ({ data }) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  console.log("data", data);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        icon={<EyeOutlined />}
      />
      <Drawer
        title="Employee Detail"
        onClose={onClose}
        open={open}
        width={820}
        maskClosable={false}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <Descriptions column={2}>
                <Descriptions.Item label="Employee Number">
                  {data?.employee_number || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Name">
                  {data?.employee_name || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Mobile Number">
                  {data?.mobile_no || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {data?.email || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Role">
                  {data?.role || "N/A"}
                </Descriptions.Item>

                <Descriptions.Item label="Emergency Contact">
                  {data?.emergency_no || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Date of Birth">
                  {data?.d_o_b ? dayjs(data.d_o_b).format("DD-MM-YYYY") : "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Date of Joining">
                  {data?.d_o_joining
                    ? dayjs(data.d_o_joining).format("DD-MM-YYYY")
                    : "N/A"}
                </Descriptions.Item>

                <Descriptions.Item label="From Route">
                  {data?.from_route || "N/A"}
                </Descriptions.Item>

                <Descriptions.Item label="Address">
                  {data?.address || "N/A"}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

EmployeeDetail.propTypes = {
  data: PropTypes.object.isRequired, // Marking as required
};

export default EmployeeDetail;
