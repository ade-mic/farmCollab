import React, { useEffect, useState, useContext } from 'react';
import { getUserOrders } from '../api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import DashBoardButton from '../components/DashBoardButton';
import currency from '../utils/currency';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  const firstName = user?.data?.name.split(" ")[0];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getUserOrders();
        setOrders(response.data.orders || []); 
      } catch (error) {
        setError('Error fetching orders');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = () => {
    alert(`Your Order is being processed`)
    // navigate(`/order/${orderId}`);
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
      <h1 style={styles.header}> {firstName}'s Orders</h1>
      {orders.length === 0 ? (
        <p style={styles.noOrders}>No orders found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Delivery Date</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={styles.row}>
                <td style={styles.td}>{order._id}</td>
                <td style={styles.td}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td style={styles.td}>{order.status}</td>
                <td style={styles.td}>
                  {order.deliveryDate
                    ? new Date(order.deliveryDate).toLocaleDateString()
                    : '-'}
                </td>
                <td style={styles.td}>{currency[order.currency]} {order.totalPrice.toFixed(2)}</td>
                <td style={styles.td}>
                  <button
                    style={styles.button}
                    onClick={() => handleOrderClick()}
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
    marginTop: '20px',
    textAlign: 'center',
  }
};

export default Orders;
