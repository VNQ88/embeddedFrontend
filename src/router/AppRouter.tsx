import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../page/Login.tsx";
import Admin from "../page/Admin.tsx";
import UserProfile from "../page/UserPage.tsx";
import Screen31 from "../page/Screen3_1.tsx";
import LayOut from "../LayOut/LayOut.tsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<LayOut />}>
        <Route path="admin" element={<Admin />} />
        <Route path="user/:id" element={<UserProfile />} />
        <Route path="" element={<Screen31 />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
