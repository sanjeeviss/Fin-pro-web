import { Card, Col, Descriptions, Row, Spin } from "antd";
import PropTypes from "prop-types";

const CustomerDetail = ({ customerData, loading }) => {
  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "50vh",
            alignItems: "center",
          }}
        >
          <Spin tip="Loading..." />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <Descriptions column={2}>
                <Descriptions.Item label="Name">
                  {customerData?.name || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Mobile Number">
                  {customerData?.mobile_no || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {customerData?.email || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Loan Amount">
                  {customerData?.loan_amount || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Due Amount">
                  {customerData?.due_amount || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Interest Amount">
                  {customerData?.interest_amount || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  {customerData?.address || "N/A"}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

CustomerDetail.propTypes = {
  customerData: PropTypes.object,
  loading: PropTypes.bool,
};

export default CustomerDetail;
