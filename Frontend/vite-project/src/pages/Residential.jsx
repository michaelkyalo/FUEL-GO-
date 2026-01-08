import { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/residence.png"; 

function Residential() {
  const [fuelType, setFuelType] = useState("");
  const [liters, setLiters] = useState("");
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(""); // NEW
  const navigate = useNavigate();

  const prices = { petrol: 180, diesel: 170 };

  const handleOrder = () => {
    if (!fuelType || liters <= 0) {
      setMessage("Please select fuel type and enter valid litres");
      setPrice(0);
      return;
    }
    const total = liters * prices[fuelType];
    setPrice(total);
    setMessage(`You ordered ${liters} litres of ${fuelType} for KSh ${total.toLocaleString()}`);
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
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="card shadow-sm p-4" style={{ background: "rgba(255,255,255,0.88)", maxWidth: "500px", width: "100%" }}>
        <h2 className="card-title text-danger">Residential 🏠</h2>
        <p className="card-text">
          Fuel delivery for home generators and equipment.
        </p>

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

        {/* Litres */}
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

        {/* Show message and total price */}
        {(price > 0 || message) && (
          <div className="mt-3 alert alert-warning">{message}</div>
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

        <button
          className="btn btn-outline-danger mt-3 w-100"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Residential;
