import React from "react";
import { Link } from "react-router-dom";

const DashBoardButton = ({ to }) => {
  return (
    <Link to={to} style={styles.actionButton}>
      Return to DashBoard
    </Link>
  );
}

const styles = {
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
  }
}

export default DashBoardButton;

