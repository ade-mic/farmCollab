import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";
import { createUser } from "../api.js";
import { useState } from "react";

const createAccountPage  = () => { 
  const navigate = useNavigate();
  const [error, setErrorMessage] = useState("");

  const fields = [
    { label: "Name", type: "text", name: "name",},
    { label: "Email", type: "email", name: "email" },
    { label: "Password", type: "password", name: "password" },
    { label: "Confirm Password", type: "password", name: "confirmPassword" },
    { label: "Role", type: "select", name: "role", options: ['Farmer', 'Buyer', 'Distributor', 'NGO'] },
  ];

    const handleSumbit = async (formData) => {
      try {
        const response = await createUser(formData);
        if (response.status === 201) {
          console.log(response.data);
          navigate("/Login");
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <AuthForm title="Create Account" fields={fields} onSubmit={handleSumbit} errorMessage={error} />
      <div style={{ textAlign: "center" }}>
        <p>Already have an account? <a style={{textDecoration: 'none'}} href="/Login">Login</a></p>
      </div>
    </div>
  );

}

export default createAccountPage;