import { PlusOutlined, SaveFilled } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
} from "antd";
import { useEffect, useState } from "react";
import { CreateLoan } from "../../../services/Index";
import Common from "../../../hooks/common";
import PropTypes from "prop-types";

const AddLoan = ({ data, handleRefresh }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { message, agentOptions } = Common();

  const onClose = () => {
    form.resetFields();
    setOpen(false);
    setLoading(false);
  };
useEffect(()=>{
  form.setFieldsValue({collection_amount:data.due_amount});
},[open])
  const onFinish = (values) => {
    setLoading(true);
    const newData = {
      collection_amount: values.collection_amount,
    };
    CreateLoan(data.c_id, newData)
      .then(() => {
        handleRefresh();
        message.success("Loan created successfully!");
        onClose();
      })
      .catch(() => {
        message.error("Facing error while creating Loan");
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
        icon={<PlusOutlined />}
      >
        Loan
      </Button>
      <Modal
        title="Add Loan"
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
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

AddLoan.propTypes = {
  handleRefresh: PropTypes.func,
  data: PropTypes.object,
};

export default AddLoan;
