import { Table } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";

const LoanInfo = ({ customerData, loading }) => {
  const imageRef = useOutletContext();

  const LoanColumn = [
    {
      title: "#",
      dataIndex: "index",
      render: (text, record, index) => index + 1,
      fixed: "left",
      width: 50,
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
    {
      title: "Collected Date",
      dataIndex: "collected_date",
      key: "collected_date",
      render: (_, item) =>
        item.collected_date
          ? dayjs(item.collected_date).format("DD-MM-YYYY")
          : "N/A",
    },
  ];
  return (
    <div>
      {/* <Drawer
        title="Loan Details"
        onClose={onLoanClose}
        open={loanOpen}
        width={750}
        maskClosable={false}
      >
        {customerData?.loans?.length > 0 ? (
          <Row gutter={[16, 16]}>
            {customerData.loans.map((loan, index) => (
              <Col span={24} key={loan.l_id}>
                <Card
                  title={`Loan ${index + 1}`}
                  style={{ marginTop: 16 }}
                >
                  <Descriptions column={2}>
                    <Descriptions.Item label="Loan ID">
                      {loan.l_id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Loan Amount">
                      {loan.loan_amount}
                    </Descriptions.Item>
                    <Descriptions.Item label="Due Amount">
                      {loan.due_amount}
                    </Descriptions.Item>
                    <Descriptions.Item label="Balance Amount">
                      {loan.balance_amount}
                    </Descriptions.Item>
                    <Descriptions.Item label="Collection Amount">
                      {loan.collection_amount}
                    </Descriptions.Item>
                    <Descriptions.Item label="Collected Date">
                      {loan.collected_date
                        ? dayjs(loan.collected_date).format("DD-MM-YYYY")
                        : "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Collected Day">
                      {loan.collected_day || "N/A"}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Spin tip="No loans available." />
        )}
      </Drawer> */}
      <div className="table_content">
        <span ref={imageRef}>
          <Table
            size="small"
            bordered={true}
            scroll={{ y: 500 }}
            dataSource={customerData?.loans}
            loading={loading}
            columns={LoanColumn}
            rowKey="id" // Set the rowKey prop
            pagination={{
              total: customerData?.loans.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `Total ${total} Customer Loan`,
            }}
          />
        </span>
      </div>
    </div>
  );
};
LoanInfo.propTypes = {
  customerData: PropTypes.object,
  loading: PropTypes.bool,
};
export default LoanInfo;
