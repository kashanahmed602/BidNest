import React from "react";
// import Sidebar from "../../Components/Sidebar";
import DashboardCards from "../../Components/DashboardCard";
// import PendingUsers from "../../Components/Sidebar";
// import PendingProducts from "../../Components/Sidebar";
import SidebarLayout from "../../Layout/SidebarLayout";

const AdminDashboard = () => {
    
  return (
    <div className="flex bg-slate-950 min-h-screen">

      <SidebarLayout>

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-white mb-8">
          Admin Dashboard
        </h1>

        <DashboardCards />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">

          {/* <PendingUsers /> */}

          {/* <PendingProducts /> */}

        </div>

      </div>

       </SidebarLayout>

    </div>
  );
};

export default AdminDashboard;