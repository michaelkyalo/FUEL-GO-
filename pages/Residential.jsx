import { useState } from "react";
import background from "../assets/residence.png"; // ✅ Import the image

function Residential() {
  const [fuelType, setFuelType] = useState("");
  const [liters, setLiters] = useState("");
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");

  const prices = { petrol: 180, diesel: 170 };

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
      className="container py-4"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh", // full height
      }}
    >
      <div className="card shadow-sm page-surface bg-light bg-opacity-75">
        <div className="card-body">
          <h2 className="card-title">Residential 🏠</h2>
          <p className="card-text">
            Fuel delivery for home generators and equipment.
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

          <button className="btn btn-danger" onClick={handleOrder}>
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

export default Residential;
