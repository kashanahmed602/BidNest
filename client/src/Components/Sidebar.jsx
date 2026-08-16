import {
  LayoutDashboard,
  Store,
  Gavel,
  PlusCircle,
  Package,
  Wallet,
  Trophy,
  Heart,
  User,
  Settings,
  LogOut,
  ListOrderedIcon,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {

   const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }
    
  return (
    <div className="w-72 bg-slate-900 border-r border-slate-800 min-h-screen">

      {/* Logo */}

      <div className="p-6 border-b border-slate-800">

        <h1 className="text-3xl font-bold text-amber-500">
          BidNest
        </h1>

      </div>

      {/* Menu */}

      <div className="mt-4 flex flex-col">

        <NavLink to="/dashboard" className="sidebar-link">
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/marketplace" className="sidebar-link">
          <Store size={20} />
          Marketplace
        </NavLink>

        <NavLink to="/auctions" className="sidebar-link">
          <Gavel size={20} />
          Live Auctions
        </NavLink>

        {/* <NavLink to="/sell-product" className="sidebar-link">
          <PlusCircle size={20} />
          Sell Product
        </NavLink> */}

        <NavLink to="/my-products" className="sidebar-link">
          <Package size={20} />
          My Products
        </NavLink>

        <NavLink to="/my-bids" className="sidebar-link">
          <Wallet size={20} />
          My Bids
        </NavLink>

        <NavLink to="/won-auctions" className="sidebar-link">
          <Trophy size={20} />
          Won Auctions
        </NavLink>

        <NavLink to="/my-orders" className="sidebar-link">
          <ListOrderedIcon size={20} />
           Orders
        </NavLink>

        <NavLink to="/wishlist" className="sidebar-link">
          <Heart size={20} />
          Wishlist
        </NavLink>

        {/* <NavLink to="/profile" className="sidebar-link">
          <User size={20} />
          Profile
        </NavLink> */}

        <NavLink to="/settings" className="sidebar-link">
          <Settings size={20} />
          Setting
        </NavLink>

      </div>

      {/* Logout */}

      <div className="absolute bottom-6 w-72 px-4">

        <button onClick={logout} className="flex items-center gap-3 w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg text-white justify-center">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </div>
  );
};

export default Sidebar;