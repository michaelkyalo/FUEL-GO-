import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("fuelgo_user");

  const handleLogout = () => {
    localStorage.removeItem("fuelgo_user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-danger custom-navbar">
      <div className="container text-center">
        <div className="row">
          <div className="col-6 py-2">
            <Link className="navbar-brand fw-bold" to="/">
              FUELGO KENYA
            </Link>
          </div>
          <div className="col-6 py-2">
            {!user ? (
              <Link className="btn btn-outline-light" to="/login">
                Login
              </Link>
            ) : (
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>

        <div className="row py-2">
          <div className="col-6"></div>
          <div className="col-6"></div>
        </div>

        <div className="row py-2">
          <div className="col-6"></div>
          <div className="col-6"></div>
        </div>

        <div className="row py-2">
          <div className="col-6"></div>
          <div className="col-6"></div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;