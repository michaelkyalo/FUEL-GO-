import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Generators() {
  const [fuelType, setFuelType] = useState("");
  const [liters, setLiters] = useState("");
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const prices = { petrol: 175, diesel: 165 };

  const handleOrder = () => {
    if (!fuelType || liters <= 0) {
      setMessage("Please select fuel type and enter valid litres");
      return;
    }
    const total = liters * prices[fuelType];
    setPrice(total);
    setMessage(
      `You ordered ${liters} litres of ${fuelType} for your generators at KSh ${total.toLocaleString()}`
    );
  };

  return (
    <div className="fuel-page">
      <h2>⚡ Generator Fueling</h2>
      <p>Reliable diesel and petrol delivery for backup and industrial generators.</p>

      <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
        <option value="">Select Fuel Type</option>
        <option value="petrol">Petrol</option>
        <option value="diesel">Diesel</option>
      </select>

      <input
        type="number"
        placeholder="Enter litres"
        value={liters}
        onChange={(e) => setLiters(e.target.value)}
      />

      <button onClick={handleOrder}>Order Fuel</button>

      {price > 0 && <p>Total Price: KSh {price.toLocaleString()}</p>}
      {message && <p className="message">{message}</p>}

      <button className="btn btn-outline-danger mt-3" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default Generators;
