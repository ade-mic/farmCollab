import React, { useState } from "react";

const AuthForm = ({ title, fields, onSubmit, errorMessage }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check if password and confirm password fields match
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Create a new object excluding confirmPassword
    const { confirmPassword, ...dataToSend } = formData;

    try {
      await onSubmit(dataToSend);
    } catch (error) {
      console.log("Error:", error);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{title}</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name} style={styles.formGroup}>
            <label style={styles.label}>{field.label}</label>
            {field.type === "select" ? (
              <select
                style={styles.input}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                style={styles.input}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
        <button
          style={{ ...styles.submitButton, ...(success && styles.submitButtonHover) }}
          type="submit"
        >
          {title}
        </button>
        {error && <p style={styles.error}>{error}</p>}
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        {success && <p style={styles.success}>{success}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "1rem",
    color: "#333",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    width: "100%",
    marginTop: "5px",
  },
  submitButton: {
    padding: "12px",
    fontSize: "1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  submitButtonHover: {
    backgroundColor: "#218838",
  },
  error: {
    color: "#e74c3c",
    fontSize: "0.9rem",
    textAlign: "center",
  },
  success: {
    color: "#2ecc71",
    fontSize: "0.9rem",
    textAlign: "center",
  },
};

export default AuthForm;
