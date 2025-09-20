// src/pages/admin/AdminLogin.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../utils/api";
import "./AdminLogin.css";
import "../../styles/layout.css";
import "../../styles/pages.css";
import "../../styles/forms.css";

function AdminLogin() {
  const { user, setUser, loading } = useAuth(); // <-- include setUser here
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Redirect if already logged in as admin
  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin") {
        navigate("/admin"); // Redirect to admin dashboard
      } else {
        // Optional: Redirect unauthorized roles elsewhere
        navigate("/unauthorized");
      }
    }
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(`${API_BASE_URL}/auth/login`, form, {
        withCredentials: true,
      });
      const userRes = await axios.get(`${API_BASE_URL}/auth/me`, {
        withCredentials: true,
      });
      setUser(userRes.data.user); // update context with user data
      navigate("/admin"); // redirect to admin dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-content page-content--login">
      <div className="admin-login">
        <h1 className="admin-login__title">Admin Login</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form className="admin-login__form" onSubmit={handleSubmit}>
          <div>
            <label className="admin-login__label" htmlFor="email">
              Email:
            </label>
            <input
              className="admin-login__input"
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="admin-login__label" htmlFor="password">
              Password:
            </label>
            <input
              className="admin-login__input"
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>
          <button className="admin-login__button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
