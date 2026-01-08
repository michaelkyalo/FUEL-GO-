import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import lorriesImage from "../assets/lorries.png";

function FuelMyFleet() {
  const [fuelType, setFuelType] = useState("");
  const [litres, setLitres] = useState("");
  const [numVehicles, setNumVehicles] = useState(1);
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderCount, setOrderCount] = useState(0);

  const prices = { petrol: 175, diesel: 165 };
  const navigate = useNavigate(); 

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("fuelOrders")) || [];
    setOrderCount(saved.length);
  }, []);

  const handleOrder = () => {
    const litresNum = Number(litres);
    const vehiclesNum = Number(numVehicles);

    if (!fuelType || litresNum <= 0 || vehiclesNum <= 0) {
      setMessage("Please fill in all fields correctly.");
      setPrice(0);
      return;
    }

    const pricePerLitre = prices[fuelType];
    const totalCost = litresNum * pricePerLitre * vehiclesNum;

    const newOrder = {
      source: "Fuel My Fleet",
      fuelType,
      litres: litresNum,
      numVehicles: vehiclesNum,
      pricePerLitre,         // <-- Now stored
      totalCost,
      date: new Date().toLocaleString(),
    };

    const existing = JSON.parse(localStorage.getItem("fuelOrders")) || [];
    localStorage.setItem("fuelOrders", JSON.stringify([...existing, newOrder]));

    setOrderCount(existing.length + 1);
    setPrice(totalCost);
    setMessage(
      `Ordered ${litresNum}L of ${fuelType} for ${vehiclesNum} vehicle(s). Total: KSh ${totalCost.toLocaleString()}`
    );

    // Clear inputs
    setFuelType("");
    setLitres("");
    setNumVehicles(1);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please choose a payment method.");
      return;
    }

    switch (paymentMethod) {
      case "mpesa":
        alert(`Initiating M-Pesa payment of KSh ${price.toLocaleString()}`);
        break;
      case "airtel":
        alert(`Initiating Airtel Money payment of KSh ${price.toLocaleString()}`);
        break;
      case "cash":
        alert("Cash on delivery selected. Pay when your order arrives.");
        break;
      case "card":
        alert("Redirecting to secure card payment page...");
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `url(${lorriesImage}) center/cover no-repeat`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card p-4 shadow"
        style={{ background: "rgba(255,255,255,0.9)", width: "100%", maxWidth: 480 }}
      >
        <h2>Fuel My Fleet 🚚</h2>
        <p>Regular fueling for all your company vehicles.</p>
        <p className="text-muted">
          Total Orders: <strong>{orderCount}</strong>
        </p>

        {/* Fuel Type */}
        <select
          className="form-select mb-2"
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
        >
          <option value="">Select Fuel Type</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
        </select>

        {/* Litres */}
        <input
          className="form-control mb-2"
          type="number"
          placeholder="Litres per vehicle"
          value={litres}
          onChange={(e) => setLitres(e.target.value)}
        />

        {/* Number of Vehicles */}
        <input
          className="form-control mb-3"
          type="number"
          min="1"
          placeholder="Number of vehicles"
          value={numVehicles}
          onChange={(e) => setNumVehicles(e.target.value)}
        />

        <div className="d-flex gap-2 mb-3">
          <button className="btn btn-danger w-50" onClick={handleOrder}>
            Order Fuel
          </button>
          <button
            className="btn btn-outline-secondary w-50"
            onClick={() => {
              setFuelType("");
              setLitres("");
              setNumVehicles(1);
              setPrice(0);
              setMessage("");
              setPaymentMethod("");
            }}
          >
            Reset
          </button>
        </div>

        {/* Show message and total price */}
        {(price > 0 || message) && (
          <div className="alert alert-info">{message}</div>
        )}

        {price > 0 && (
          <div className="alert alert-warning mt-2">
            Total: KSh {price.toLocaleString()}
          </div>
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

        {/* Go Back Home */}
        <button
          className="btn btn-primary w-100 mt-3"
          onClick={() => navigate("/")}
        >
          ⬅️ Go Back Home
        </button>
      </div>
    </div>
  );
}

export default FuelMyFleet;

