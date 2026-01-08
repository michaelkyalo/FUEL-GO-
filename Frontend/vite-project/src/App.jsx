import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import RequireAuth from "./context/RequireAuth";
import FuelGoPricing from "./pages/FuelNegotiation";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import FuelMyRide from "./pages/FuelRide";
import FuelBoat from "./pages/FuelBoat";
import FuelMyFleet from "./pages/FuelFleet";
import Residential from "./pages/Residential";
import FuelAdditives from "./pages/Additive";
import Generators from "./pages/commercial/Generators";
import Construction from "./pages/commercial/Construction";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";
import Gas from "./pages/Gas";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("fuelgo_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Invalid session user, clearing...", e);
        sessionStorage.removeItem("fuelgo_user");
      }
    }
  }, []);

  return (
    <Router>
      {user && <Navbar setUser={setUser} />}

      <div
        className="main-content"
        style={{ marginLeft: user ? "240px" : "0", padding: "2rem" }}
      >
        <Routes>
          <Route
            path="/login"
            element={
              user ? <Navigate to="/home" replace /> : <LoginPage setUser={setUser} />
            }
          />

          <Route path="/home" element={<RequireAuth user={user}><Home /></RequireAuth>} />
          <Route path="/about" element={<RequireAuth user={user}><About /></RequireAuth>} />
          <Route path="/services" element={<RequireAuth user={user}><Services /></RequireAuth>} />

          <Route path="/fuel-ride" element={<RequireAuth user={user}><FuelMyRide /></RequireAuth>} />
          <Route path="/fuel-boat" element={<RequireAuth user={user}><FuelBoat /></RequireAuth>} />
          <Route path="/fuel-fleet" element={<RequireAuth user={user}><FuelMyFleet /></RequireAuth>} />
          <Route path="/residential" element={<RequireAuth user={user}><Residential /></RequireAuth>} />
          <Route path="/additives" element={<RequireAuth user={user}><FuelAdditives /></RequireAuth>} />

          <Route path="/commercial/generators" element={<RequireAuth user={user}><Generators /></RequireAuth>} />
          <Route path="/commercial/construction" element={<RequireAuth user={user}><Construction /></RequireAuth>} />

          <Route path="/orders" element={<RequireAuth user={user}><Orders /></RequireAuth>} />
          <Route path="/contact" element={<RequireAuth user={user}><Contact /></RequireAuth>} />
          <Route path="/gas" element={<RequireAuth user={user}><Gas /></RequireAuth>} />

          {/* 🔥 Smart pricing & negotiation */}
          <Route
            path="/pricing"
            element={<RequireAuth user={user}><FuelGoPricing /></RequireAuth>}
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="*"
            element={user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
