import { useEffect, useRef, useState } from "react";
import { Layout, Menu, theme } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import ImgProvider from "../assets/ImgProvider";
import Menuitems from "../hooks/MenuItems";
import Common from "../hooks/common";
import { layoutCollapsed, userActiveMenu } from "../store/slice/adminSlice";

const AdminLayout = () => {
  const { Content, Sider } = Layout;
  const {
    navigate,
    initialActiveMenu,
    isLayoutCollapsed,
    dispatch,
    LogoutModal,
  } = Common();
  const { LayoutMenu } = Menuitems();
  const [collapsed, setCollapsed] = useState(isLayoutCollapsed || false);
  const [activeMenu, setActiveMenu] = useState(initialActiveMenu || ["/"]);
  const ref = useRef(null);
  const {
    token: { layoutBG, siderBG, contentBg, colorSecondary },
  } = theme.useToken();

  const location = useLocation();

  useEffect(() => {
    dispatch(userActiveMenu(location.pathname));
    setActiveMenu([location.pathname]);
  }, [location.pathname]);

  const handleMenuChange = (event) => {
    if (event.key === "/log-out") {
      LogoutModal();
    } else {
      navigate(event.key);
      setActiveMenu([event.key]);
      dispatch(userActiveMenu([event.key]));
    }
  };

  const handleCollapse = (value) => {
    setCollapsed(value);
    dispatch(layoutCollapsed(value));
  };

  return (
    <Layout className="admin_layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => handleCollapse(value)}
        style={{
          background: siderBG,
        }}
        zeroWidthTriggerStyle={{
          background: colorSecondary,
        }}
        theme="dark"
      >
        <div
          className="sider_logo"
          onClick={() => handleMenuChange({ key: "/", keyPath: ["/"] })}
        >
          <ImgProvider
            name={isLayoutCollapsed ? "small_logo" : "logo"}
            className="layout_logo"
          />
        </div>
        <Menu
          style={{ background: siderBG }}
          mode="inline"
          selectedKeys={activeMenu}
          items={LayoutMenu}
          onClick={(e) => handleMenuChange(e)}
        />
      </Sider>
      <Layout style={{ background: layoutBG }}>
        <Content>
          <div
            style={{
              padding: "16px",
              minHeight: "100vh",
              background: contentBg,
              height: "100vh",
              overflow: "scroll",
              position: "relative",
            }}
          >
            <Outlet context={ref} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
