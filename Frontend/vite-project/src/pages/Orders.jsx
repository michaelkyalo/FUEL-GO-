import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("fuelOrders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="container py-4">
      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Source</th>
              <th>Fuel Type</th>
              <th>Litres</th>
              <th>Price/Litre</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.source}</td>
                <td>{order.fuelType}</td>
                <td>{order.litres}</td>
                <td>{order.pricePerLitre}</td>
                <td>{order.totalCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {}
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