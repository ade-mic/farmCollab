import React, { useEffect, useState } from 'react';
import { getSellerOrders, updateOrderStatus } from '../api';
import { useNavigate } from 'react-router-dom';

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getSellerOrders();
        setOrders(response.data.orders || []); // Ensure orders is an array
      } catch (error) {
        setError('Error fetching orders');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status. Please try again.');
    }
  };

  if (loading) {
    return <div style={styles.loader}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Orders to Fulfill</h1>
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
              <th style={styles.th}>Update</th>
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
                <td style={styles.td}>${order.totalPrice.toFixed(2)}</td>
                <td style={styles.td}>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    style={styles.select}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: '150px 150px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  th: {
    padding: '12px 15px',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
    color: '#555',
    fontWeight: 'bold',
  },
  td: {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    color: '#555',
  },
  row: {
    transition: 'background-color 0.2s',
  },
  rowHover: {
    backgroundColor: '#f1f1f1',
  },
  button: {
    padding: '6px 12px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  select: {
    padding: '6px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  noOrders: {
    textAlign: 'center',
    color: '#777',
    fontSize: '18px',
  },
  loader: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#007bff',
  },
  error: {
    textAlign: 'center',
    fontSize: '18px',
    color: 'red',
  },
};

export default SellerOrders;
