import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { createUser } from '../api';
import { AuthContext } from '../context/AuthContext';

const CreateAccount = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');

  const fields = [
    { label: 'Name', type: 'text', name: 'name' },
    { label: 'Email', type: 'email', name: 'email' },
    { label: 'Password', type: 'password', name: 'password' },
    { label: 'Confirm Password', type: 'password', name: 'confirmPassword' },
    { label: 'Role', type: 'select', name: 'role', options: ['Farmer', 'Buyer', 'Distributor', 'NGO'] },
  ];

  const handleSubmit = async (formData) => {
    try {
      const response = await createUser(formData);
      if (response.status === 200) {
        login(response.data.token);
        navigate('/user-home');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ marginTop: '150px' }}>
      <AuthForm title="Create Account" fields={fields} onSubmit={handleSubmit} errorMessage={errorMessage} />
      <div style={{ textAlign: 'center' }}>
        <p>
          Already have an account? <a style={{ textDecoration: 'none' }} href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
