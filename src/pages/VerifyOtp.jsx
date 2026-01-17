import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/CustomerAuthContext';
import toast from 'react-hot-toast';
import { PinInput, Button, Paper, Title, Text, Container, Center, Box, Group } from '@mantine/core';
import apiClient from '../api/apiClient';

export default function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { verifyOtp, updateProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const phone = location.state?.phone;
  const isUpdatingPhone = location.state?.isUpdatingPhone;
  const pendingData = location.state?.pendingData;

  useEffect(() => {
    if (!phone) {
      navigate('/register');
    }
  }, [phone, navigate]);

  if (!phone) return null;

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (otp.length < 6) {
      toast.error('Silakan masukkan 6 digit kode OTP.');
      return;
    }

    setLoading(true);
    try {
      if (isUpdatingPhone) {
        await apiClient.post('/verify-otp-update-phone', {
          customer_phone: phone,
          otp_code: otp
        });

        const formData = new FormData();
        for (const key in pendingData) {
          if (pendingData[key] !== null && pendingData[key] !== undefined) {
            formData.append(key, pendingData[key]);
          }
        }
        
        await updateProfile(formData);
        toast.success('Nomor telepon dan profil berhasil diperbarui!');
        navigate('/profile');
      } else {
        await verifyOtp({ 
          customer_phone: phone,
          otp_code: otp 
        });
        toast.success('Verifikasi berhasil! Akun Anda telah aktif.');
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Kode OTP salah atau telah kadaluwarsa.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    const toastId = toast.loading('Mengirim ulang kode...');
    try {
      const endpoint = isUpdatingPhone ? '/send-otp-update-phone' : '/resend-verification-otp';
      const payload = isUpdatingPhone ? { new_phone: phone } : { customer_phone: phone };
      await apiClient.post(endpoint, payload);
      toast.success('Kode baru telah dikirim!', { id: toastId });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal mengirim ulang kode.', { id: toastId });
    }
  };

  return (
    <Box 
      style={{ 
        minHeight: 'calc(100vh - 140px)', 
        paddingTop: '140px',
        paddingBottom: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Container size={460}>
        <Title ta="center" fw={700} c="#023E8A">
          {isUpdatingPhone ? 'Verifikasi Nomor Baru' : 'Verifikasi Akun'}
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={8}>
          Masukkan 6 digit kode yang kami kirim ke WhatsApp <Text span fw={700} c="black">{phone}</Text>
        </Text>

        <Paper withBorder shadow="sm" p={40} mt={30} radius="lg">
          <form onSubmit={handleSubmit}>
            <Center>
              <PinInput 
                length={6} 
                value={otp} 
                onChange={setOtp} 
                oneTimeCode 
                autoFocus 
                size="md"
                type="number"
              />
            </Center>

            <Button 
              type="submit" 
              fullWidth 
              mt="xl" 
              loading={loading}
              size="md"
              style={{
                background: 'linear-gradient(135deg, #023E8A 0%, #1C7EBA 100%)',
                border: 'none',
                height: '46px',
                fontWeight: 600
              }}
            >
              {isUpdatingPhone ? 'Konfirmasi Perubahan' : 'Verifikasi Sekarang'}
            </Button>
          </form>

          <Group justify="center" mt="xl" gap="xs">
            <Text size="sm" c="dimmed">Tidak menerima kode?</Text>
            <Button 
              variant="transparent" 
              size="sm" 
              p={0} 
              onClick={handleResend}
              style={{ height: 'auto', fontWeight: 600 }}
            >
              Kirim Ulang
            </Button>
          </Group>
        </Paper>

        <Text 
          c="blue" 
          size="sm" 
          ta="center" 
          mt="xl" 
          style={{ cursor: 'pointer', fontWeight: 500 }} 
          onClick={() => navigate(isUpdatingPhone ? '/profile' : '/register')}
        >
          {isUpdatingPhone ? 'Kembali ke Profile' : 'Ganti nomor telepon?'}
        </Text>
      </Container>
    </Box>
  );
}