import { ExclamationCircleFilled } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetAuth } from "../store/slice/authSlice";
import { resetAdmin } from "../store/slice/adminSlice";
import { resetFilter } from "../store/slice/filterSlice";
import { message, Modal } from "antd";

const Common = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // admin slice start =========================================

  const initialActiveMenu = useSelector((state) => state.admin.userActiveMenu);
  const isLayoutCollapsed = useSelector((state) => state.admin.layoutCollapsed);

  // admin slice end =========================================

  // filter slice start=============================================

  const routeOptions = useSelector((state) => state.filter.filterRoute);
  const agentOptions = useSelector((state) => state.filter.filterAgent);
  const tenurOptions = useSelector((state) => state.filter.filterTenur);

  // filter slice end=============================================

  // auth slice start=========================================

  const User = useSelector((state) => state.auth.user);

  // auth slice end=========================================


  const CategoryOption = [
    { label: 'Other', value: 'other' },
    { label: 'Utilities', value: 'utilities' },
    { label: 'Transport', value: 'transport' },
    { label: 'Food', value: 'food' },
  ];



  const LogoutModal = () => {
    Modal.confirm({
      title: "Do you want to Logout?",
      icon: React.createElement(ExclamationCircleFilled),
      content:
        "When clicked the OK button, you will be redirect to the login page",
      onOk() {
        navigate("/login");
        dispatch(resetAuth());
        dispatch(resetAdmin());
        dispatch(resetFilter());
      },
      onCancel() {},
    });
  };

  const rupee="₹";
  return {
    message,
    isLayoutCollapsed,
    initialActiveMenu,
    tenurOptions,
    agentOptions,
    routeOptions,
    User,
    CategoryOption,
    rupee,
    LogoutModal,
    navigate,
    dispatch,
  };
};

export default Common;
