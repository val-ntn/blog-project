// frontend/src/components/Dashboard/Admin/Sidebar.jsx
import React from "react";
import PropTypes from "prop-types";
import LogoutButton from "./LogoutButton";

export default function DashboardSidebar({ selected, onSelect }) {
  const items = [
    { id: "posts", label: "Posts" },
    { id: "events", label: "Events" },
    { id: "reports", label: "Reports" },
    { id: "users", label: "Users" },
    { id: "pictures", label: "Pictures" },
    { id: "bin", label: "Recycle Bin" },
  ];

  return (
    <nav className="dashboard-sidebar">
      <ul className="dashboard-sidebar__list">
        {items.map(({ id, label }) => (
          <li key={id} className="dashboard-sidebar__item">
            <button
              type="button"
              className={`dashboard-sidebar__button ${
                selected === id ? "dashboard-sidebar__button--active" : ""
              }`}
              onClick={() => onSelect(id)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* Logout pinned at bottom */}
      <div className="dashboard-sidebar__footer">
        <LogoutButton className="dashboard-sidebar__logout" />
      </div>
    </nav>
  );
}
DashboardSidebar.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
