import { useState } from "react";
import lorriesImage from "../assets/lorries.png"; // ✅ Import your background image

function FuelMyFleet() {
  const [fuelType, setFuelType] = useState("");
  const [liters, setLiters] = useState("");
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");

  const prices = { petrol: 175, diesel: 165 };

  const handleOrder = () => {
    if (!fuelType || liters <= 0) {
      setMessage("Please select fuel type and enter valid litres");
      return;
    }
    const total = liters * prices[fuelType];
    setPrice(total);
    setMessage(`You ordered ${liters} litres of ${fuelType} for KSh ${total}`);
  };

  return (
    <div
      className="container fuel-page py-4"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${lorriesImage})`, // ✅ Background applied
        backgroundSize: "contain", // shows full image without cropping
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000", // fills behind image
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="card shadow-sm page-surface"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)", // readable overlay
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <div className="card-body">
          <h2 className="card-title">Fuel My Fleet 🚚</h2>
          <p className="card-text">
            Subscribe for regular fueling for all your company vehicles.
          </p>

          <div className="mb-3">
            <label className="form-label">Fuel Type</label>
            <select
              className="form-select"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            >
              <option value="">Select Fuel Type</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Litres</label>
            <input
              className="form-control"
              type="number"
              placeholder="Enter litres"
              value={liters}
              onChange={(e) => setLiters(e.target.value)}
            />
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-danger" onClick={handleOrder}>
              Order Fuel
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setFuelType("");
                setLiters("");
                setPrice(0);
                setMessage("");
              }}
            >
              Reset
            </button>
          </div>

          {price > 0 && (
            <div className="mt-3 alert alert-warning">
              Total Price: <strong>KSh {price}</strong>
            </div>
          )}

          {message && <p className="message mt-2">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default FuelMyFleet;