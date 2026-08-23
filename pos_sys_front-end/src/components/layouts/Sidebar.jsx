import {
  BarChart3,
  Home,
  LogOut,
  Package,
  ReceiptText,
  ShoppingCart,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth.js";

import coffeeImage from "../../assets/Logo.png";

import { defaultSettings } from "../../services/settingsService.js";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "Sell", to: "/Sell", icon: ShoppingCart },
  { label: "Products", to: "/products", icon: Package },
  { label: "Orders", to: "/orders", icon: ReceiptText },
  { label: "Reports", to: "/reports", icon: BarChart3 },
];

export default function Sidebar({ open, onClose }) {
  const { currentUser, logout } = useAuth();
  return (
    <aside className={`sidebar ${open ? "is-open" : ""}`}>
      <div>
        <NavLink to="/Sell" className="brand" onClick={onClose}>
          <span className="brand-mark">
            <img src={coffeeImage} alt="logo" />
          </span>
          <span>
            <strong>{defaultSettings.storeName}</strong>
          </span>
        </NavLink>

        <nav className="side-nav">
          {navItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Icon size={21} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="profile-mini">
          <span className="avatar">{currentUser.name.charAt(0)}</span>
          <span>
            <strong>{currentUser.name}</strong>
            <small>{currentUser.role}</small>
          </span>
        </div>

        <button type="button" onClick={logout}>
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
}
