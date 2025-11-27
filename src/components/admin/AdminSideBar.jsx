import React from "react";
import { ShoppingCart, Package, LayoutDashboard, User, Settings, X } from "lucide-react";

export default function AdminSidebar({ activePage, setActivePage, onClose }) {
  const LinkItem = ({ id, label, icon }) => (
    <button
      onClick={() => {
        setActivePage(id);
        if (onClose) onClose(); 
      }}
      className={`flex items-center gap-3 p-3 w-full rounded-xl transition text-left font-medium
      ${activePage === id 
        ? "bg-blue-600 text-white shadow-lg scale-105" 
        : "bg-gray-800 text-gray-200 hover:bg-gray-700"}`}
    >
      {icon} {label}
    </button>
  );

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-950 text-gray-200 h-screen sticky top-0 overflow-y-auto p-6 flex flex-col">
      <div className="flex justify-between items-center mb-8 md:hidden">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your store</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={24} />
        </button>
      </div>

      <div className="mb-8 hidden md:block">
        <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your store</p>
      </div>

      <nav className="space-y-2 flex-1">
        <LinkItem id="dashboard" label="Dashboard" icon={<LayoutDashboard size={20} />} />
        <LinkItem id="products" label="Products" icon={<Package size={20} />} />
        <LinkItem id="orders" label="Orders" icon={<ShoppingCart size={20} />} />
        <LinkItem id="users" label="Users" icon={<User size={20} />} />
      </nav>

      <div className="border-t border-gray-700 pt-4">
        <button className="flex items-center gap-3 p-3 w-full rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 transition font-medium">
          <Settings size={20} /> Settings
        </button>
      </div>
    </aside>
  );
}