import './styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/Landing';
import Footer from './components/Footer';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import UserHome from './pages/UserHome';
import ManagePage from './pages/ManagePage';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
        <Navbar />
        <div style={{ paddingTop: '10%' }} >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="/user-home" element={<UserHome />} />
            <Route path="/manage-farms" element={<ManagePage entity="farms" />} />
            <Route path="/manage-projects" element={<ManagePage entity="projects" />} />
            <Route path="/manage-inventory" element={<ManagePage entity="inventory" />} />
          </Routes>
        </div>
        <Footer />
    </AuthProvider>
  );
}
