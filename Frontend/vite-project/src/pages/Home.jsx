import React from "react";
import { Link } from "react-router-dom";
import mytruck from "../assets/mytruck.png"; // 🖼️ Import your background image

function Home() {
  return (
    <div
      className="d-flex flex-column justify-content-start align-items-center pt-5"
      style={{
        height: "100vh",
        textAlign: "center",
        backgroundImage: `url(${mytruck})`,
        backgroundSize: "cover", // make it cover entire page
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white", // make text visible on dark background
      }}
    >
      {/* ✅ Overlay effect (optional for better text contrast) */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // dark overlay for readability
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      ></div>

      {/* ✅ Page Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 className="mb-4 fw-bold text-danger bg-light p-2 rounded">
          Welcome to FUELGO Kenya
        </h1>
        <p className="mb-5 text-light bg-dark p-2 rounded">
          Select a service to get started
        </p>

        {/* ✅ Buttons in 2 columns × 4 rows */}
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex justify-content-center mb-3 gap-3">
            <Link to="/fuel-ride" className="btn btn-danger btn-lg px-4 py-3">
              Fuel My Ride
            </Link>
            <Link to="/fuel-boat" className="btn btn-danger btn-lg px-4 py-3">
              Fuel My Boat
            </Link>
          </div>

          <div className="d-flex justify-content-center mb-3 gap-3">
            <Link to="/additives" className="btn btn-danger btn-lg px-4 py-3">
              Additives
            </Link>
            <Link
              to="/commercial/generators"
              className="btn btn-danger btn-lg px-4 py-3"
            >
              Generators
            </Link>
          </div>

          <div className="d-flex justify-content-center mb-3 gap-3">
            <Link to="/fuel-fleet" className="btn btn-danger btn-lg px-4 py-3">
              Fuel My Fleet
            </Link>
            <Link to="/residential" className="btn btn-danger btn-lg px-4 py-3">
              Residential
            </Link>
          </div>

          <div className="d-flex justify-content-center gap-3">
            <Link
              to="/commercial/construction"
              className="btn btn-danger btn-lg px-4 py-3"
            >
              Construction
            </Link>
            <Link to="/orders" className="btn btn-danger btn-lg px-4 py-3">
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
