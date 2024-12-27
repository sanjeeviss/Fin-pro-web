import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import { ProtectedRoutes } from "./services/ProtectedRouter";
import AdminLayout from "./pages/AdminLayout";
import { Customer } from "./pages/admin/customer/Customer";
import { LightThemeConfig } from "./config/antdTheme";
import  Dashboard  from "./pages/admin/dashboard/Dashboard";
import { ConfigProvider } from "antd";
// import { Export } from "./pages/admin/export/Export";
import { Employees } from "./pages/admin/employee/Employee";
import Master from "./pages/admin/master/Master";
import LoanTab from "./pages/admin/loan/LoanTab";
import { Expenses } from "./pages/admin/expenses/Expenses";

function App() {
  return (
    <ConfigProvider theme={LightThemeConfig}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<AdminLayout />}>
            <Route index path="/" element={<Dashboard />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/loan" element={<LoanTab />} />
            <Route path="/master" element={<Master />} />
            {/* <Route path="/export" element={<Export />} /> */}
            <Route path="/employee" element={<Employees />} />
            <Route path="/expenses" element={<Expenses />} />
          </Route>
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
