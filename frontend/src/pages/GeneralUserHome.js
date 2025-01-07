import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserOrders, getProjectSupported } from "../api";


const GeneralUserHome = ({ firstName }) => {
  const [orders, setOrders] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const ordersResponse = await getUserOrders();
        const projectsResponse = await getProjectSupported();
        setOrders(ordersResponse.data.orders || []); 
        setProjects(projectsResponse.data.projects || []);

      } catch (error) {
        setError("Error fetching orders:" + error.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if(error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.welcome}>Welcome, {firstName || "User"}!</h1>
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber} >{orders.length}</h2>
          <p style={styles.statLabel}>{orders.length > 1 ? "Orders" : "Order"}</p>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>{projects.length}</h2>
          <p style={styles.statLabel}>Participating {projects.length > 1 ? "Projects" : "Project"}</p>
        </div>
      </div>
      <div style={styles.actions}>
        <Link to="/user-orders" style={styles.actionButton}>
          View Orders
        </Link>
        <Link to="/user-projects" style={styles.actionButton}>
          View Projects
        </Link>
      </div>
    </div>
  )
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
    display: "flex",
    justifyContent: "space-between",
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
};

export default GeneralUserHome;
