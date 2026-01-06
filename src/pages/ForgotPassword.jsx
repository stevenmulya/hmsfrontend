import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  TextInput, 
  Button, 
  Paper, 
  Title, 
  Text, 
  Container, 
  Anchor,
  Box
} from '@mantine/core';
import { IconPhone, IconArrowLeft } from '@tabler/icons-react';
import apiClient from '../api/apiClient';

export default function ForgotPassword() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      toast.error('Nomor telepon harus diisi');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Mengirim permintaan...');
    
    try {
      await apiClient.post('/forgot-password', { customer_phone: phone });
      toast.success('Kode OTP telah dikirim ke WhatsApp Anda.', { id: toastId });
      // Navigate to the reset page, passing the phone number
      navigate('/reset-password', { state: { phone } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Nomor telepon tidak ditemukan.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <Box 
      style={{ 
        minHeight: 'calc(100vh - 140px)',
        paddingTop: '100px',
        paddingBottom: '60px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Container size={420} style={{ flex: 1 }}>
        {/* Header Section */}
        <Box ta="center" mb={30}>
          <Title order={2} fw={700} c="#023E8A">
            Lupa Password
          </Title>
          <Text c="dimmed" size="sm" mt={8}>
            Masukkan nomor telepon Anda untuk menerima kode OTP via WhatsApp
          </Text>
        </Box>

        {/* Forgot Password Form */}
        <Paper withBorder shadow="sm" p={35} radius="lg">
          <form onSubmit={handleSubmit}>
            <TextInput 
              label="Nomor Telepon WhatsApp" 
              name="customer_phone" 
              placeholder="+6281234567890"
              description="Pastikan nomor terdaftar dan aktif"
              leftSection={<IconPhone size={18} />}
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              onKeyPress={handleKeyPress}
              required 
              disabled={loading}
              size="md"
              styles={{
                input: {
                  borderColor: '#e9ecef',
                  '&:focus': {
                    borderColor: '#1C7EBA'
                  }
                }
              }}
            />
            
            <Button 
              type="submit" 
              fullWidth 
              mt="xl" 
              loading={loading}
              size="md"
              disabled={!phone.trim()}
              style={{
                background: 'linear-gradient(135deg, #023E8A 0%, #1C7EBA 100%)',
                border: 'none',
                height: '46px',
                fontSize: '16px',
                fontWeight: 600
              }}
            >
              {loading ? 'Mengirim...' : 'Kirim Kode OTP'}
            </Button>

            <Anchor 
              component={Link} 
              to="/login" 
              size="sm" 
              mt="lg" 
              ta="center" 
              display="block"
              c="#1C7EBA"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <IconArrowLeft size={16} />
              Kembali ke Login
            </Anchor>
          </form>
        </Paper>

        {/* Additional Information */}
        <Box mt="lg" p="md" style={{ 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <Text size="sm" c="dimmed" ta="center">
            <strong>Perhatian:</strong> Kode OTP akan dikirim via WhatsApp dan berlaku selama 10 menit
          </Text>
        </Box>
      </Container>
    </Box>
  );
}