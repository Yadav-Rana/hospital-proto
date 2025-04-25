import {HashRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import {AuthProvider} from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthenticatedLayout from "./components/AuthenticatedLayout";
import PublicLayout from "./components/PublicLayout";
import {ToastContainer} from "react-toastify";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import CaretakerDashboard from "./pages/CaretakerDashboard";

// Test Component
import TestLoginComponent from "./components/TestLoginComponent";

// Styles
import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <LandingPage />
                </PublicLayout>
              }
            />
            <Route
              path="/login"
              element={
                <PublicLayout>
                  <LoginPage />
                </PublicLayout>
              }
            />

            {/* Hidden Admin Login - No link to this page from anywhere */}
            <Route
              path="/admin/login"
              element={
                <PublicLayout>
                  <AdminLoginPage />
                </PublicLayout>
              }
            />

            {/* Protected Routes with Navbar */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AuthenticatedLayout>
                    <AdminDashboard />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/:tab"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AuthenticatedLayout>
                    <AdminDashboard />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor"
              element={
                <ProtectedRoute allowedRoles={["doctor"]}>
                  <AuthenticatedLayout>
                    <DoctorDashboard />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/patient"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <AuthenticatedLayout>
                    <PatientDashboard />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/caretaker"
              element={
                <ProtectedRoute allowedRoles={["caretaker"]}>
                  <AuthenticatedLayout>
                    <CaretakerDashboard />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />

            {/* Test Route */}
            <Route path="/test-login" element={<TestLoginComponent />} />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastContainer
            position="bottom-right"
            theme="dark"
            toastStyle={{backgroundColor: "#3f3f46", color: "#f4f4f5"}}
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
