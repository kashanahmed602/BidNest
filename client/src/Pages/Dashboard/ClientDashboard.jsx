import SidebarLayout from "../../Layout/SidebarLayout";
import DashboardCards from "../../Components/DashboardCard";
import RecentActivity from "../../Components/RecentActivity";

const Dashboard = () => {
  return (
    <>
    <SidebarLayout>

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-white">
          Welcome Back 👋
        </h1>

        <p className="text-slate-400 mt-2">
          Here's what's happening with your account today.
        </p>

      </div>

      {/* Cards */}

      <DashboardCards />

      <div className="mt-8">
    <RecentActivity />
</div>

    </SidebarLayout>

    
</>
  );
};

export default Dashboard;