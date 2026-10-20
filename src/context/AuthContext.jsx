import React, { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const DEMO_USERS = {
  admin: {
    id: 'admin',
    email: 'admin@returnless.com',
    password: 'password123',
    role: 'admin',
    name: 'Platform Administrator'
  },
  seller: {
    id: 'seller',
    email: 'seller@returnless.com',
    password: 'password123',
    role: 'seller',
    name: 'Priya Sharma (Nova Outfitters)'
  },
  shopper: {
    id: 'shopper',
    email: 'shopper@returnless.com',
    password: 'password123',
    role: 'shopper',
    name: 'Ananya Verma'
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('returnless_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  function login(idInput, passwordInput, chosenRole = 'shopper') {
    const trimmedId = (idInput || '').trim().toLowerCase();
    const trimmedPass = (passwordInput || '').trim();

    if (!trimmedId) {
      return { success: false, error: 'User ID or Email is required.' };
    }
    if (!trimmedPass) {
      return { success: false, error: 'Password is required.' };
    }
    if (trimmedPass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    // Determine role based on ID or chosen role
    let role = chosenRole;
    if (trimmedId.includes('admin')) {
      role = 'admin';
    } else if (trimmedId.includes('seller')) {
      role = 'seller';
    } else if (trimmedId.includes('shopper')) {
      role = 'shopper';
    }

    // Check against demo accounts or accept valid credentials
    const demoMatch = Object.values(DEMO_USERS).find(
      (u) => (u.id === trimmedId || u.email.toLowerCase() === trimmedId)
    );

    if (demoMatch) {
      if (demoMatch.password !== trimmedPass && trimmedPass !== 'password123') {
        return { success: false, error: 'Incorrect password for this ID.' };
      }
      role = demoMatch.role;
    }

    const authPayload = {
      id: trimmedId,
      email: trimmedId.includes('@') ? trimmedId : `${trimmedId}@returnless.com`,
      role: role,
      name: demoMatch ? demoMatch.name : (role.charAt(0).toUpperCase() + role.slice(1)),
      token: `rt_token_${Date.now()}`
    };

    localStorage.setItem('returnless_user', JSON.stringify(authPayload));
    setUser(authPayload);
    return { success: true, user: authPayload };
  }

  function logout() {
    localStorage.removeItem('returnless_user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    // Redirect unauthenticated users back to login
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If authenticated but wrong role, route to their authorized home
    const homeRoutes = {
      admin: '/admin',
      seller: '/seller',
      shopper: '/shopper'
    };
    return <Navigate to={homeRoutes[user.role] || '/'} replace />;
  }

  return children;
}
