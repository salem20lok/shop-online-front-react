import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "../components/pages/login/login";
import ForgetPassword from "../components/pages/forgetPassword/ForgetPassword";
import ChangePassword from "../components/pages/changePassword/ChangePassword";
import Register from "../components/pages/register/Register";
import Layout from "../components/pages/layout/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />} path="/*" />
      <Route element={<Login />} path="/login" />
      <Route element={<ForgetPassword />} path="/forget-password" />
      <Route element={<ChangePassword />} path="/change-password" />
      <Route element={<Register />} path="/register" />
    </Routes>
  );
}

export default App;
