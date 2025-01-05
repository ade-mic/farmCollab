import './styles.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/Landing';
import Footer from './components/Footer';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import UserHome from './pages/UserHome';
import ManagePage from './pages/ManagePage';
import AvailableProjects from './pages/AvailableProject';
import AvailableProduce from './pages/AvailableProduce';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ShoppingCart from './pages/ShoppingCart';
import React from 'react';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="/user-home" element={<UserHome />} />
            <Route path="/manage-farms" element={<ManagePage entity="farms" />} />
            <Route path="/manage-projects" element={<ManagePage entity="projects" />} />
            <Route path="/manage-inventory" element={<ManagePage entity="inventory" />} />
            <Route path="/available-projects" element={<AvailableProjects />} />
            <Route path="/available-produce" element={<AvailableProduce />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}
