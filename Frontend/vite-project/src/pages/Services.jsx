import React from "react";
import { Link } from "react-router-dom";
import mytruck from "../assets/mytruck.png";

function Services() {
  return (
    <div
      className="d-flex flex-column justify-content-start align-items-center pt-5 position-relative"
      style={{
        height: "100vh",
        textAlign: "center",
        backgroundImage: `url(${mytruck})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 className="mb-4 fw-bold text-danger bg-light p-2 rounded">
          Our Services
        </h1>

        <p className="mb-5 text-light bg-dark p-2 rounded">
          Choose a service to get started
        </p>

        {/* Services Grid */}
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

export default Services;
