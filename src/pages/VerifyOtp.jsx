import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/CustomerAuthContext';
import toast from 'react-hot-toast';
import { PinInput, Button, Paper, Title, Text, Container, Center } from '@mantine/core';
import apiClient from '../api/apiClient';

export default function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { verifyOtp } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const phone = location.state?.phone;

  if (!phone) {
    navigate('/register');
    return null; 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyOtp({ otp, customer_phone: phone });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Kode OTP salah.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    const toastId = toast.loading('Mengirim ulang kode...');
    try {
        await apiClient.post('/resend-verification-otp', { customer_phone: phone });
        toast.success('Kode baru telah dikirim!', { id: toastId });
    } catch (err) {
        toast.error('Gagal mengirim ulang kode.', { id: toastId });
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Verifikasi Akun Anda</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Kami telah mengirim kode 6 digit ke WhatsApp nomor {phone}
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Center>
            <PinInput length={6} value={otp} onChange={setOtp} oneTimeCode autoFocus />
          </Center>
          <Button type="submit" fullWidth mt="xl" loading={loading}>
            Verifikasi
          </Button>
        </form>
        <Text c="dimmed" size="sm" ta="center" mt="lg">
          Tidak menerima kode?{' '}
          <Text component="button" size="sm" c="blue" onClick={handleResend} style={{ all: 'unset', cursor: 'pointer', textDecoration: 'underline' }}>
            Kirim Ulang
          </Text>
        </Text>
      </Paper>
    </Container>
  );
}