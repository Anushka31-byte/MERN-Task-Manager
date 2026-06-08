import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Registration */}
        <Route path="/register" element={<Register />} />

        {/* Route for Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Route for Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Default redirect to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;