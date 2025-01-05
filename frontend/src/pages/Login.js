import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');

  const fields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  const handleSubmit = async (formData) => {
    try {
      const response = await loginUser(formData);
      if (response.status === 200) {
        login(response.data.token);
        navigate('/user-home');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div style={{marginTop: '150px'}}>
      <AuthForm title="Login" fields={fields} onSubmit={handleSubmit} errorMessage={errorMessage} />
      <div style={{ textAlign: 'center' }}>
        <p>
          Don't have an account? <a style={{ textDecoration: 'none' }} href="/createAccount">Create Account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
