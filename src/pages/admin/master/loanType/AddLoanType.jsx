import { PlusOutlined, SaveFilled } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";
import { CreateLoanType } from "../../../../services/Index";
import Common from "../../../../hooks/common";

const AddLoanType = ({ handleRefresh }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { tenurOptions } = Common();
  const onClose = () => {
    form.resetFields();
    setOpen(false);
    setLoading(false);
  };

  const onFinish = (values) => {
    setLoading(true);
    const newData = {
      loan_type: values.loan_type,
    };
    CreateLoanType(newData)
      .then(() => {
        handleRefresh();
        setLoading(false);
        onClose();
        message.success("Loan Type created successfully!");
      })
      .catch(() => {
        setLoading(false);
        message.error("Facing error while creating Loan Type");
      });
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        icon={<PlusOutlined />}
      >
        Add Loan Type
      </Button>
      <Modal
        title="Add Loan Type"
        open={open}
        onCancel={onClose}
        footer={null}
        width={500}
        maskClosable={false}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="loan_type"
            label="Loan Type"
            rules={[{ required: true, message: "Please Select Loan Type" }]}
          >
            <Select
              placeholder="Select Loan Type"
              allowClear
              options={tenurOptions}
            />
            {/* <Input placeholder="Enter Loan Type" /> */}
          </Form.Item>

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

AddLoanType.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
};

export default AddLoanType;
