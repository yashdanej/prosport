import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import routes from "./Route";

const LayoutRoutes = () => {
  const user = JSON.parse(localStorage.getItem("login-user")!);
  const isAdmin = user?.user?.isAdmin;

  return (
    <Routes>
      {routes.map(({ path, Component }, i) => (
        <Route
          element={<Layout />}
          key={i}
        >
          {isAdmin && path.startsWith(`${process.env.PUBLIC_URL}/masteradmin`) ? (
            <Route path={path} element={Component} />
          ) : !isAdmin && !path.startsWith(`${process.env.PUBLIC_URL}/masteradmin`) ? (
            <Route path={path} element={Component} />
          ) : (
            <Route path="*" element={<Navigate to={isAdmin ? `${process.env.PUBLIC_URL}/masteradmin/dashboard/home` : `${process.env.PUBLIC_URL}/dashboard/home`} />} />
          )}
        </Route>
      ))}
    </Routes>
  );
};

export default LayoutRoutes;
