import React from 'react';

const InventoryCard = ({ inventory }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{inventory.name}</h2>
      <p style={styles.description}>{inventory.description}</p>
      <p style={styles.amount}>Quantity: {inventory.quantity}</p>
      <p style={styles.amount}>Price: {inventory.price}</p>
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

export default InventoryCard;
