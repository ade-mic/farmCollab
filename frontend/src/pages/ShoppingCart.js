import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import currency from '../utils/currency';
import unit from '../utils/unit';

const ShoppingCart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/available-produce');
  };

  const calculateTotalsByCurrency = () => {
    return cartItems.reduce((totals, item) => {
      const { currency: itemCurrency, quantity, pricePerUnit } = item;
      const total = quantity * pricePerUnit;

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

  const handleCheckout = () => {
    if (!canCheckout()) {
      alert('Checkout is only possible if all items are in the same currency.');
      return;
    }

    alert('Proceed to checkout');
  };

  const totalsByCurrency = calculateTotalsByCurrency();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div style={styles.emptyCart}>
          <p>Your cart is empty.</p>
          <button style={styles.continueButton} onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Produce</th>
                <th style={styles.tableHeader}>Quantity</th>
                <th style={styles.tableHeader}>Price</th>
                <th style={styles.tableHeader}>Total</th>
                <th style={styles.tableHeader}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td style={styles.tableCell}>{item.itemName}</td>
                  <td style={styles.tableCell}>{item.quantity} {unit[item.unit]}</td>
                  <td style={styles.tableCell}>
                    {currency[item.currency]} {item.pricePerUnit.toFixed(2)}
                  </td>
                  <td style={styles.tableCell}>
                    {currency[item.currency]}{' '}
                    {(item.quantity * item.pricePerUnit).toFixed(2)}
                  </td>
                  <td style={styles.tableCell}>
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
          <div style={styles.totalsContainer}>
            {Object.entries(totalsByCurrency).map(([currencyKey, total]) => (
              <p key={currencyKey} style={styles.total}>
                Total ({currency[currencyKey]}): {currency[currencyKey]}{' '}
                {total.toFixed(2)}
              </p>
            ))}
          </div>
          <div style={styles.footer}>
            <button style={styles.continueButton} onClick={handleContinueShopping}>
              Continue Shopping
            </button>
            <button style={styles.checkoutButton} onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: '0 auto' },
  heading: { textAlign: 'center', marginBottom: '20px' },
  emptyCart: { textAlign: 'center' },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    textAlign: 'left',
  },
  tableHeader: { borderBottom: '2px solid #ddd', padding: '10px' },
  tableCell: { padding: '10px', borderBottom: '1px solid #ddd' },
  removeButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  totalsContainer: { marginBottom: '20px', textAlign: 'left' },
  total: { fontSize: '16px', margin: '5px 0' },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
  },
  continueButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  checkoutButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ShoppingCart;
