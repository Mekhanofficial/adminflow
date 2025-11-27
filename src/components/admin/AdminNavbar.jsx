import React, { useState } from "react";
import { logoutAdmin, getAdminInfo } from "../../services/authServices";

export default function AdminNavbar({ onLogout }) {
  const [navbarSearch, setNavbarSearch] = useState("");
  const info = getAdminInfo();
  const name = (info && info.fname) || "Admin";

  const handleNavbarSearch = (e) => {
    setNavbarSearch(e.target.value);
    console.log("Navbar search:", e.target.value);
  };

  return (
    <header className="w-full bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-50">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
         {name} Dashboard
        </h2>
        <div className="flex-1 sm:w-64">
          <input
            type="text"
            placeholder="Search dashboard..."
            value={navbarSearch}
            onChange={handleNavbarSearch}
            className="w-full p-2 sm:p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => { logoutAdmin(); onLogout(); }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition text-sm sm:text-base"
          >
           Logout
          </button>
        </div>
      </div>
    </header>
  );
}