import React from "react";
import { Link } from "react-router-dom";

const FarmerHome = ({ data, firstName }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.welcome}>Welcome, {firstName || "User"}!</h1>

      <div style={styles.statsContainer}>
        <div style={{...styles.statCard, ...styles.lastAction}}>
          <h2 style={styles.statNumber}>{data.sales}</h2>
          <p style={styles.statLabel}>{data.sales > 1 ? "Sales" : "Sale"}</p>
          <div style={styles.actions}>
            <Link to="/seller-orders" style={styles.actionButton}>
              View Sales
            </Link>
          </div>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>{data.farms}</h2>
          <p style={styles.statLabel}>{data.farms > 1 ? "Farms Managed" : "Farm Managed"}</p>
          <div style={styles.actions}>
            <Link to="/manage-farms" style={styles.actionButton}>
              Manage Farms
            </Link>
          </div>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>{data.projects}</h2>
          <p style={styles.statLabel}>{data.projects > 1 ? "Active Projects" : "Active Project"}</p>
          <div style={styles.actions}>
            <Link to="/manage-projects" style={styles.actionButton}>
              Manage Projects
            </Link>
          </div>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>{data.inventory}</h2>
          <p style={styles.statLabel}>{data.inventory > 1 ? "Inventory Items" : "Inventory Item"}</p>
          <div style={styles.actions}>
            <Link to="/manage-inventory" style={styles.actionButton}>
              Manage Inventory
            </Link>
          </div>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>{data.orders}</h2>
          <p style={styles.statLabel}>{data.orders > 1 ? "Order Items" : "Order Item"}</p>
          <div style={styles.actions}>
            <Link to="/user-orders" style={styles.actionButton}>
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "150px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  welcome: {
    textAlign: "center",
    fontSize: "2em",
    marginBottom: "20px",
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(150px, 1fr))",
    gap: "20px",
    marginBottom: "20px",
  },
  statCard: {
    flex: 1,
    margin: "0 10px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  statNumber: {
    fontSize: "2em",
    marginBottom: "10px",
  },
  statLabel: {
    fontSize: "1em",
    color: "#666",
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
  lastAction: {
    gridColumn: "span 2",
    textAlign: "center",
    backgroundColor:"#E7F0DC",
    fontSize: "1.2em",
  },
};

export default FarmerHome;
