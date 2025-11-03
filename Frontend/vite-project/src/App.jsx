import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import FuelAdditives from "./pages/Additive";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import About from "./pages/About";
import FuelMyRide from "./pages/FuelRide";
import FuelBoat from "./pages/FuelBoat";
import FuelMyFleet from "./pages/FuelFleet";
import Residential from "./pages/Residential";
import Generators from "./pages/commercial/Generators";
import Construction from "./pages/commercial/Construction";
import Orders from "./pages/Orders";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("fuelgo_user"); 
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container my-4">
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />

          <Route
            path="/fuel-ride"
            element={
              <ProtectedRoute>
                <FuelMyRide />
              </ProtectedRoute>
            }
          />

          <Route
            path="/fuel-boat"
            element={
              <ProtectedRoute>
                <FuelBoat />
              </ProtectedRoute>
            }
          />

          <Route
            path="/fuel-fleet"
            element={
              <ProtectedRoute>
                <FuelMyFleet />
              </ProtectedRoute>
            }
          />

          <Route
            path="/residential"
            element={
              <ProtectedRoute>
                <Residential />
              </ProtectedRoute>
            }
          />

          <Route
            path="/additives"
            element={
              <ProtectedRoute>
                <FuelAdditives />
              </ProtectedRoute>
            }
          />

          <Route
            path="/commercial/generators"
            element={
              <ProtectedRoute>
                <Generators />
              </ProtectedRoute>
            }
          />

          <Route
            path="/commercial/construction"
            element={
              <ProtectedRoute>
                <Construction />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect for invalid URLs */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 