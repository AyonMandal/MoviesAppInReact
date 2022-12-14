import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Detail from "../pages/details/Detail";
import Catalog from "../pages/Catalog";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<Catalog />} />
      <Route path="/:category/search/:keyword" element={<Catalog />} />
      <Route path="/:category/:id" element={<Detail />} />
    </Routes>
  );
};

export default AppRoutes;
