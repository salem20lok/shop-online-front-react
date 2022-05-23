import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "../components/pages/login/login";
import Dashboard from "../components/pages/dashboard/Dashboard";
import EcommerceSite from "../components/pages/EcommerceSite/EcommerceSite";
import ForgetPassword from "../components/pages/forgetPassword/ForgetPassword";
import ChangePassword from "../components/pages/changePassword/ChangePassword";
import Register from "../components/pages/register/Register";

function App() {
  return (
    <Routes>
      <Route element={<EcommerceSite />} path="/" />
      <Route element={<Dashboard />} path="/Dashboard" />
      <Route element={<Login />} path="/login" />
      <Route element={<ForgetPassword />} path="/forget-password" />
      <Route element={<ChangePassword />} path="/change-password" />
      <Route element={<Register />} path="/register" />
    </Routes>
  );
}

export default App;
