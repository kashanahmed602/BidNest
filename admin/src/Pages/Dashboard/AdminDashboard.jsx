import React from "react";
// import Sidebar from "../../Components/Sidebar";
import DashboardCards from "../../Components/DashboardCard";
// import PendingUsers from "../../Components/Sidebar";
// import PendingProducts from "../../Components/Sidebar";
import SidebarLayout from "../../Layout/SidebarLayout";
import axios from 'axios';
import { useState, useEffect } from 'react';

const AdminDashboard = () => {

  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [rejectProducts, setRejectProducts] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
  
      try{
        const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
        const [userResponse, productResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/v1/users?status=pending'),
          axios.get('http://localhost:3000/api/v1/productDashboard',{headers}),
        ]);

         const allUsers = userResponse.data.users || [];
  const allPendingUsers = allUsers.filter(user => user.status === "pending");

  const allProducts = productResponse.data.products || [];
  const allPendingProducts = allProducts.filter(product => product.status === "pending");
  const allApprovedProducts = allProducts.filter(product => product.status === "approved");
  const allRejectProducts = allProducts.filter(product => product.status === "rejected");

  setPendingUsers(allPendingUsers);
  setPendingProducts(allPendingProducts);
  setApprovedProducts(allApprovedProducts);
  setRejectProducts(allRejectProducts);
    
  
      }catch(error){
        console.log("Error Fetching Data:", error.message);
      }
  
    }

    fetchData();
  },[])

  return (
    <div className="flex bg-slate-950 min-h-screen">

      <SidebarLayout>

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-white mb-8">
          Admin Dashboard
        </h1>

        <DashboardCards pendingUsers={pendingUsers} pendingProducts={pendingProducts} approvedProducts={approvedProducts} rejectedProducts={rejectProducts} />

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