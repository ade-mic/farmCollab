import React, { useEffect, useState } from 'react';
import { getUserFarms } from '../api';

const FarmInput = ({ onChange }) => {
  const [farms, setFarms] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await getUserFarms();
        setFarms(response.data.farms);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFarms();
  }, []);

  const handleFarmChange = (e) => {
    const { value } = e.target;
    setSelectedFarmId(value);
    onChange(e);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <label style={styles.label}>Select Farm</label>
      <select name="farmId" value={selectedFarmId} onChange={handleFarmChange} style={styles.select} required>
        <option value="">Select a farm</option>
        {farms.map((farm) => (
          <option key={farm._id} value={farm._id}>
            {farm.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '10px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '1em',
    color: '#333',
  },
  select: {
    width: '100%',
    padding: '10px',
    fontSize: '1em',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
};

export default FarmInput;
