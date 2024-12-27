import "./login.css";
import LoginBanner from "../../assets/loginImage.jpeg";
import { Button, Checkbox, Form, Input } from "antd";
import Common from "../../hooks/common";
import { useState } from "react";
import { LoginUser } from "../../services/Index";
import { accessToken, user } from "../../store/slice/authSlice";
import { userActiveMenu } from "../../store/slice/adminSlice";
import UpdateFilterData from "../../hooks/UpdateFilterData";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { message, dispatch, navigate } = Common();
  const{Update}=UpdateFilterData();
  const onFinish = async (event) => {
    setLoading(true);
    try {
      const res = await LoginUser(event);
      dispatch(accessToken(res.token));
      dispatch(user(res.user));
      await Update("all");
      dispatch(userActiveMenu("/"));
      navigate("/");
      message.success(res.message);
    } catch (err) {
      setLoading(false);
      console.log(err);
      message.error(err.response?.data?.error || "An error occurred");
    }
    setLoading(false);
  };
  return (
    <div className="login_container">
      <div className="login_content">
        <div className="login_section">
          <div className="login_form">
            <div className="login_formContent">
              <Form
                initialValues={{
                  requiredMarkValue: false,
                }}
                style={{ width: "80%" }}
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
              >
                <Form.Item
                  label="Mobile Number"
                  name="mobile_no"
                  rules={[
                    { required: true, message: "Please enter Mobile Number" },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Please enter a valid Mobile Number",
                    },
                  ]}
                >
                  <Input
                    size="default"
                    placeholder={"Enter your Mobile Number"}
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password",
                    },
                  ]}
                >
                  <Input.Password
                    size="default"
                    placeholder={"Enter Password"}
                  />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Keep me logged in</Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login_btn"
                    size="default"
                    loading={loading}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="login_image">
            <img
              src={LoginBanner}
              alt="Login Banner"
              className="login_banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
