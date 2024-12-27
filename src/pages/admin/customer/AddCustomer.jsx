import { PlusOutlined, SaveFilled } from "@ant-design/icons";
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
  message as antdMessage,
} from "antd";
import { useState } from "react";
import { CreateCustomer } from "../../../services/Index";
import Common from "../../../hooks/common";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";


const AddCustomer = ({ handleRefresh }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { message, tenurOptions, agentOptions, routeOptions } = Common();

  const onClose = () => {
    form.resetFields();
    setOpen(false);
    setLoading(false);
  };

  const onFinish = (values) => {
    setLoading(true);
    let newData = {
      ...values,
      starting_date: values.starting_date
        ? dayjs(values.starting_date).format("DD/MM/YYYY")
        : dayjs().format("DD/MM/YYYY"),
      ending_date: values.ending_date
        ? dayjs(values.ending_date).format("DD/MM/YYYY")
        : dayjs().format("DD/MM/YYYY"),
    };
    CreateCustomer(newData)
      .then(() => {
        handleRefresh();
        setLoading(false);
        onClose();
        message.success("Customer created successfully!");
        form.resetFields();
      })
      .catch(() => {
        setLoading(false);
        message.error("Facing error while creating Customer");
      });
  };



  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        icon={<PlusOutlined />}
      >
        Add Customer
      </Button>
      <Drawer
        title="Add Customer"
        onClose={onClose}
        open={open}
        width={820}
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
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input size="default" placeholder="Enter Name" />
              </Form.Item>
            </Col>

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

            <Col span={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Please enter Address" }]}
              >
                <TextArea
                  placeholder="Enter Address"
                  autoSize={{
                    minRows: 3,
                    maxRows: 5,
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: 'email',
                    message: 'Please enter a valid email!',
                  },
                ]}
              >
                <Input size="default" placeholder="Enter Email" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Profile Upload">
                <Upload
                  name="profile"
                  accept=".png,.jpg,.jpeg"
                  showUploadList={false}
                >
                  <Button type="primary" icon={<PlusOutlined />}>Upload Profile</Button>
                </Upload>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="loan_amount"
                label="Loan Amount"
                rules={[
                  { required: true, message: "Please enter Loan Amount" },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Please Enter valid Loan Amount",
                  },
                ]}
              >
                <Input size="default" placeholder="Enter Loan Amount" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="due_amount"
                label="Due Amount"
                rules={[
                  { required: true, message: "Please enter Due Amount" },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Please Enter valid Due Amount",
                  },
                ]}
              >
                <Input size="default" placeholder="Enter Due Amount" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="intrest_amount"
                label="Interest Amount"
                rules={[
                  { required: true, message: "Please enter Interest Amount" },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Please Enter valid Interest Amount",
                  },
                ]}
              >
                <Input size="default" placeholder="Enter Interest Amount" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="tenure"
                label="Tenure"
                rules={[{ required: true, message: "Please select Tenure" }]}
              >
                <Select
                  placeholder="Select Tenure"
                  allowClear
                  options={tenurOptions}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="starting_date"
                label="Starting Date"
                rules={[
                  { required: true, message: "Please enter Starting Date" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  size="default"
                  format={"DD/MM/YYYY"}
                  placeholder="DD/MM/YYYY"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="ending_date"
                label="Ending Date"
                rules={[
                  { required: true, message: "Please enter Ending Date" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  size="default"
                  format={"DD/MM/YYYY"}
                  placeholder="DD/MM/YYYY"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="route"
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

            <Col span={12}>
              <Form.Item
                name="collection_agent"
                label="Collection Agent"
                rules={[
                  { required: true, message: "Please select Collection Agent" },
                ]}
              >
                <Select
                  placeholder="Select Collection Agent"
                  allowClear
                  options={agentOptions}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="referred_by"
                label="Referred By"
                rules={[
                  { required: false, message: "Please enter Referred By" },
                ]}
              >
                <Input size="default" placeholder="Enter Referred By" />
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
      </Drawer>
    </>
  );
};

AddCustomer.propTypes = {
  handleRefresh: PropTypes.func,
};

export default AddCustomer;
