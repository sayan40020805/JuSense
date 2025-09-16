import { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      const userWithToken = { ...data.user, token: data.token };
      setUser(userWithToken);
      localStorage.setItem('user', JSON.stringify(userWithToken));
      return userWithToken;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const signup = async (username, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error('Signup failed:', data.message);
        throw new Error(data.message || 'Signup failed');
      }
      const userWithToken = { ...data.user, token: data.token };
      setUser(userWithToken);
      localStorage.setItem('user', JSON.stringify(userWithToken));
      return userWithToken;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    signup,
    loading,
    isAuthenticated: Boolean(user),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
