import { useState } from 'react';
import { useAuth } from '../context/CustomerAuthContext';
import toast from 'react-hot-toast';
import { 
  TextInput, 
  Button, 
  Paper, 
  Title, 
  Text, 
  Container, 
  Anchor, 
  PasswordInput,
  Box
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { IconUser, IconLock } from '@tabler/icons-react';

export default function Login() {
  const [formData, setFormData] = useState({ 
    customer_username: '', 
    customer_password: '' 
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.customer_username.trim() || !formData.customer_password.trim()) {
      toast.error('Username dan password harus diisi');
      return;
    }

    setLoading(true);
    try {
      await login(formData);
      toast.success('Login berhasil!');
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login gagal. Periksa username dan password Anda.';
      toast.error(errorMessage);
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
    <Container size={420} style={{ marginTop: '120px' }}>
      {/* Header Section */}
      <Box ta="center" mb={40}>
        <Title order={2} fw={700} c="#023E8A">
          Selamat Datang Kembali
        </Title>
        <Text c="dimmed" size="sm" mt={8}>
          Belum punya akun?{' '}
          <Anchor component={Link} to="/register" size="sm" fw={600} c="#1C7EBA">
            Buat akun disini
          </Anchor>
        </Text>
      </Box>

      {/* Login Form */}
      <Paper withBorder shadow="sm" p={35} radius="lg">
        <form onSubmit={handleSubmit}>
          <TextInput 
            label="Username" 
            name="customer_username"
            placeholder="Masukkan username Anda"
            leftSection={<IconUser size={18} />}
            value={formData.customer_username}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            required 
            disabled={loading}
            size="md"
            mb="lg"
            styles={{
              input: {
                borderColor: '#e9ecef',
                '&:focus': {
                  borderColor: '#1C7EBA'
                }
              }
            }}
          />
          
          <PasswordInput 
            label="Password" 
            name="customer_password"
            placeholder="Masukkan password Anda"
            leftSection={<IconLock size={18} />}
            value={formData.customer_password}
            onChange={handleChange}
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
          
          <Box ta="right" mt="sm">
            <Anchor 
              component={Link} 
              to="/forgot-password" 
              size="sm" 
              c="#1C7EBA"
              underline="hover"
            >
              Lupa password?
            </Anchor>
          </Box>

          <Button 
            type="submit" 
            fullWidth 
            mt="xl" 
            loading={loading}
            size="md"
            disabled={!formData.customer_username || !formData.customer_password}
            style={{
              background: 'linear-gradient(135deg, #023E8A 0%, #1C7EBA 100%)',
              border: 'none',
              height: '46px',
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            {loading ? 'Memproses...' : 'Masuk ke Akun'}
          </Button>
        </form>
      </Paper>

      {/* Footer Note */}
      <Text c="dimmed" size="xs" ta="center" mt="lg">
        Dengan login, Anda menyetujui syarat dan ketentuan yang berlaku.
      </Text>
    </Container>
  );
}