import React, { useState } from 'react';

const styles = {
  input: {
    margin: '10px',
    padding: '10px',
  },
};

const CurrencyInput = ({ currencyName, name, placeholder, handleInputChange }) => {
  const [currency, setCurrency] = useState('NGN');
  const [amount, setAmount] = useState('');

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
    handleInputChange({
      target: {
        name: {currencyName},
        value: e.target.value,
      },
    });
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    handleInputChange({
      target: {
        name:  name ,
        value: e.target.value,
      },
    });
  };

  return (
      <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
        <select
          name="currency"
          value={currency}
          onChange={handleCurrencyChange}
          style={styles.input}
          required
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="JPY">JPY (¥)</option>
          <option value="NGN">NGN (₦)</option>
        </select>
        <input
          name={name}
          type="number"
          placeholder={placeholder}
          value={amount}
          onChange={handleAmountChange}
          style={styles.input}
          required
        />
      </div>
  );
};

export default CurrencyInput;
