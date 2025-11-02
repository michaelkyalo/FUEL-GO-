import React from "react";
import fuelLogo from "../assets/fuel.png"; 

function About() {
  return (
    <div className="about container text-center py-5">
      <img
        src={fuelLogo}
        alt="Fuel Go Kenya Logo"
        style={{ width: "200px", marginBottom: "20px" }}
      />
      <h2>About Fuel Go Kenya</h2>
      <p>
        Fuel Go Kenya delivers fuel right to your doorstep — whether at home, on the road,
        or for your business fleet. Our mission is to make refueling convenient, fast, and safe.
      </p>
    </div>
  );
}

export default About;
