import { Search, Settings, ShoppingCart, BarChart } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Products", url: "products", icon: ShoppingCart },
  { title: "BarChart", url: "barchart", icon: BarChart },
  { title: "Search", url: "search", icon: Search },
  { title: "Settings", url: "settings", icon: Settings },
];

export function AppSidebar({ activePage, setActivePage }) {
  return (
    <Sidebar className="bg-gray-900 w-64 min-h-screen">
      <SidebarContent className="bg-gray-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-100 text-sm font-semibold px-4 py-2">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 mt-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => setActivePage(item.url)}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-md transition 
                      ${
                        activePage === item.url
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                  >
                    <button className="flex items-center space-x-3 w-full">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
