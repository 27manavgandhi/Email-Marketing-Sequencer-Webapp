import Header from "@components/header/Header";
import React from "react";
import Routes from "../routes/Routes";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Routes />
      </main>
    </>
  );
};

export default Layout;
