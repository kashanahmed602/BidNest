import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  CheckCircle,
  LogOut,
} from "lucide-react";

const AdminSidebar = () => {

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }

  return (
    <div className="w-64 min-h-screen bg-slate-900 border-r border-slate-700 p-6">

      <h1 className="text-3xl font-bold text-amber-400 mb-10">
        BidNest
      </h1>

      <nav className="space-y-3">

        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 p-3 rounded-lg"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/pending-users"
          className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 p-3 rounded-lg"
        >
          <Users size={20} />
          Pending Users
        </NavLink>

        <NavLink
          to="/approved-users"
          className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 p-3 rounded-lg"
        >
          <Users size={20} />
          Approved Users
        </NavLink>

        <NavLink
          to="/pending-products"
          className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 p-3 rounded-lg"
        >
          <Package size={20} />
          Pending Products
        </NavLink>

        <NavLink
          to="/approved-products"
          className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 p-3 rounded-lg"
        >
          <CheckCircle size={20} />
          Approved Products
        </NavLink>

         <NavLink
          to="/pending-auctions"
          className="flex items-center gap-3 text-slate-300 hover:bg-slate-800 p-3 rounded-lg"
        >
          <CheckCircle size={20} />
          Pending Auctions
        </NavLink>

      </nav>

      <button onClick={logout} className="mt-20 flex items-center gap-3 bg-red-600 hover:bg-red-700 w-full p-3 rounded-lg text-white">
        <LogOut size={18}/>
        Logout
      </button>

    </div>
  );
};

export default AdminSidebar;