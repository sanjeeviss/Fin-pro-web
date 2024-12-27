import { EditOutlined, SaveFilled } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { UpdateLoan } from "../../../services/Index";
import Common from "../../../hooks/common";
import PropTypes from "prop-types";

const EditLoan = ({ handleRefresh, data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { message, agentOptions } = Common();

  const onClose = () => {
    form.resetFields();
    setOpen(false);
    setLoading(false);
  };

  useEffect(() => {
    if (open && data) {
      const formattedData = {
        collection_agent: data.collection_agent || null,
        collection_amount: data.collection_amount || null,
      };
      form.setFieldsValue(formattedData);
    }
  }, [open, data]);

  const onFinish = (values) => {
    setLoading(true);
    const newData = {
      ...values,
    };
    UpdateLoan(data.l_id, newData)
      .then(() => {
        handleRefresh();
        message.success("Loan updated successfully!");
        onClose();
      })
      .catch(() => {
        message.error("Facing error while updating Loan");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        icon={<EditOutlined />}
      />
      <Modal
        title="Edit Loan"
        open={open}
        onCancel={onClose}
        footer={null}
        maskClosable={false}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Row gutter={[16]}>
           
            <Col span={24}>
              <Form.Item
                name="collection_amount"
                label="Collection Amount"
                rules={[
                  { required: true, message: "Please enter Collection Amount" },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Please enter a valid Collection Amount",
                  },
                ]}
              >
                <Input size="default" placeholder="Enter Collection Amount" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveFilled />}
                loading={loading}
              >
                Update
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

EditLoan.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default EditLoan;
