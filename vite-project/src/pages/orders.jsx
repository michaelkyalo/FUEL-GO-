import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

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
          <thead>
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
                <td>KSh {order.pricePerLitre}</td>
                <td>KSh {order.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;