import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  React.useEffect(() => {
    if (isHomePage) {
      document.body.classList.add("home-page");
    } else {
      document.body.classList.remove("home-page");
    }

    return () => {
      document.body.classList.remove("home-page");
    };
  }, [isHomePage]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
