import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{project.title}</h2>
      <p style={styles.description}>{project.description}</p>
      <p style={styles.amount}>Goal: {project.goalAmount} {project.currency}</p>
      <p style={styles.amount}>Current: {project.currentAmount} {project.currency}</p>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '1.5rem',
    color: '#333',
  },
  description: {
    fontSize: '1rem',
    color: '#777',
  },
  amount: {
    fontSize: '1rem',
    color: '#555',
  },
};

export default ProjectCard;
