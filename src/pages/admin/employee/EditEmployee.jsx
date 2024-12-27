import { EditOutlined, PlusOutlined, SaveFilled } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { UpdateEmployee } from "../../../services/Index"; // Removed UpdateCustomer since it's not used
import Common from "../../../hooks/common";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

const EditEmployee = ({ handleRefresh, data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { message, tenurOptions, agentOptions, routeOptions } = Common();

  const onClose = () => {
    form.resetFields();
    setOpen(false);
    setLoading(false);
  };

  useEffect(() => {
    if (open && data) {
      const formattedData = {
        ...data,
        d_o_b: data.d_o_b ? dayjs(data.d_o_b) : null,
        d_o_joining: data.d_o_joining ? dayjs(data.d_o_joining) : null,
        starting_date: data.starting_date ? dayjs(data.starting_date) : null,
        ending_date: data.ending_date ? dayjs(data.ending_date) : null,
        from_route: data.from_route||null 
      };
      form.setFieldsValue(formattedData);
    }
  }, [open, data, form]);

  const onFinish = (values) => {
    setLoading(true);
    const newData = {
      ...values,
      starting_date: values.starting_date
        ? dayjs(values.starting_date).format("DD/MM/YYYY")
        : dayjs().format("DD/MM/YYYY"),
      ending_date: values.ending_date
        ? dayjs(values.ending_date).format("DD/MM/YYYY")
        : dayjs().format("DD/MM/YYYY"),
      d_o_b: values.d_o_b
        ? dayjs(values.d_o_b).format("DD/MM/YYYY")
        : dayjs().format("DD/MM/YYYY"),
      d_o_joining: values.d_o_joining
        ? dayjs(values.d_o_joining).format("DD/MM/YYYY")
        : dayjs().format("DD/MM/YYYY"),
    };
    UpdateEmployee(data.id, newData)
      .then(() => {
        handleRefresh();
        setLoading(false);
        onClose();
        message.success("Employee updated successfully!");
      })
      .catch(() => {
        setLoading(false);
        message.error("Error while updating Employee");
      });
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        icon={<EditOutlined />}
      />
      <Drawer
        title="Edit Employee"
        onClose={onClose}
        open={open}
        width={820}
        maskClosable={false}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16]}>
            {/** Employee Name */}
            <Col span={12}>
              <Form.Item
                name="employee_name"
                label="Employee Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input size="default" placeholder="Enter Employee Name" />
              </Form.Item>
            </Col>

            {/** Mobile Number */}
            <Col span={12}>
              <Form.Item
                name="mobile_no"
                label="Mobile Number"
                rules={[
                  { required: true, message: "Please enter Mobile number" },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Please enter a valid Mobile number",
                  },
                ]}
              >
                <Input size="default" placeholder="Enter Mobile Number" />
              </Form.Item>
            </Col>

            {/** Email */}
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <Input size="default" placeholder="Enter Email" />
              </Form.Item>
            </Col>

            {/** Password */}
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password placeholder="Enter Password" />
              </Form.Item>
            </Col>

            {/** Role */}
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Please enter the role" }]}
              >
                <Input size="default" placeholder="Enter Role" />
              </Form.Item>
            </Col>

            {/** Date of Birth */}
            <Col span={12}>
              <Form.Item name="d_o_b" label="Date of Birth">
                <DatePicker
                  style={{ width: "100%" }}
                  size="default"
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                />
              </Form.Item>
            </Col>

            {/** Date of Joining */}
            <Col span={12}>
              <Form.Item name="d_o_joining" label="Date of Joining">
                <DatePicker
                  style={{ width: "100%" }}
                  size="default"
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                />
              </Form.Item>
            </Col>

            {/** Route */}
            <Col span={12}>
              <Form.Item
                name="from_route"
                label="Route"
                rules={[{ required: true, message: "Please select Route" }]}
              >
                <Select
                  placeholder="Select Route"
                  allowClear
                  options={routeOptions}
                />
              </Form.Item>
            </Col>

            {/** Profile Upload */}
            <Col span={12}>
              <Form.Item name="profile" label="Profile">
                <Upload
                  name="profile"
                  accept=".png,.jpg,.jpeg"
                  showUploadList={false}
                >
                  <Button type="primary" icon={<PlusOutlined />}>
                    Upload Profile
                  </Button>
                </Upload>
              </Form.Item>
            </Col>

            {/** Address */}
            <Col span={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Please enter Address" }]}
              >
                <TextArea
                  placeholder="Enter Address"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
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
      </Drawer>
    </>
  );
};

EditEmployee.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default EditEmployee;
