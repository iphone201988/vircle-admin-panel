import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { Menu } from "lucide-react";

export function DashboardShell({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Top Navbar (mobile only) */}
      <div className="flex shrink-0 items-center justify-between p-4 bg-gray-900 text-white lg:hidden">
        <h2 className="text-xl font-semibold">Vircle</h2>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar (sticky on desktop: in flow; drawer on mobile) */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-900 text-white transition-transform duration-300 lg:static lg:translate-x-0 shrink-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </aside>

        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          />
        )}

        {/* Main Content - only this section scrolls */}
        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
