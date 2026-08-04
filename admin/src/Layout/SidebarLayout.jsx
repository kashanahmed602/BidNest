import Sidebar from "../Components/Sidebar";

const SidebarLayout = ({ children }) => {
  return (
    <div className="flex bg-slate-950 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">
        {children}
      </div>

    </div>
  );
};

export default SidebarLayout;