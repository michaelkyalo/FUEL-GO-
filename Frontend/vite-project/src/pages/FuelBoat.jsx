import { useState } from "react";
import { useNavigate } from "react-router-dom";
import yatchImage from "../assets/yatch.png"; 

function FuelMyBoat() {
  const [liters, setLiters] = useState("");
  const [price, setPrice] = useState(0);
  const [fuelType, setFuelType] = useState("");
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const prices = {
    petrol: 185,
    diesel: 175,
  };

  const handleOrder = () => {
    if (!liters || liters <= 0 || !fuelType) {
      setMessage("Please enter liters and select fuel type");
      return;
    }

    const total = liters * prices[fuelType];
    setPrice(total);
    setMessage(
      `You ordered ${liters} liters of ${fuelType} for KSh ${total.toLocaleString()}`
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
      alert("Cash on delivery selected. Pay when the delivery arrives.");
    }

    if (paymentMethod === "card") {
      alert("Redirecting to secure card payment page...");
    }
  };

  return (
    <div className="container py-4">
      <div
        className="card shadow-sm page-surface"
        style={{
          backgroundImage: `url(${yatchImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
        }}
      >
        <div className="card-body">
          <h2 className="card-title">Fuel My Boat</h2>
          <p className="card-text">
            Order fuel directly to your boat anywhere in Kenya.
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
            <label className="form-label">Liters</label>
            <input
              className="form-control"
              type="number"
              placeholder="Enter liters"
              value={liters}
              onChange={(e) => setLiters(e.target.value)}
            />
          </div>

          <button className="btn btn-danger me-2" onClick={handleOrder}>
            Order Fuel
          </button>

          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>

          {price > 0 && (
            <div className="mt-3 alert alert-warning">
              <p className="mb-0">
                Total Price: <strong>KSh {price.toLocaleString()}</strong>
              </p>
            </div>
          )}

          {message && <p className="message mt-2">{message}</p>}

          {/* ⭐ Payment Method Options */}
          {price > 0 && (
            <div className="mt-4">
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
                className="btn btn-success mt-3"
                onClick={handlePayment}
              >
                Continue Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FuelMyBoat;
