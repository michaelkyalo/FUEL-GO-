import { useState } from "react";
import yatchImage from "../assets/yatch.png"; 

function FuelMyBoat() {
  const [fuelType, setFuelType] = useState("");
  const [liters, setLiters] = useState("");
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");

  const prices = { petrol: 185, diesel: 175 };

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
      className="container py-5"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${yatchImage})`, 
        backgroundSize: "contain", 
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Overlay for better text visibility */}
      <div
        className="card shadow-sm page-surface"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.88)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <div className="card-body">
          <h2 className="card-title text-danger">Fuel My Boat</h2>
          <p className="card-text">
            Keep your boat running smoothly with our marine fueling service.
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

          <button className="btn btn-danger w-100" onClick={handleOrder}>
            Order Fuel
          </button>

          {price > 0 && (
            <div className="mt-3 alert alert-warning">
              Total Price: KSh {price}
            </div>
          )}
          {message && <p className="message mt-2">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default FuelMyBoat;
