import { EditOutlined, SaveFilled } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { UpdateLoanType } from "../../../../services/Index";
import PropTypes from "prop-types";
import Common from "../../../../hooks/common";

const EditLoanType = ({ handleRefresh, data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { tenurOptions } = Common();
  const onClose = () => {
    form.resetFields();
    setOpen(false);
    setLoading(false);
  };

  useEffect(() => {
    if (open && data) {
      form.setFieldsValue({ loan_type: data.loan_type || "" });
    }
  }, [open, data]);

  const onFinish = (values) => {
    setLoading(true);
    const newData = {
      loan_type: values.loan_type,
    };
    UpdateLoanType(data.id, newData)
      .then(() => {
        handleRefresh();
        setLoading(false);
        onClose();
        message.success("Loan Type updated successfully!");
      })
      .catch(() => {
        setLoading(false);
        message.error("Facing error while updating Loan Type");
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
        title="Edit Loan Type"
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
            rules={[{ required: true, message: "Please enter Loan Type" }]}
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
                Update
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

EditLoanType.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default EditLoanType;
