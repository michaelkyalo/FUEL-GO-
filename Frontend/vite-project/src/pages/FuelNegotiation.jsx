import { useState, useMemo } from "react";
import '../components/FuelGoPricing.css';

// Market prices in KES (Kenya)
const MARKET_PRICES = {
  petrol: 210,
  diesel: 198,
};

const PRICE_MARGIN = 0.1; // ±10% reasonable range

function FuelGoPricing() {
  const [orderType, setOrderType] = useState("single");
  const [fuelType, setFuelType] = useState("petrol");
  const [litres, setLitres] = useState(""); // start blank
  const [vehicles, setVehicles] = useState(1);
  const [suggestedPrice, setSuggestedPrice] = useState(""); // start blank
  const [feedback, setFeedback] = useState("");

  // Total litres calculation
  const totalLitres = useMemo(() => {
    const l = Number(litres);
    const v = Number(vehicles);
    return orderType === "fleet" ? (l || 0) * v : l || 0;
  }, [orderType, litres, vehicles]);

  // Recommended min/max prices
  const minPrice = MARKET_PRICES[fuelType] * (1 - PRICE_MARGIN);
  const maxPrice = MARKET_PRICES[fuelType] * (1 + PRICE_MARGIN);

  const handleSubmit = (e) => {
    e.preventDefault();
    const price = Number(suggestedPrice);

    if (!litres || litres <= 0) {
      setFeedback("❌ Please enter a valid number of litres.");
      return;
    }

    if (!suggestedPrice || price <= 0) {
      setFeedback("❌ Please enter a valid price per litre.");
      return;
    }

    if (price >= minPrice && price <= maxPrice) {
      setFeedback(`🎉 Your price of KES ${price.toFixed(2)} per litre is reasonable for the Kenyan market.`);
    } else if (price < minPrice) {
      setFeedback(`❌ Price too low. The minimum reasonable price is KES ${minPrice.toFixed(2)}.`);
    } else {
      setFeedback(`❌ Price too high. The maximum reasonable price is KES ${maxPrice.toFixed(2)}.`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">FuelGo Order</h2>

      <form onSubmit={handleSubmit}>
        {/* Order Type */}
        <div className="mb-4">
          <label className="font-semibold">Order Type</label>
          <select
            className="w-full p-2 border rounded"
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
          >
            <option value="single">Single Car</option>
            <option value="fleet">Fleet</option>
          </select>
        </div>

        {/* Fuel Type */}
        <div className="mb-4">
          <label className="font-semibold">Fuel Type</label>
          <select
            className="w-full p-2 border rounded"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
          </select>
        </div>

        {/* Litres */}
        <div className="mb-4">
          <label className="font-semibold">
            {orderType === "fleet" ? "Litres per Vehicle" : "Litres"}
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={litres}
            placeholder="Enter number of litres"
            min={0}
            onChange={(e) => setLitres(e.target.value)}
          />
        </div>

        {/* Vehicles for fleet */}
        {orderType === "fleet" && (
          <div className="mb-4">
            <label className="font-semibold">Number of Vehicles</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={vehicles}
              min={1}
              onChange={(e) => setVehicles(Number(e.target.value))}
            />
          </div>
        )}

        {/* Suggested Price */}
        <div className="mb-4">
          <label className="font-semibold">Suggest Your Price (per litre)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={suggestedPrice}
            placeholder="Enter your price per litre"
            min={0}
            onChange={(e) => setSuggestedPrice(e.target.value)}
          />
          <small className="text-gray-500">
            Recommended range: KES {minPrice.toFixed(2)} - KES {maxPrice.toFixed(2)}
          </small>
        </div>

        {/* Total Litres Display */}
        <div className="mb-4 text-gray-700">
          Total Litres: <strong>{totalLitres}</strong>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`p-3 rounded text-white ${
              feedback.includes("reasonable") ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {feedback}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-2 rounded hover:bg-blue-700 transition mt-4"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}

export default FuelGoPricing;


