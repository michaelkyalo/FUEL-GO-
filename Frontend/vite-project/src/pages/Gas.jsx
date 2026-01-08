import { useState } from "react";

function Gas() {
  const [gasType, setGasType] = useState("");
  const [lpgSize, setLpgSize] = useState(""); // For 6kg or 13kg
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [message, setMessage] = useState("");

  // Prices in KES
  const gasPrices = {
    LPG: { "6kg": 1200, "13kg": 2500 },
    Butane: 2200,
    Propane: 2800,
    Industrial: 5000,
  };

  const handleGasChange = (e) => {
    const selectedGas = e.target.value;
    setGasType(selectedGas);
    setLpgSize(""); // Reset LPG size when changing gas type
    setPrice(0);
  };

  const handleLpgSizeChange = (e) => {
    const size = e.target.value;
    setLpgSize(size);
    setPrice(size ? gasPrices.LPG[size] * quantity : 0);
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value);
    setQuantity(qty);
    if (gasType === "LPG" && lpgSize) {
      setPrice(gasPrices.LPG[lpgSize] * qty);
    } else if (gasType) {
      setPrice(gasPrices[gasType] * qty);
    } else {
      setPrice(0);
    }
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrder = () => {
    if (!gasType || (gasType === "LPG" && !lpgSize) || quantity < 1 || !paymentMethod) {
      setMessage("Please select a gas type, LPG size (if applicable), quantity, and payment method");
      return;
    }

    const selectedName = gasType === "LPG" ? `LPG ${lpgSize}` : gasType;

    setMessage(
      `Your order of ${quantity} ${selectedName} cylinder(s) totaling KES ${price} has been placed successfully! Payment method: ${paymentMethod}`
    );
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Order Gas Cylinders</h1>

      <div className="mb-3">
        <label htmlFor="gasType" className="form-label">Select Gas Type</label>
        <select
          id="gasType"
          className="form-select"
          value={gasType}
          onChange={handleGasChange}
        >
          <option value="">-- Choose Gas Type --</option>
          <option value="LPG">LPG (Domestic)</option>
          <option value="Butane">Butane</option>
          <option value="Propane">Propane</option>
          <option value="Industrial">Industrial Gas</option>
        </select>
      </div>

      {/* LPG size selection */}
      {gasType === "LPG" && (
        <div className="mb-3">
          <label htmlFor="lpgSize" className="form-label">Select LPG Size</label>
          <select
            id="lpgSize"
            className="form-select"
            value={lpgSize}
            onChange={handleLpgSizeChange}
          >
            <option value="">-- Choose LPG Size --</option>
            <option value="6kg">6kg</option>
            <option value="13kg">13kg</option>
          </select>
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">Quantity</label>
        <input
          type="number"
          id="quantity"
          className="form-control"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>

      <div className="mb-3">
        <p>Total Price: <strong>KES {price}</strong></p>
      </div>

      {/* Payment options */}
      <div className="mb-3">
        <label className="form-label">Select Payment Method</label>
        <select className="form-select" value={paymentMethod} onChange={handlePaymentChange}>
          <option value="">-- Choose Payment Method --</option>
          <option value="M-Pesa">M-Pesa</option>
          <option value="Card">Card</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
      </div>

      <button className="btn btn-warning w-100" onClick={handleOrder}>
        Place Order
      </button>

      {message && <p className="mt-3 text-success">{message}</p>}
    </div>
  );
}

export default Gas;
