import { Route, Routes } from "react-router-dom";
import EcommerceSite from "../EcommerceSite/EcommerceSite";
import Dashboard from "../dashboard/Dashboard";
import React from "react";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box>
      <Routes>
        <Route element={<EcommerceSite />} path="/*" />
        <Route element={<Dashboard />} path="/dashboard/*" />
      </Routes>
    </Box>
  );
};
export default Layout;
