import React from "react";

function Contact() {
  const buttonStyle = {
    display: "inline-block",
    padding: "0.5rem 1rem",
    margin: "0.5rem 0",
    backgroundColor: "#ff6b00", // FuelGo brand color
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div style={{ padding: "3rem" }}>
      <h1>Contact Us</h1>
      <p>
        Email:{" "}
        <a href="mailto:support@fuelgo.co.ke" style={buttonStyle}>
          Email Us
        </a>
      </p>
      <p>
        Phone:{" "}
        <a href="tel:+254700000000" style={buttonStyle}>
          Call Now: +254 700 000000
        </a>
      </p>
      <p>Address: Nairobi, Kenya</p>
    </div>
  );
}

export default Contact;
