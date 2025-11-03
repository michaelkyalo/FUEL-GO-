import { useState, useEffect } from "react";
import lorriesImage from "../assets/lorries.png";

function FuelMyFleet() {
  const [fuelType, setFuelType] = useState("");
  const [liters, setLiters] = useState("");
  const [numVehicles, setNumVehicles] = useState(1);
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [orderCount, setOrderCount] = useState(0);
  const prices = { petrol: 175, diesel: 165 };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("fuelOrders")) || [];
    setOrderCount(saved.length);
  }, []);

  const handleOrder = () => {
    if (!fuelType || liters <= 0 || numVehicles <= 0)
      return setMessage("⚠️ Please fill in all fields correctly.");

    const totalCost = liters * prices[fuelType] * numVehicles;
    const newOrder = {
      source: "Fuel My Fleet",
      fuelType,
      litres: liters,
      numVehicles,
      totalCost,
      date: new Date().toLocaleString(),
    };

    const existing = JSON.parse(localStorage.getItem("fuelOrders")) || [];
    localStorage.setItem("fuelOrders", JSON.stringify([...existing, newOrder]));
    setOrderCount(existing.length + 1);
    setPrice(totalCost);
    setMessage(
      `✅ Ordered ${liters}L of ${fuelType} for ${numVehicles} vehicle(s). Total: KSh ${totalCost.toLocaleString()}`
    );
    setFuelType("");
    setLiters("");
    setNumVehicles(1);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `url(${lorriesImage}) center/cover no-repeat`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card p-4 shadow"
        style={{ background: "rgba(255,255,255,0.9)", width: "100%", maxWidth: 480 }}
      >
        <h2>Fuel My Fleet 🚚</h2>
        <p>Regular fueling for all your company vehicles.</p>
        <p className="text-muted">Total Orders: <strong>{orderCount}</strong></p>

        <select className="form-select mb-2" value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
          <option value="">Select Fuel Type</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
        </select>

        <input
          className="form-control mb-2"
          type="number"
          placeholder="Litres per vehicle"
          value={liters}
          onChange={(e) => setLiters(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="number"
          min="1"
          placeholder="Number of vehicles"
          value={numVehicles}
          onChange={(e) => setNumVehicles(e.target.value)}
        />

        <div className="d-flex gap-2">
          <button className="btn btn-danger w-50" onClick={handleOrder}>Order Fuel</button>
          <button
            className="btn btn-outline-secondary w-50"
            onClick={() => {
              setFuelType(""); setLiters(""); setNumVehicles(1);
              setPrice(0); setMessage("");
            }}
          >
            Reset
          </button>
        </div>

        {price > 0 && <div className="alert alert-warning mt-3">Total: KSh {price.toLocaleString()}</div>}
        {message && <div className="alert alert-info mt-2">{message}</div>}
      </div>
    </div>
  );
}

export default FuelMyFleet;
