import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Products from "../Products";

const BarChart = () => (
  <div className="p-6 text-white">📊 Bar Chart Content</div>
);
const Search = () => <div className="p-6 text-white">🔍 Search Content</div>;
const Settings = () => (
  <div className="p-6 text-white">⚙️ Settings Content</div>
);

const Dashboard = () => {
  const [activePage, setActivePage] = useState("products");

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar activePage={activePage} setActivePage={setActivePage} />

        <main className="flex-1 px-6 py-2 w-full">
          <SidebarTrigger />
          
          {activePage === "products" && <Products />}
          {activePage === "barchart" && <BarChart />}
          {activePage === "search" && <Search />}
          {activePage === "settings" && <Settings />}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
