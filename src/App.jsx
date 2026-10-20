import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import ShopperDashboard from './pages/ShopperDashboard';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, ProtectedRoute } from './context/AuthContext';

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-shell">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/shopper"
              element={
                <ProtectedRoute allowedRoles={['shopper', 'admin']}>
                  <ShopperDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/seller"
              element={
                <ProtectedRoute allowedRoles={['seller', 'admin']}>
                  <SellerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
