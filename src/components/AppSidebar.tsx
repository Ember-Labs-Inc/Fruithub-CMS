import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "../components/ui/sidebar";
import { Package, Users, Bell, Settings } from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "🏠",
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: "📂",
  },
  {
    title: "Orders",
    url: "/orders",
    icon: "📦",
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Users,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: "📈",
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 ">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">🛒</span>
          </div>
          <div>
            <h2 className="font-bold text-primary">FruitHub CMS</h2>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className={
                      location.pathname === item.url
                        ? "text-accent-foreground transition-colors duration-200"
                        : "transition-colors duration-200"
                    }
                  >
                    <Link to={item.url} className="flex items-center gap-2">
                      {typeof item.icon === "string" ? (
                        <span>{item.icon}</span>
                      ) : (
                        <item.icon className="w-4 h-4" />
                      )}
                      <span>{item.title}</span>
                    </Link>
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
