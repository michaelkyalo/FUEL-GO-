import React, { useState } from "react";

function SubscriptionPlan() {
  const [selected, setSelected] = useState(null);

  const plans = [
    {
      id: "weekly",
      title: "Weekly Plan",
      price: "KES 250",
      description: "Best for short-term users who want quick access.",
      features: ["Full app access", "Fuel price updates", "Fuel usage analytics"]
    },
    {
      id: "monthly",
      title: "Monthly Plan",
      price: "KES 900",
      description: "Great for regular users who rely on the app daily.",
      features: ["Full app access", "Fuel price alerts", "Vehicle reports", "Priority support"]
    },
    {
      id: "yearly",
      title: "Yearly Plan",
      price: "KES 9500",
      description: "Perfect for committed users—save more with a yearly subscription.",
      features: ["Full app access", "Advanced analytics", "Priority support", "Exclusive yearly discount"]
    }
  ];

  return (
    <div className="full-page">
      <h1 className="home-title">Choose Your Subscription Plan</h1>

      <div className="features-grid">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`feature-card ${selected === plan.id ? "ring-4 ring-blue-500" : ""}`}
            onClick={() => setSelected(plan.id)}
          >
            <h3>{plan.title}</h3>
            <p className="text-lg font-bold">{plan.price}</p>
            <p>{plan.description}</p>
            <ul className="text-gray-700">
              {plan.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
            <button>Select</button>
          </div>
        ))}
      </div>

      {selected && (
        <div className="page-surface" style={{ marginTop: "20px", maxWidth: "500px", textAlign: "center" }}>
          <h3>You selected:</h3>
          <p className="text-lg font-bold">
            {selected === "weekly"
              ? "Weekly Plan"
              : selected === "monthly"
              ? "Monthly Plan"
              : "Yearly Plan"}
          </p>
          <button style={{ width: "100%", marginTop: "10px" }}>Continue to Payment</button>
        </div>
      )}
    </div>
  );
}

export default SubscriptionPlan;
