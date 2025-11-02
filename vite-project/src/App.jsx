import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components


// Pages

import Home from "./pages/Home";

import About from "./pages/About";
import FuelRide from "./pages/FuelRide";
import FuelBoat from "./pages/FuelBoat";
import FuelMyFleet from "./pages/FuelFleet";
import Residential from "./pages/Residential";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container my-4">
        <Routes>
          {/* 🔒 Redirect to login first */}
    <Route path="/" element={<Navigate to="/home" replace />} />


          {/* General Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Fuel Pages */}
          <Route path="/fuel-ride" element={<FuelRide />} />
          <Route path="/fuel-boat" element={<FuelBoat />} />
          <Route path="/fuel-fleet" element={<FuelMyFleet />} />
          <Route path="/residential" element={<Residential />} />

          {/* Commercial Pages */}
          <Route path="/commercial/generators" element={<Generators />} />
          <Route path="/commercial/construction" element={<Construction />} />

          {/* Orders Tracker */}
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
