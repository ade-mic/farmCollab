import React from 'react';

const CreateButton = ({ onClick, label }) => {
  return (
    <button style={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
};

export default CreateButton;