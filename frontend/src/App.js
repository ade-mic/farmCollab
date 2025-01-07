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
import { UserProvider } from './context/UserContext';
import Orders from './pages/Orders';
import SellerOrders from './pages/SellerOrders';
import ShoppingCart from './pages/ShoppingCart';
import UserProject from './pages/UserProject';
import React from 'react';

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
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
            <Route path="/user-orders" element={<Orders />} />
            <Route path="/seller-orders" element={<SellerOrders />} />
            <Route path="/user-projects" element={<UserProject />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}
