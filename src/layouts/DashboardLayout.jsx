import React, { useContext, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Truck,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  UserCircle,
} from "lucide-react";

import logo from "../assets/img/logo.png";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const navLinks = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "Products", path: "/dashboard/products", icon: ShoppingBag },
    { name: "Orders", path: "/dashboard/orders", icon: Truck },
    { name: "Customers", path: "/dashboard/customers", icon: Users },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  // --- Logout Handler ---
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of the admin panel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout(); // Context এর logout কল হবে
        navigate("/"); // হোমে পাঠিয়ে দিবে
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-[#FDFBF9]">
      {/* --- 1. SIDEBAR --- */}
      <aside
        className={`
                fixed inset-y-0 left-0 z-50 w-[280px] bg-[#FEF4EC] border-r border-[#EBE3D9] 
                transition-transform duration-300 transform
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 md:sticky md:h-screen
            `}
      >
        <div className="flex flex-col h-full pt-12 pb-8 px-8">
          {/* Logo - Click to go Home */}
          <div className="mb-16 flex flex-col items-center">
            <Link
              to="/"
              className="w-20 h-20 mb-3 hover:opacity-80 transition-opacity"
            >
              <img
                src={logo}
                alt="Seoul Mirage"
                className="w-full h-full object-contain"
              />
            </Link>
            <Link to="/">
              <h2 className="text-3xl font-serif italic text-[#333] leading-tight text-center">
                Seoul Mirage
              </h2>
            </Link>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#CCAF91] mt-2 font-black text-center">
              Cosmetics Admin
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow space-y-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-sm transition-all duration-300 group ${
                    isActive
                      ? "bg-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
                      : "text-[#615E5B] hover:bg-[#F2E8DE]"
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                  <span
                    className={`text-[13px] tracking-wide font-bold uppercase ${isActive ? "opacity-100" : "opacity-80"}`}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button (Fixed Logic) */}
          <div className="mt-auto pt-8 border-t border-[#EBE3D9]">
            <button
              onClick={handleLogout}
              className="group w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-dashed border-[#CCAF91] text-[#A38A6F] rounded-sm transition-all hover:bg-black hover:text-white hover:border-black active:scale-95"
            >
              <LogOut
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* --- 2. MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden flex h-[70px] bg-[#FEF4EC] border-b border-[#EBE3D9] items-center justify-between px-6 sticky top-0 z-40">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
            <h2 className="text-xl font-serif italic text-[#333]">
              Seoul Mirage
            </h2>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-black"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Desktop Header - Dynamic User Data */}
        <header className="hidden md:flex h-[100px] bg-white border-b border-[#F0F0F0] items-center justify-between px-12 sticky top-0 z-30">
          <div>
            <h1 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">
              Dashboard
            </h1>
            <p className="text-2xl font-black italic text-gray-900 mt-1 uppercase tracking-tighter">
              {navLinks.find((l) => l.path === location.pathname)?.name ||
                "Overview"}
            </p>
          </div>

          <div className="flex items-center gap-10">
            <div className="flex items-center gap-5 text-gray-400">
              <Search
                size={20}
                className="hover:text-black cursor-pointer transition-colors"
              />
              <div className="relative">
                <Bell
                  size={20}
                  className="hover:text-black cursor-pointer transition-colors"
                />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </div>
            </div>

            {/* Dynamic User Profile */}
            <div className="flex items-center gap-4 pl-10 border-l border-gray-100">
              <div className="text-right">
                {/* ইউজার না থাকলে Guest দেখাবে */}
                <p className="text-sm font-black text-gray-900 leading-none">
                  {user?.name || user?.email?.split("@")[0] || "Admin"}
                </p>
                <p className="text-[10px] text-[#CCAF91] font-bold uppercase tracking-widest mt-1.5">
                  Super Admin
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-[#FEF4EC] p-0.5 overflow-hidden bg-gray-50 flex items-center justify-center">
                {user?.photoURL || user?.image ? (
                  <img
                    src={user.photoURL || user.image}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <UserCircle
                    size={44}
                    className="text-gray-200"
                    strokeWidth={1}
                  />
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 md:p-12 overflow-x-hidden">
          <div className="max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[45] md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
