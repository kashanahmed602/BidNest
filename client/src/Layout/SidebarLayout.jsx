import Sidebar from "../Components/Sidebar";

const SidebarLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">

      {/* SIDEBAR */}
      <div className="h-screen flex-shrink-0">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>

    </div>
  );
};

export default SidebarLayout;