import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';

// 1. Create the context
const CustomerAuthContext = createContext(null);

// 2. Create the provider component that will wrap the application
export const CustomerAuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('customer_token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // This effect runs when the app loads to check if a user is already logged in
  useEffect(() => {
    if (token) {
      apiClient.get('/profile')
        .then(response => setCustomer(response.data))
        .catch(() => {
          // If token is invalid, clear it
          localStorage.removeItem('customer_token');
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);
  
  // A helper function for handling successful authentication
  const handleAuthSuccess = (data, message) => {
    const { token: customerToken, customer: customerData } = data;
    localStorage.setItem('customer_token', customerToken);
    setToken(customerToken);
    setCustomer(customerData);
    toast.success(message);
    navigate('/'); // Redirect to dashboard on success
  };

  // Function to handle new user registration
  const register = async (formData) => {
    const response = await apiClient.post('/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    toast.success(response.data.message);
    // Redirect to the OTP verification page with the phone number
    navigate('/verify-otp', { state: { phone: response.data.phone } });
  };
  
  // Function to handle user login
  const login = async (credentials) => {
    try {
      const response = await apiClient.post('/login', credentials);
      handleAuthSuccess(response.data, 'Login berhasil!');
    } catch (error) {
      // If backend returns 'unverified', redirect to the OTP page
      if (error.response?.data?.unverified) {
        toast.error(error.response.data.message);
        navigate('/verify-otp', { state: { phone: error.response.data.phone } });
      } else {
        throw error; // Re-throw other errors to be caught in the component
      }
    }
  };
  
  // Function to verify the OTP
  const verifyOtp = async (otpData) => {
    const response = await apiClient.post('/verify-otp', otpData);
    handleAuthSuccess(response.data, 'Akun berhasil diverifikasi!');
  };
  
  // Function to update user profile
  const updateProfile = async (profileData) => {
    const response = await apiClient.post('/profile', profileData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    setCustomer(response.data.customer);
    toast.success(response.data.message);
  };

  // Function to handle user logout
  const logout = () => {
    apiClient.post('/logout').finally(() => {
      localStorage.removeItem('customer_token');
      setToken(null);
      setCustomer(null);
      toast.success('Anda telah logout.');
      navigate('/login');
    });
  };

  // Provide all values and functions to the rest of the app
  const value = {
    token,
    customer,
    loading,
    login,
    register,
    logout,
    verifyOtp,
    updateProfile,
  };

  return (
    <CustomerAuthContext.Provider value={value}>
      {!loading && children}
    </CustomerAuthContext.Provider>
  );
};

// 3. Create a custom hook for easy access
export const useAuth = () => {
  return useContext(CustomerAuthContext);
};