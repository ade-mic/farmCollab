import React, { useState, useEffect, useContext } from 'react';
import Pagination from '../components/Pagination';
import currency from '../utils/currency';
import unit from '../utils/unit';
import { getAllInventory } from '../api';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import QuantitySelector from '../components/QuantitySelector';

const ITEMS_PER_PAGE = 10;

const AvailableProduce = () => {
  const navigate = useNavigate();
  const [produce, setProduce] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const { addToCart } = useContext(CartContext);
  const totalPages = Math.ceil(produce.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProduce = produce.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  useEffect(() => {
    const fetchProduce = async () => {
      try {
        const response = await getAllInventory();
        setProduce(response.data.inventories);
      } catch (error) {
        console.error('Error fetching inventories:', error);
      }
    };

    fetchProduce();
  }, []);

  const handleAddToCart = (item) => {
    setSelectedItem(item);
  };

  const handleConfirmAddToCart = (item) => {
    addToCart(item);
    setSelectedItem(null);
    navigate('/shopping-cart');
  };

  const handleCancel = () => {
    setSelectedItem(null);
  };


  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Available Produce</h1>
      <div style={styles.produceList}>
        {currentProduce.map((item) => (
          <div key={item._id} style={styles.produceCard}>
            <h2>{item.itemName}</h2>
            <p>
              Quantity: {item.quantity} {unit[item.unit]}
            </p>
            <p>
              Price Per Unit: {currency[item.currency]} {item.pricePerUnit}
            </p>
            <button
              style={styles.orderButton}
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {selectedItem && (
        <>
          <div style={styles.backdrop} onClick={handleCancel}></div>
          <div style={styles.modal}>
            <QuantitySelector
              item={selectedItem}
              onAddToCart={handleConfirmAddToCart}
              onCancel={handleCancel}
            />
          </div>
        </>
      )}

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
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  produceList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  produceCard: {
    flex: '1 1 calc(33.333% - 20px)',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  orderButton: {
    marginTop: '10px',
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },

  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    width: '90%',
    maxWidth: '400px',
  },
  
};



export default AvailableProduce;
