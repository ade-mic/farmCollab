import React, { useEffect, useState, useContext } from 'react';
import { getProjectSupported } from '../api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import currency  from '../utils/currency';
import DashBoardButton from '../components/DashBoardButton';

const UserProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  const firstName = user?.data?.name.split(" ")[0];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjectSupported();
        setProjects(response.data.projects || []); 
      } catch (error) {
        setError('Error fetching projects');
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = () => {
    alert(`Your project is being processed`)
    // navigate(`/project/${orderId}`);
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.error}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}> {firstName}'s {projects.length > 1 ? "Collabs": "Collab"}</h1>
      {projects.length === 0 ? (
        <p style={styles.noOrders}>No Collab found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Collab ID</th>
              <th style={styles.th}>Goal Amount</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id} style={styles.row}>
                <td style={styles.td}>{project._id}</td>
                <td style={styles.td}>
                {currency[project.currency]} {project.goalAmount}
                </td>
                <td style={styles.td}> {currency[project.currency]} {project.currentAmount}</td>
                <td style={styles.td}>
                  <button
                    style={styles.button}
                    onClick={() => handleProjectClick()}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={styles.returnButton}>
        <DashBoardButton to={"/user-home"} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    margin: ' 150px auto',
  },
  header: {
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  th: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    color: '#555',
  },
  row: {
    ':hover': {
      backgroundColor: '#f1f1f1',
    },
  },
  button: {
    padding: '8px 12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  noOrders: {
    textAlign: 'center',
    color: '#555',
  },
  loading: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#555',
    padding: '20px',
  },
  error: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#d9534f',
    padding: '20px',
  },
  returnButton: {
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default UserProject;
