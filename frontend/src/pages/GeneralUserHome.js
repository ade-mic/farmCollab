import React, { useState } from "react";
import ViewOrders from "../components/ViewOrders";

const GeneralUserHome = ({ firstName }) => {
  const [showViewOrders, setShowViewOrders] = useState(false);

  const toggleViewOrders = () => {
    setShowViewOrders((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.welcome}>Welcome, {firstName || "User"}!</h1>

      <div style={styles.actions}>
        <button style={styles.actionButton} onClick={toggleViewOrders}>
          {showViewOrders ? "Close Orders" : "View Orders"}
        </button>
      </div>

      {/* Render the ViewOrders component only when toggled on */}
      {showViewOrders && <ViewOrders />}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "150px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  welcome: {
    fontSize: "2em",
  },
  actions: {
    marginTop: "20px",
  },
  actionButton: {
    padding: "10px 20px",
    backgroundColor: "#27A745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default GeneralUserHome;
