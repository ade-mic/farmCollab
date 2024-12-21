import React from "react";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../api";

const Login = () => {
  const fields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  const handleSubmit = (formData) => {
    return loginUser(formData);
  };

  return(
    <div>
      <AuthForm title="Login" fields={fields} onSubmit={handleSubmit} />
      <div style={{ textAlign: "center" }}>
        <p>Don't have an account? <a style={{textDecoration: 'none'}} href="/createAccount">Create Account</a></p>
      </div>
    </div>
    );
};

export default Login;