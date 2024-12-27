import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={styles.pagination}>
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)} style={styles.button}>
          Previous
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            ...styles.button,
            ...(currentPage === page ? styles.activeButton : {}),
          }}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)} style={styles.button}>
          Next
        </button>
      )}
    </div>
  );
};

const styles = {
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  button: {
    margin: "0 5px",
    padding: "8px 12px",
    cursor: "pointer",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  activeButton: {
    backgroundColor: "#28a745",
    color: "#fff",
  },
};

export default Pagination;
