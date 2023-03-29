import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col items-start justify-start">
      <Header />

      <main className="w-full h-full flex justify-center items-center overflow-y-auto overflow-x-hidden">
        <Sidebar />
        <div className="w-full h-full md:w-3/4 bg-red-400">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
