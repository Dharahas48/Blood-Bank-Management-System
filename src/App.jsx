import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PatientInfo from './components/PatientInfo';
import PaymentPage from './components/PaymentPage';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './components/AuthContext';
import { About } from './components/About';
import HomePage from './components/HomePage';
// import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ReceiptPage from './components/ReceiptPage';
import PasswordReset from './components/PasswordReset';
import ForgotPassword from './components/ForgotPassword';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [donors, setDonors] = useState([]);
  const [newRequest, setNewRequest] = useState({ name: '', bloodType: '', contact: '', city: '' });
  const [requests, setRequests] = useState([]);
  const [patients, setPatients] = useState([])

  const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
  };

  const PrivateAdminRoute = ({ children }) => {
    const { adminUser } = useAuth();
    return adminUser ? children : <Navigate to="/admin-dashboard" />;
  };

  return (
    <AuthProvider> {/* Ensure AuthProvider wraps around your entire application */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage admin={admin} isAuthenticated={isAuthenticated} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          {/* <Route path="/admin-login" element={<AdminLogin setAdmin={setAdmin} setIsAuthenticated={setIsAuthenticated} />} /> */}
          <Route path="/admin-dashboard" element={<AdminDashboard donors={donors} setDonors={setDonors} />} />
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard donors={donors} setDonors={setDonors} /></PrivateRoute>} />
          <Route path="/patient-info" element={<PrivateRoute><PatientInfo /></PrivateRoute>} />
          <Route path="/payment" element={<PrivateRoute><PaymentPage patients={patients} setPatients={setPatients} /></PrivateRoute>} />
          <Route path="/receipt" element={<PrivateRoute><ReceiptPage /></PrivateRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset/password" element={<PasswordReset />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
