import { EditOutlined, SaveFilled } from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UpdateRoute } from "../../../../services/Index";

const EditRoute = ({ handleRefresh, data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onClose = () => {
    form.resetFields();
    setOpen(false);
    setLoading(false);
  };

  useEffect(() => {
    if (open && data) {
      const formattedData = {
        starting_point: data.starting_point || "",
        ending_point: data.ending_point || "",
      };
      form.setFieldsValue(formattedData);
    }
  }, [open, data]);

  const onFinish = (values) => {
    setLoading(true);
    const newData = {
      starting_point: values.starting_point,
      ending_point: values.ending_point,
    };
    UpdateRoute(data.id, newData)
      .then(() => {
        handleRefresh();
        setLoading(false);
        onClose();
        message.success("Route updated successfully!");
      })
      .catch(() => {
        setLoading(false);
        message.error("Facing error while updating Route");
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
        title="Edit Route"
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
                Update
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

EditRoute.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default EditRoute;
