import React from "react";

function Orders() {
  return (
    <div className="container py-4">
      <h2>Your Orders</h2>
      <p>This page is currently a placeholder and does not track any orders.</p>

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
          <tr>
            <td colSpan="6" className="text-center">
              No orders to display.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
