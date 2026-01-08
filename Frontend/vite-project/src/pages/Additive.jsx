import { useState } from "react";
import additivesImage from "../assets/additives.png"; 
import { useNavigate } from "react-router-dom";

function FuelAdditives() {
  const [additive, setAdditive] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(""); // NEW
  const navigate = useNavigate();

  const prices = {
    "engine oil": 1200,
    "fuel cleaner": 800,
    "coolant": 1000,
  };

  const handleOrder = () => {
    if (!additive || quantity <= 0) {
      setMessage("Please select an additive and enter a valid quantity");
      setPrice(0);
      return;
    }
    const total = quantity * prices[additive];
    setPrice(total);
    setMessage(`You ordered ${quantity} of ${additive} for KSh ${total}`);
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
      className="container py-5"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${additivesImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="card shadow-sm page-surface"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.88)", maxWidth: "500px", width: "100%" }}
      >
        <div className="card-body">
          <h2 className="card-title text-danger">Order Additives</h2>
          <p className="card-text">
            Choose your additive and quantity to keep your engine healthy.
          </p>

          <div className="mb-3">
            <label className="form-label">Additive</label>
            <select className="form-select" value={additive} onChange={(e) => setAdditive(e.target.value)}>
              <option value="">Select Additive</option>
              {Object.keys(prices).map((item) => (
                <option key={item} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              className="form-control"
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <button className="btn btn-danger w-100 mb-2" onClick={handleOrder}>
            Order Additive
          </button>

          <button className="btn btn-outline-danger w-100 mb-3" onClick={() => navigate("/")}>
            Back to Home
          </button>

          {/* Show message and total price */}
          {(price > 0 || message) && (
            <p className="mt-2 alert alert-warning">{message}</p>
          )}

          {/* Payment Options - only show after order */}
          {price > 0 && (
            <div className="mt-3">
              <h5>Select Payment Method</h5>
              <select
                className="form-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Choose Payment Method</option>
                <option value="mpesa">M-Pesa </option>
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
      </div>
    </div>
  );
}

export default FuelAdditives;
