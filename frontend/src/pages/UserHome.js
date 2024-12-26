import React, { useState, useEffect } from "react";
import { getUserProfile, getUserProjects, getUserInventory, getUserFarms } from "../api";
import { Link } from "react-router-dom";

const UserHome = () => {
  const [data, setData] = useState({
    user: null,
    projects: 0,
    inventory: 0,
    farms: 0,
  });

  const [hovered, setHovered] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileResponse = await getUserProfile();
        const userProjectsResponse = await getUserProjects();
        const userInventoryResponse = await getUserInventory();
        const userFarmsResponse = await getUserFarms();
        console.log(userInventoryResponse);

        setData({
          user: userProfileResponse.data.data,
          projects: userProjectsResponse.data.projects.length,
          inventory: userInventoryResponse.data.inventory.length,
          farms: userFarmsResponse.data.farms.length,
        });
      } catch (err) {
        setError(err.message);
      }

    };

    fetchData();
  }, []);

  const firstName = data.user?.name.split(" ")[0];
  return (
    <div style={styles.container}>
      <h1 style={styles.welcome}>Welcome, {firstName || "User"}!</h1>

      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>{data.farms}</h2>
          <p style={styles.statLabel}>{data.farms > 1 ? "Farms Managed" : "Farm Managed"} </p>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>{data.projects}</h2>
          <p style={styles.statLabel}>{data.projects > 1 ? "Active Projects" : "Active Project"}</p>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>{data.inventory}</h2>
          <p style={styles.statLabel}>{data.inventory > 1 ? "Inventory Items" : "Inventory Item"}</p>
        </div>
      </div>

      <div style={styles.actions}>
        <Link to="/manage-farms" style={styles.actionButton}>
          Manage Farm
        </Link>
        <Link to="/manage-projects" style={styles.actionButton}>
          Manage Projects
        </Link>
        <Link to="/manage-inventory" style={styles.actionButton}>
          Manage Inventory
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

export default UserHome;
