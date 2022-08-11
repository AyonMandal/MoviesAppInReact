import "./App.scss";
import AppRoutes from "./config/AppRoutes";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import { BrowserRouter } from "react-router-dom";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
