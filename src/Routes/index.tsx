import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LayoutRoutes from "./LayoutRoutes";
import { authRoutes } from "./AuthRoutes";
import Login from "../Componant/Authentication/Login";
import RegisterSimple from "../Pages/OtherPages/Authentication/RegisterSimple/RegisterSimple";

const RouterData = () => {
  const login = localStorage.getItem("login");
  return (
    <BrowserRouter basename={"/"}>
      <Routes>
      {login ? (
          <>
            <Route
              path={`${process.env.PUBLIC_URL}` || '/'}
              element={
                <Navigate to={`${process.env.PUBLIC_URL}/dashboard/home`} />
              }
            />
          </>
        ) : (
          ""
        )}
        <Route path={"/"} element={<PrivateRoute />}> 
          <Route path={`/*`} element={<LayoutRoutes />} />
        </Route>
        {authRoutes.map(({ path, Component }, i) => (
          <Route path={path} element={Component} key={i} />
        ))}
        <Route path={`${process.env.PUBLIC_URL}/login`} element={<Login />} />
        <Route path={`${process.env.PUBLIC_URL}/authentication/register_simple/:code?`} element={<RegisterSimple />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterData;
