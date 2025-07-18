import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Page Components
import Login from './../pages/Login';
import FoundItem from '../pages/FoundItem';
import Home from './../pages/Home';
import ReportLost from './../pages/ReportLost';
import LostItem from './../pages/LostItem';
import ReportFound from './../pages/ReportFound';
import Admin from '../pages/Admin';
import SignUp from '../pages/SignUp';
import AboutUs from '../pages/AboutUs';
import ForgotPassword from '../pages/ForgotPassword';

// Navbar Component
import Navbar from '../components/Navbar'; // Update the path as needed
import Footer from '../components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/found-item" element={<FoundItem />} />
        <Route path="/report-lost" element={<ReportLost />} />
        <Route path="/lost-item" element={<LostItem />} />
        <Route path="/report-found" element={<ReportFound />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
