import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export const ProtectedRoutes = () => {
  const Token = useSelector((state) => state.auth.accessToken);
  let auth = { token: Token };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
  // return <Outlet/>;
};