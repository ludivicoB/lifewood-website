import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import ProjectPage from "./pages/ProjectPage";
import ApplyPage from "./pages/ApplyPage";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminPage";
import AboutPage from "./pages/AboutPage";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import AdminPage from "./pages/AdminPage"; // Admin Page after login
import ApplicationsPage from "./pages/ApplicationsPage";
import { Navigate } from "react-router-dom";

// App Component
export default function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <Router>
      <div className="app">
        <main className="main p-4">
          <ResponsiveAppBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectPage />} />
            {/* Prevent authenticated users from accessing /apply */}
            <Route
              path="/apply"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <ApplyPage />
              }
            />
            <Route path="/about" element={<AboutPage />} />

            {/* Protected Route */}
            <Route
              path="/adminpage"
              element={<PrivateRoute element={<ApplicationsPage />} />}
            />
            {/* <Route
              path="/applications"
              element={<PrivateRoute element={<ApplicationsPage />} />}
            /> */}

            {/* Catch-all Route for undefined paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </Router>
  );
}
