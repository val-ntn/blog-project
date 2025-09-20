// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Shared/Navbar/Navbar";
import Footer from "./components/Shared/Footer/Footer";

import Home from "./pages/user/Home";
import News from "./pages/user/News";
import Calendar from "./pages/user/Calendar";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import Unauthorized from "./pages/user/Unauthorized";
import PostDetail from "./pages/user/PostDetail";
import EventDetail from "./pages/user/EventDetail";
import Reports from "./pages/user/Reports";
import ReportDetail from "./pages/user/ReportDetail";

import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./components/Admin/AdminLayout";

// This component is a child of Router, so hooks like useLocation work here
function AppContent() {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/admin") &&
    location.pathname !== "/admin/login";

  return (
    <div className="app">
      {/* Public Navbar */}
      {!isAdminRoute && <Navbar />}

      <main className="main">
        <div className="content">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/event-reports" element={<Reports />} />
            <Route path="/event-reports/:id" element={<ReportDetail />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected admin routes */}
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </main>

      {/* Public Footer */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
