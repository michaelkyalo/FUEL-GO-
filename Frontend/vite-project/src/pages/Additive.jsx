import { useState } from "react";
import additivesImage from "../assets/additives.png"; 

function FuelAdditives() {
  const [additive, setAdditive] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");


  const prices = {
    "engine oil": 1200,
    "fuel cleaner": 800,
    "coolant": 1000,
  };

  const handleOrder = () => {
    if (!additive || quantity <= 0) {
      setMessage("Please select an additive and enter a valid quantity");
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
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.88)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <div className="card-body">
          <h2 className="card-title text-danger">Order Additives</h2>
          <p className="card-text">
            Choose your additive and quantity to keep your engine healthy.
          </p>

          <div className="mb-3">
            <label className="form-label">Additive</label>
            <select
              className="form-select"
              value={additive}
              onChange={(e) => setAdditive(e.target.value)}
            >
              <option value="">Select Additive</option>
              <option value="engine oil">Engine Oil</option>
              <option value="fuel cleaner">Fuel Cleaner</option>
              <option value="coolant">Coolant</option>
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

          <button className="btn btn-danger w-100" onClick={handleOrder}>
            Order Additive
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

export default FuelAdditives;
