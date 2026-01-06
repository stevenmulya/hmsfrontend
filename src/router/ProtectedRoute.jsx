// --- Route guard for authenticated pages ---
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/CustomerAuthContext';
import { Loader, Center } from '@mantine/core';

export default function ProtectedRoute() {
  const { token, loading } = useAuth();

  // Show a loader while checking for token
  if (loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader />
      </Center>
    );
  }

  // If not authenticated, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, show the requested page
  return <Outlet />;
}