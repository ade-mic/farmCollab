import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { sendCustomerEmailNotification, sendSellerEmailNotification } from '../utils/sendNotification';
import { createOrder, paymentIntent } from '../api';
import { UserContext } from '../context/UserContext';
import currency from '../utils/currency';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleContinueShopping = () => navigate('/available-produce');
  const itemCurrency = cartItems.length > 0 ? currency[cartItems[0].currency] : '';
  const calculateTotalsByCurrency = () => {
    return cartItems.reduce((totals, item) => {
      const itemCurrency = item.currency;
      const total = item.quantity * item.pricePerUnit;
      if (!totals[itemCurrency]) {
        totals[itemCurrency] = 0;
      }
      totals[itemCurrency] += total;
      return totals;
    }, {});
  };

  const canCheckout = () => {
    const uniqueCurrencies = new Set(cartItems.map((item) => item.currency));
    return uniqueCurrencies.size === 1;
  };

  const handleCheckout = async () => {
    if (!canCheckout()) {
      alert('Checkout is only possible if all items are in the same currency.');
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const orderResponse = await createOrder({ items: cartItems });
      console.log('Order created:', orderResponse.data);
      const totalAmount = cartItems.reduce(
        (total, item) => total + item.quantity * item.pricePerUnit,
        0
      );
      const paymentResponse = await paymentIntent({
        amount: totalAmount,
        paymentMethod: 'MockCard',
        cartItems,
      });
      console.log('Payment intent:', paymentResponse.data);

      sendSellerEmailNotification(user?.name || 'Customer', cartItems);
      setStatus('Order confirmed and payment successful!');
      clearCart();
      navigate('/user-orders');
    } catch (error) {
      console.error('Checkout error:', error);
      setStatus('An error occurred during checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalsByCurrency = calculateTotalsByCurrency();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Shopping Cart</h1>
      {status && <div style={styles.status}>{status}</div>}
      {cartItems.length === 0 ? (
        <div style={styles.emptyCart}>
          <p>Your cart is empty.</p>
          <button style={styles.continueButton} onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th>Produce</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} style={styles.tableRow}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{currency[item.currency]} {item.pricePerUnit.toFixed(2)}</td>
                    <td>{currency[item.currency]} {(item.quantity * item.pricePerUnit).toFixed(2)}</td>
                    <td>
                      <button
                        style={styles.removeButton}
                        onClick={() => removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={styles.total}>
            <strong>
              Total: {itemCurrency} {Object.values(totalsByCurrency).reduce((acc, total) => acc + total, 0).toFixed(2)}
            </strong>
          </div>
          <button
            style={styles.checkoutButton}
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: '0 auto' },
  heading: { textAlign: 'center', marginBottom: '20px' },
  status: { textAlign: 'center', marginBottom: '20px', color: 'orange' },
  tableContainer: { overflowX: 'auto' },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
  },
  tableHeader: { backgroundColor: '#007bff', color: 'white' },
  tableRow: { borderBottom: '1px solid #ddd', textAlign: 'center' },
  tableCell: { padding: '8px', textAlign: 'left' },
  removeButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  removeButtonHover: { backgroundColor: '#c82333' },
  total: { textAlign: 'right', marginBottom: '20px' },
  checkoutButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    display: 'block',
    margin: '0 auto',
    transition: 'background-color 0.3s',
  },
  checkoutButtonHover: { backgroundColor: '#0056b3' },
  emptyCart: { textAlign: 'center' },
  continueButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default ShoppingCart;
