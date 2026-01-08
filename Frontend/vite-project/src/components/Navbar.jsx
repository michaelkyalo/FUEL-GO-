import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ setUser }) {
  const [showServices, setShowServices] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("fuelgo_user");
    setUser(null);
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        Fuel<span>Go</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/home" end>Home</NavLink>

        <button
          className="services-toggle"
          onClick={() => setShowServices(!showServices)}
        >
          Services{" "}
          <span className={`arrow ${showServices ? "open" : ""}`}>▾</span>
        </button>

        {showServices && (
          <div className="services-menu">
            <NavLink to="/fuel-ride">Fuel My Ride</NavLink>
            <NavLink to="/fuel-boat">Fuel My Boat</NavLink>
            <NavLink to="/fuel-fleet">Fuel My Fleet</NavLink>

            {/* 🔥 Smart customer pricing */}
            <NavLink to="/pricing">Smart Pricing</NavLink>

            <NavLink to="/additives">Additives</NavLink>
            <NavLink to="/residential">Residential</NavLink>
            <NavLink to="/commercial/generators">Generators</NavLink>
            <NavLink to="/commercial/construction">Construction</NavLink>
            <NavLink to="/gas">Order Gas</NavLink>
          </div>
        )}

        <NavLink to="/about">About</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/contact">Contact Us</NavLink>

        <button
          className="logout-btn"
          onClick={handleLogout}
          style={{
            marginTop: "1rem",
            backgroundColor: "#ff4d4f",
            color: "white",
          }}
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default Navbar;
