import { useState } from "react";
import additivesImage from "../assets/additives.png"; 
import { useNavigate } from "react-router-dom";

function FuelAdditives() {
  const [additive, setAdditive] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");
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

          {/* Show message and total price together */}
          {(price > 0 || message) && (
            <p className="mt-2 alert alert-warning">{message}</p>
          )}

          <button className="btn btn-outline-danger w-100 mt-2" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default FuelAdditives;
