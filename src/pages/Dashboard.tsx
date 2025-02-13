import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        className={`flex-1 ${
          isCollapsed ? "ml-16" : "ml-64"
        } p-8 transition-all duration-300 ease-in-out`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
