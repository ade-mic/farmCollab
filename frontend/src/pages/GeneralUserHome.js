import React from "react";
import { Link } from "react-router-dom";

const GeneralUserHome = ({ firstName }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.welcome}>Welcome, {firstName || "User"}!</h1>

      <div style={styles.actions}>
        <Link to="/orders" style={styles.actionButton}>
          View Orders
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  welcome: {
    fontSize: "2em",
    marginBottom: "20px",
  },
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
};

export default GeneralUserHome;
