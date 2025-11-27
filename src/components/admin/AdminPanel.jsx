import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminProducts from "./AdminProducts";
import AdminSidebar from "./AdminSideBar";

export default function AdminPanel() {
  const [activePage, setActivePage] = useState("products");
  const [showSidebar, setShowSidebar] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "products": 
        return <AdminProducts />;
      case "dashboard": 
        return <div className="text-center py-12"><h2 className="text-2xl font-bold">Dashboard Coming Soon</h2></div>;
      case "orders": 
        return <div className="text-center py-12"><h2 className="text-2xl font-bold">Orders Coming Soon</h2></div>;
      case "users": 
        return <div className="text-center py-12"><h2 className="text-2xl font-bold">Users Coming Soon</h2></div>;
      default: 
        return <AdminProducts />;
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {showSidebar && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowSidebar(false)}></div>
          <div className="relative z-50 w-64 h-full">
            <AdminSidebar 
              activePage={activePage} 
              setActivePage={setActivePage} 
              onClose={() => setShowSidebar(false)} 
            />
          </div>
        </div>
      )}
      
      <div className="hidden md:block sticky top-0 self-start">
        <AdminSidebar activePage={activePage} setActivePage={setActivePage} />
      </div>
      
      <div className="flex-1 flex flex-col min-h-screen">
        <AdminNavbar onLogout={() => window.location.href="/"} />
        <main className="flex-1 p-6 md:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}