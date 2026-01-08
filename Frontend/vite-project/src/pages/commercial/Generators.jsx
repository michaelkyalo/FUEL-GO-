import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Generators() {
  const [fuelType, setFuelType] = useState("");
  const [liters, setLiters] = useState("");
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(""); // NEW
  const navigate = useNavigate();

  const prices = { petrol: 175, diesel: 165 };

  const handleOrder = () => {
    if (!fuelType || liters <= 0) {
      setMessage("Please select fuel type and enter valid litres");
      setPrice(0);
      return;
    }
    const total = liters * prices[fuelType];
    setPrice(total);
    setMessage(
      `You ordered ${liters} litres of ${fuelType} for your generators at KSh ${total.toLocaleString()}`
    );
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please choose a payment method.");
      return;
    }

    if (paymentMethod === "mpesa") {
      alert(`Initiating M-Pesa payment of KSh ${price.toLocaleString()}`);
      // api.post("/mpesa/stkpush", { amount: price });
    }

    if (paymentMethod === "airtel") {
      alert(`Initiating Airtel Money payment of KSh ${price.toLocaleString()}`);
      // integrate Airtel API later
    }

    if (paymentMethod === "cash") {
      alert("Cash on delivery selected. Pay when your order arrives.");
    }

    if (paymentMethod === "card") {
      alert("Redirecting to secure card payment page...");
    }
  };

  return (
    <div className="fuel-page container py-4" style={{ maxWidth: "500px", margin: "auto" }}>
      <h2 className="text-danger">⚡ Generator Fueling</h2>
      <p>Reliable diesel and petrol delivery for backup and industrial generators.</p>

      {/* Fuel Type */}
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

      {/* Liters */}
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

      <button className="btn btn-danger w-100 mb-2" onClick={handleOrder}>
        Order Fuel
      </button>

      <button className="btn btn-outline-danger w-100 mb-3" onClick={() => navigate("/")}>
        Back to Home
      </button>

      {/* Show message and total price */}
      {(price > 0 || message) && (
        <p className="mt-2 alert alert-warning">{message}</p>
      )}

      {/* Payment Options */}
      {price > 0 && (
        <div className="mt-3">
          <h5>Select Payment Method</h5>
          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Choose Payment Method</option>
            <option value="mpesa">M-Pesa</option>
            <option value="airtel">Airtel Money</option>
            <option value="cash">Cash on Delivery</option>
            <option value="card">Card Payment (Visa/Mastercard)</option>
          </select>

          <button
            className="btn btn-success mt-3 w-100"
            onClick={handlePayment}
          >
            Continue Payment
          </button>
        </div>
      )}
    </div>
  );
}

export default Generators;
