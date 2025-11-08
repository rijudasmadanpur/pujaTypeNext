"use client";
// import "./globals.css";
import React, { useState } from "react";
import {
  Home,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  ChevronLeft,
  Bell,
  Search,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import path from "path";


interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active = false,
  collapsed = false,
  onClick,
}) => {

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 cursor-pointer
        ${active
          ? "bg-orange-600 text-white shadow-lg"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }
        ${collapsed ? "justify-center px-2" : ""}
      `}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!collapsed && <span className="font-medium text-sm">{label}</span>}
    </button>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  // const { data: session } = useSession();

  const pathname = usePathname();

  const isDevotee = pathname.includes('/devotee');

  const sidebarItemsPadnit = [
    { id: "dashboard", icon: <Home size={20} />, label: "Dashboard", path: "dashboard" },
    { id: "MyPujaList", icon: <Users size={20} />, label: "My Puja List", path: "/my-puja-list" },
    {
      id: "UpcomingOrders",
      icon: <BarChart3 size={20} />,
      label: "Upcoming Orders",
      path: "/profile/dashboard/padnit/upcomingorders"
    },
    {
      id: "CompletedOrders",
      icon: <Settings size={20} />,
      label: "Completed Orders",
      path: "/profile/dashboard/devotee/completedorders"
    },
  ];
  const sidebarItemsDevotee = [
    { id: "dashboard", icon: <Home size={20} />, label: "Dashboard" },
    // { id: "MyPujaList", icon: <Users size={20} />, label: "My Puja List" },
    {
      id: "Orders",
      icon: <BarChart3 size={20} />,
      label: "Upcoming Orders",
      path: "/profile/dashboard/devotee/upcommingorder"
    },
    {
      id: "Order History",
      icon: <Settings size={20} />,
      label: "Completed Orders",
      path: "/profile/dashboard/devotee/orderhistory"
    },
  ];


  return (
    <html lang="en">
      <body className="h-screen">
        <div className="flex h-screen bg-gray-50">
          {/* Mobile Sidebar Overlay */}
          {mobileSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`
              fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 shadow-lg lg:shadow-none
              transition-all duration-300 ease-in-out
              ${sidebarCollapsed ? "w-16" : "w-64"}
              ${mobileSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
              }
            `}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              {!sidebarCollapsed && (
                <Link href={`/`} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">P</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    Pandji4You
                  </span>
                </Link>
              )}

              {/* Desktop Collapse Button */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft
                  className={`w-4 h-4 transition-transform ${sidebarCollapsed ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Mobile Close Button */}
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {(isDevotee ? sidebarItemsDevotee : sidebarItemsPadnit).map((item) => (
                <Link
                  key={item.id}
                  href={`/profile/${item.id}`}
                  className="cursor-pointer"
                >
                  <SidebarItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    active={activeItem === item.id}
                    collapsed={sidebarCollapsed}
                    onClick={() => setActiveItem(item.id)}
                  />
                </Link>
              ))}
            </nav>

            {/* Sidebar Footer */}
            {!sidebarCollapsed && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {"John Doe"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {"john@example.com"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Header */}
            <header className="bg-white border-b border-gray-200 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setMobileSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <Menu size={20} />
                  </button>

                  <h1 className="text-xl font-semibold text-gray-900 capitalize">
                    {activeItem}
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  {/* Search */}
                  <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-64">
                    <Search size={16} className="text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="bg-transparent border-none outline-none text-sm w-full"
                    />
                  </div>

                  {/* Notifications */}
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </button>

                  {/* Profile */}
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-6">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
