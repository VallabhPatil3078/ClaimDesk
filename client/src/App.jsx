import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Pages
import Login from './../pages/Login';
import SignUp from '../pages/SignUp';
import Home from './../pages/Home';
import LostItem from './../pages/LostItem';
import FoundItem from './../pages/FoundItem';
import AboutUs from './../pages/AboutUs';
import ReportLost from './../pages/ReportLost';
import ReportFound from './../pages/ReportFound';
import Admin from './../pages/Admin';
import ForgotPassword from '../pages/ForgotPassword';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Layout({ children }) {
  const location = useLocation();

  // Hide footer only on /login
  const hideFooterRoutes = ['/login'];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">{children}</div>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
