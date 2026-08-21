import SidebarLayout from "../../Layout/SidebarLayout";
import DashboardCards from "../../Components/DashboardCard";
import RecentActivity from "../../Components/RecentActivity";
import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [winner, setWinner] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchData = async  () => {
    try{
      const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
    const [ productResponse, auctionResponse, winnerResponse, wishlistResponse ] = await Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/products`, {headers}),
      axios.get(`${import.meta.env.VITE_API_URL}/auctions`, {headers}),
      axios.get(`${import.meta.env.VITE_API_URL}/getWinner`, {headers}),
      axios.get(`${import.meta.env.VITE_API_URL}/wishlist`, {headers}),
    ]);

    const allProducts = productResponse.data.products || [];
    const approvedProducts = allProducts.filter(product => product.status === "approved");

    const allAuctions = auctionResponse.data.auctions || [];
    const approvedAuctions = allAuctions.filter(auction => auction.auctionStatus === "live" && auction.status === "approved");

    setProducts(approvedProducts);
    setAuctions(approvedAuctions);
    setWinner(winnerResponse.data.auctions || []);
    setWishlist(wishlistResponse.data.wishlist || []);
    
    console.log("Products Response:", productResponse.data);

  }catch(error){
    console.log("Error Dashboard Products:", error.message);

  }
}

fetchData();
  },[])

  const username = JSON.parse(localStorage.getItem("user"));
  
  return (
    <>
    <SidebarLayout>

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-white">
          Welcome Back {username.name} 👋
        </h1>

        <p className="text-slate-400 mt-2">
          Here's what's happening with your account today.
        </p>

      </div>

      {/* Cards */}

      <DashboardCards products={products} auctions={auctions} winner={winner} wishlist={wishlist} />

      <div className="mt-8">
    <RecentActivity />
</div>

    </SidebarLayout>

    
</>
  );
};

export default Dashboard;