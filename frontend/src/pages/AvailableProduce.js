import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 10;

const AvailableProduce = () => {
  const [produce, setProduce] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchProduce = async () => {
      const data = Array.from({ length: 50 }, (_, i) => ({
        name: `Produce ${i + 1}`,
        quantity: Math.floor(Math.random() * 100),
        pricePerUnit: Math.floor(Math.random() * 50) + 10,
      }));
      setProduce(data);
    };

    fetchProduce();
  }, []);

  const totalPages = Math.ceil(produce.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProduce = produce.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Available Produce</h1>
      <div style={styles.produceList}>
        {currentProduce.map((item, index) => (
          <div key={index} style={styles.produceCard}>
            <h2>{item.name}</h2>
            <p>Quantity: {item.quantity}</p>
            <p>Price Per Unit: ${item.pricePerUnit}</p>
          </div>
        ))}
      </div>
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
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  produceList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  produceCard: {
    flex: "1 1 calc(33.333% - 20px)",
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  },
};

export default AvailableProduce;
