import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/Landing";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
      </Routes>
      <Footer />
    </Router>
  );
}
