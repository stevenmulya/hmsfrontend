// --- Customer Dashboard Page ---
// This is the main landing page after a successful customer login.
// It provides a welcome message and clear call-to-action buttons.

import { useAuth } from '../context/CustomerAuthContext';
import { Title, Text, Button, Container, Paper, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
// --- NEW: Import the required icons ---
import { IconUserEdit, IconLogout, IconPackage } from '@tabler/icons-react';

export default function Dashboard() {
  // Get customer data and the logout function from our global auth context
  const { customer, logout } = useAuth();

  // A guard clause to show a loader while customer data is being fetched
  if (!customer) {
    // This can be replaced with a more sophisticated skeleton loader
    return null; 
  }

  return (
    <Container my={40}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Group justify="space-between">
          <div>
            <Title order={2}>Selamat datang, {customer.customer_name}!</Title>
            <Text c="dimmed" mt="xs">
              Ini adalah portal pribadi Anda.
            </Text>
          </div>
          <Button 
            variant="outline" 
            color="red" 
            onClick={logout} 
            leftSection={<IconLogout size={16} />}
          >
            Logout
          </Button>
        </Group>
        
        <Text mt="lg">
          Dari sini Anda dapat mengelola detail akun, melihat riwayat transaksi, 
          dan menelusuri produk-produk kami.
        </Text>

        <Group mt="xl">
          {/* --- THE FIX IS HERE: Added the "Lihat Produk" button --- */}
          <Button 
            component={Link} 
            to="/products" 
            leftSection={<IconPackage size={16} />}
          >
            Lihat Produk
          </Button>
          <Button 
            component={Link} 
            to="/profile" 
            variant="default" // Use 'default' for a secondary action style
            leftSection={<IconUserEdit size={16} />}
          >
            Edit Profil
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}