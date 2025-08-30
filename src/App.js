import React from 'react'
import CoursePlatform from './Cyber4'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ATSScoreChecker from './AtsChecker';
import Login from './Dashboard/Login';
import DashboardLayout from './pages/Layout/DashboardLayout';
import Dashboard from './Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CoursePlatform />} />
          <Route path="/checkats" element={<ATSScoreChecker />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard route with nested routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Nested route - this will render in the Outlet of DashboardLayout */}
            <Route index element={<Dashboard />} />
            {/* Add more nested routes here as needed */}
            {/* <Route path="folder" element={<Folder />} /> */}
            {/* <Route path="exam" element={<Exam />} /> */}
            {/* <Route path="videos" element={<Videos />} /> */}
          </Route>
        </Routes>
        
        <ToastContainer />
      </Router>
    </AuthProvider>
  )
}