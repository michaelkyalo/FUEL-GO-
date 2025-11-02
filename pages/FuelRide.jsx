import { useState } from "react";
import myRideImage from "../assets/myride.png"; // ✅ Import background image

function FuelMyRide() {
  const [liters, setLiters] = useState("");
  const [price, setPrice] = useState(0);
  const [fuelType, setFuelType] = useState("");
  const [message, setMessage] = useState("");

  // Set different price per litre depending on fuel type
  const prices = {
    petrol: 180,
    diesel: 170,
  };

  const handleOrder = () => {
    if (!liters || liters <= 0 || !fuelType) {
      setMessage("Please enter litres and select fuel type");
      return;
    }

    const total = liters * prices[fuelType];
    setPrice(total);
    setMessage(
      `You ordered ${liters} litres of ${fuelType} for KSh ${total.toLocaleString()}`
    );
  };

  return (
    <div className="container py-4">
      <div
        className="card shadow-sm page-surface"
        style={{
          backgroundImage: `url(${myRideImage})`, // ✅ Background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white", // make text readable
        }}
      >
        <div className="card-body">
          <h2 className="card-title">Fuel My Ride</h2>
          <p className="card-text">
            Order fuel directly to your vehicle anywhere in Kenya.
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
              <p className="mb-0">
                Total Price: <strong>KSh {price.toLocaleString()}</strong>
              </p>
            </div>
          )}

          {message && <p className="message mt-2">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default FuelMyRide;