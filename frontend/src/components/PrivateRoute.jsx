import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute() {
  const userLogin = useSelector((state) => state.auth);
  return userLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
