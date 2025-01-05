import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import currency from "../utils/currency";
import { getAllProjects } from "../api";

const ITEMS_PER_PAGE = 10;

const AvailableProjects = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
    try {
      const response = await getAllProjects();
      setProjects(response.data.projects);
    } catch (error) {
      console.error(error);
    }
    };

    fetchProjects();
  }, []);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Available Projects</h1>
      <div style={styles.projectList}>
        {currentProjects.map((project, index) => (
          <div key={index} style={styles.projectCard}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>
              Raised: {currency[project.currency]} {project.currentAmount} / {currency[project.currency]} {project.goalAmount}
            </p>
            <button style={styles.supportButton}>Support Project</button>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
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
  projectList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  projectCard: {
    flex: "1 1 calc(33.33% - 20px)",
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  },
  supportButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AvailableProjects;
