import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="workspace">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="page">
          <Outlet />
        </main>
      </div>

      {sidebarOpen ? (
        <button
          className="sidebar-scrim"
          aria-label="Close navigation"
          type="button"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
    </div>
  );
}
