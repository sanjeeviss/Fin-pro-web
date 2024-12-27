import { EditOutlined, SaveFilled } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { UpdateExpenses } from "../../../services/Index";
import Common from "../../../hooks/common";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

const EditExpenses = ({ handleRefresh, data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { message, CategoryOption } = Common();

  const onClose = () => {
    form.resetFields();
    setOpen(false);
    setLoading(false);
  };

  useEffect(() => {
    if (open && data) {
      const formattedData = {
        ...data,
        expense_date: data.expense_date ? dayjs(data.expense_date) : null,
        amount: parseInt(data.amount, 10) || null,
        description: data.description || null,
        category: data.category || null,
      };
      form.setFieldsValue(formattedData);
    }
  }, [open, data, form]);

  const onFinish = (values) => {
    setLoading(true);
    const newData = {
      ...values,
      expense_date: values.expense_date
        ? dayjs(values.expense_date).format("DD/MM/YYYY")
        : dayjs().format("DD/MM/YYYY"),
    };

    UpdateExpenses(data.id, newData)
      .then(() => {
        handleRefresh();
        setLoading(false);
        onClose();
        message.success("Expenses updated successfully!");
      })
      .catch(() => {
        setLoading(false);
        message.error("Error while updating Expenses");
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
        title="Edit Expenses"
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
            <Col span={12}>
              <Form.Item
                name="expense_date"
                label="Expense Date"
                rules={[
                  { required: true, message: "Please select an expense date" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format={"DD/MM/YYYY"}
                  placeholder="Select Expense Date"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="amount"
                label="Amount"
                rules={[
                  { required: true, message: "Please enter the amount" },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Please enter a valid amount",
                  },
                ]}
              >
                <Input placeholder="Enter Amount" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[
                  { required: true, message: "Please select a category" },
                ]}
              >
                <Select
                  placeholder="Select Category"
                  allowClear
                  options={CategoryOption}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please enter a description" },
                ]}
              >
                <TextArea
                  placeholder="Enter Description"
                  autoSize={{
                    minRows: 3,
                    maxRows: 5,
                  }}
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
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

EditExpenses.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default EditExpenses;
