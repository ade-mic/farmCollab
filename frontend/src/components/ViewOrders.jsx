import React, { useEffect, useState } from "react";
import { getUserOrders } from "../api";
import { Link } from "react-router-dom";
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
    <div style={styles.actions}>

    <Link to="/user-orders" style={styles.actionButton}>
      View Orders
    </Link>
  </div>
    
  );
};

const styles = {
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    margin: "0 10px",
    padding: "10px 20px",
    backgroundColor: "#27A745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
  },
}


export default ViewOrders;
