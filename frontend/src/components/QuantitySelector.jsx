import React, { useState } from 'react';
import unit from '../utils/unit';

const QuantitySelector = ({ item, onAddToCart, onCancel }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart({ ...item, quantity });
  };

  return (
    <div style={styles.container}>
      <h2>Select Quantity ({unit[item.unit]}) for {item.itemName} </h2>
      <input
        type="number"
        value={quantity}
        min="1"
        max={item.quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        style={styles.input}
      />
      <div style={styles.buttons}>
        <button onClick={handleAddToCart} style={styles.cancelButton}>
          Add to Cart
        </button>
        <button onClick={onCancel} style={styles.addButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', border: '1px solid #ccc', borderRadius: '5px' },
  input: { padding: '10px', margin: '10px 0', width: '100%' },
  buttons: { display: 'flex', justifyContent: 'space-between' },
  addButton: { padding: '10px 20px', backgroundColor: '#DC3545', color: '#fff', border: 'none', cursor: 'pointer' },
  cancelButton: { padding: '10px 20px', backgroundColor: '#27A745', color: '#fff', border: 'none', cursor: 'pointer' },
};

export default QuantitySelector;
