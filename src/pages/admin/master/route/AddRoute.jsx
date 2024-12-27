import { PlusOutlined, SaveFilled } from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { useState } from "react";
import PropTypes from "prop-types";
import { CreateRoute } from "../../../../services/Index";

const AddRoute = ({ handleRefresh }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onClose = () => {
    form.resetFields();
    setOpen(false);
    setLoading(false);
  };

  const onFinish = (values) => {
    setLoading(true);
    const newData = {
      starting_point: values.starting_point,
      ending_point: values.ending_point,
    };
    CreateRoute(newData)
      .then(() => {
        handleRefresh();
        setLoading(false);
        onClose();
        message.success("Route created successfully!");
      })
      .catch(() => {
        setLoading(false);
        message.error("Facing error while creating Route");
      });
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        icon={<PlusOutlined />}
      >
        Add Route
      </Button>
      <Modal
        title="Add Route"
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
            name="starting_point"
            label="Starting Point"
            rules={[{ required: true, message: "Please enter Starting Point" }]}
          >
            <Input placeholder="Enter Starting Point" />
          </Form.Item>
          <Form.Item
            name="ending_point"
            label="Ending Point"
            rules={[{ required: true, message: "Please enter Ending Point" }]}
          >
            <Input placeholder="Enter Ending Point" />
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

AddRoute.propTypes = {
  handleRefresh: PropTypes.func,
};

export default AddRoute;
