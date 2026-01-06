import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button, Paper, Title, Text, Container, PasswordInput, PinInput, Center, Anchor } from '@mantine/core';
import apiClient from '../api/apiClient';
import { useForm } from '@mantine/form';

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect if the page is accessed directly without a phone number
  const phone = location.state?.phone;
  if (!phone) {
      navigate('/forgot-password');
      return null;
  }

  const form = useForm({
    initialValues: { otp: '', customer_password: '', customer_password_confirmation: '' },
  });
  
  const handleSubmit = async (values) => {
    setLoading(true);
    const toastId = toast.loading('Mereset password...');
    try {
        await apiClient.post('/reset-password', { ...values, customer_phone: phone });
        toast.success('Password berhasil direset! Silakan login.', { id: toastId });
        navigate('/login');
    } catch (err) {
        toast.error(err.response?.data?.message || 'Gagal mereset password.', { id: toastId });
    } finally {
        setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Reset Password</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Masukkan kode OTP dari WhatsApp dan password baru Anda.
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Center>
            <PinInput length={6} {...form.getInputProps('otp')} />
          </Center>
          <PasswordInput label="Password Baru" mt="lg" {...form.getInputProps('customer_password')} required />
          <PasswordInput label="Konfirmasi Password Baru" mt="md" {...form.getInputProps('customer_password_confirmation')} required />
          <Button type="submit" fullWidth mt="xl" loading={loading}>
            Reset Password
          </Button>
           <Anchor component={Link} to="/login" size="sm" mt="lg" ta="center" display="block">
            Kembali ke Login
          </Anchor>
        </form>
      </Paper>
    </Container>
  );
}