// src/components/Admin/Dashboard/LogoutButton.jsx

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { API_BASE_URL } from "../../../utils/api";
import PropTypes from "prop-types";

export default function LogoutButton({ className }) {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null); // reset user in context on logout
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button type="button" onClick={handleLogout} className={className}>
      Logout
    </button>
  );
}

LogoutButton.propTypes = {
  className: PropTypes.string,
};
