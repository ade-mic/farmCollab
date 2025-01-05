import React, { useEffect, useState } from "react";
import { getUserOrders } from "../api";
import { dark } from "@mui/material/styles/createPalette";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getUserOrders();
        console.log("Orders fetched:", data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Runs every time the component is mounted

  // if (loading) {
  //   console.log("Loading orders...", orders);
  //   return <div style={styles.loading}>Loading orders...</div>;
  // }

  if (orders.length === 0) {
    return <div style={styles.noOrders}>You have no orders yet.</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Orders</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Products</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>
                {order.products.map((product, index) => (
                  <div key={index}>
                    {product.produce} - {product.quantity} units @ $
                    {product.price.toFixed(2)}
                  </div>
                ))}
              </td>
              <td>
                $
                {order.products
                  .reduce(
                    (total, product) => total + product.price * product.quantity,
                    0
                  )
                  .toFixed(2)}
              </td>
              <td>{order.status}</td>
              <td>{order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    marginTop: "20px",
  },
  noOrders: {
    textAlign: "center",
    fontSize: "18px",
    marginTop: "20px",
  },
};

export default ViewOrders;
