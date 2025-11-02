import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [showCommercial, setShowCommercial] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("fuelgo_user");


  const handleLogout = () => {
    localStorage.removeItem("fuelgo_user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          FUELGO KENYA
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* ✅ Main nav links */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/fuel-ride">
                Fuel My Ride
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/fuel-boat">
                Fuel My Boat
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/fuel-fleet">
                Fuel My Fleet
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/residential">
                Residential Areas
              </Link>
            </li>

            {/* ✅ Additives Page */}
            <li className="nav-item">
              <Link className="nav-link" to="/additives">
                Additives
              </Link>
            </li>

            {/* 🏢 Dropdown for commercial */}
            <li
              className="nav-item dropdown"
              onMouseEnter={() => setShowCommercial(true)}
              onMouseLeave={() => setShowCommercial(false)}
            >
              <span
                className="nav-link dropdown-toggle"
                role="button"
                aria-expanded={showCommercial}
              >
                Commercial
              </span>
              <ul className={"dropdown-menu" + (showCommercial ? " show" : "")}>
                <li>
                  <Link className="dropdown-item" to="/commercial/generators">
                    Generators
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/commercial/construction">
                    Construction
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/orders">
                Orders
              </Link>
            </li>

            {}
            {!user ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
