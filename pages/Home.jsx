import React from "react";
import myTruck from "../assets/mytruck.png";
import "../App.css";

function Home() {
  return (
    <div
      className="container py-5 page-surface"
      style={{
        backgroundImage: `url(${myTruck})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="text-danger">
            Fuel your ride at home or your fleet at work.
          </h1>
          <p className="lead">
            Never pump gas again — we deliver fuel directly to you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;