import PropTypes from "prop-types";
import "./AdminPageHeader.css";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import Common from "../../hooks/common";
import _ from "lodash";

const AdminPageHeader = ({
  backButton = false,
  title = "Title",
  icon = <UserOutlined />,
  extra,
}) => {
  const{User}=Common();
  return (
    <div className="admin_page_header">
      <div className="admin_page_header_title_wrp">
        {backButton && (
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => history.go(-1)}
            style={{ marginRight: "10px" }}
            danger
            type="primary"
          />
        )}
        <span className="admin_page_header_icon">{icon}</span>
        <span className="admin_page_header_title">
          <b>{title}</b>
        </span>
      </div>
      <div className="admin_page_header_extra_wrp">
        {extra}
        <Avatar
          style={{ background: "#797BCF" }}
        >
          {_.toUpper(User.name[0])}
        </Avatar>
      </div>
    </div>
  );
};

AdminPageHeader.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.element,
  backButton: PropTypes.bool,
  extra: PropTypes.element,
};

export default AdminPageHeader;
