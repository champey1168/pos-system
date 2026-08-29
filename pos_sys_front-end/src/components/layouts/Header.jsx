import { ChevronDown, Menu, Search, UserRound } from "lucide-react";

import { useAuth } from "../../hooks/useAuth.js";

import { useSearch } from "../../context/searchContext.js";

export default function Header({ onMenuClick }) {
  const { currentUser } = useAuth();

  const { query, setQuery } = useSearch();

  return (
    <header className="app-header">
      <div className="header-title">
        <button
          className="icon-button mobile-menu"
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <div className="shop-brand">        
        </div>
      </div>

      <div className="header-search">
        <Search size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          aria-label="Search"
        />
      </div>

      <div className="header-actions">
        <div className="profile-chip">
          <span className="avatar">
            <UserRound size={20} />
          </span>
          <span>
            <strong>{currentUser.name}</strong>
            <small>{currentUser.role}</small>
          </span>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
