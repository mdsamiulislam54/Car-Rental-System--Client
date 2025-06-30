import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../../Components/Footer/Footer";

const MainLayout = () => {

  return (
    <div>
      <header >
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer >
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
