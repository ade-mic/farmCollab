import React, { useState } from "react";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    // Simple form validation
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Simulate a successful account creation
    setSuccessMessage("Account created successfully!");
    setErrorMessage(""); // Clear any previous error messages

    // Here you can send formData to your API for actual user creation
    // Example:
    // api.createAccount(formData).then(response => console.log(response));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="confirmPassword" style={styles.label}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        {successMessage && <p style={styles.success}>{successMessage}</p>}

        <button type="submit" style={styles.submitButton}>
          Create Account
        </button>
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

export default CreateAccount;
