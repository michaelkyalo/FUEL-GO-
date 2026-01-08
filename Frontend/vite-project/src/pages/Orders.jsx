import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("fuelgo_user");

    if (!user) {
      // Clear orders if logged out
      localStorage.removeItem("fuelOrders");
      setOrders([]);
    } else {
      const savedOrders = JSON.parse(localStorage.getItem("fuelOrders")) || [];
      setOrders(savedOrders);
    }
  }, []);

  if (!orders || orders.length === 0) {
    return (
      <div className="container py-4">
        <h2>Your Orders</h2>
        <p>No orders yet.</p>
        <button className="btn btn-outline-danger mt-3" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2>Your Orders</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Source</th>
              <th>Fuel Type</th>
              <th>Litres per Vehicle</th>
              <th>Number of Vehicles</th>
              <th>Price per Litre (KSh)</th>
              <th>Total Cost (KSh)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.source || "N/A"}</td>
                <td>{order.fuelType || "N/A"}</td>
                <td>{order.litres ?? 0}</td>
                <td>{order.numVehicles ?? 0}</td>
                <td>
                  {order.fuelType === "petrol"
                    ? 175
                    : order.fuelType === "diesel"
                    ? 165
                    : 0}
                </td>
                <td>{order.totalCost?.toLocaleString() ?? 0}</td>
                <td>{order.date || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="btn btn-outline-danger mt-3"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default Orders;


