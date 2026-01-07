import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  SegmentedControl,
  SimpleGrid,
  PasswordInput,
  FileInput,
  Alert,
  Box,
  Group
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle, IconUpload, IconUser, IconMail, IconPhone, IconBuilding } from '@tabler/icons-react';

function ErrorDisplay({ errors }) {
  if (!errors || Object.keys(errors).length === 0) return null;
  const errorMessages = Object.values(errors).flat();
  return (
    <Alert 
      color="red" 
      title="Registrasi Gagal" 
      icon={<IconAlertCircle />} 
      withCloseButton 
      variant="light" 
      my="md"
    >
      <ul style={{ listStylePosition: 'inside', paddingLeft: 0, margin: 0, fontSize: '14px' }}>
        {errorMessages.map((error, index) => <li key={index}>{error}</li>)}
      </ul>
    </Alert>
  );
}

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const form = useForm({
    initialValues: {
      customer_name: '', 
      email: '', 
      customer_phone: '', 
      customer_username: '', 
      customer_password: '', 
      customer_password_confirmation: '',
      company_name: '', 
      company_role: '', 
      company_id_npwp: '', 
      company_phone: '',
      personal_file_ktp: null, 
      company_file_npwp: null, 
      company_file_skt: null,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email tidak valid'),
      customer_password_confirmation: (value, values) =>
        value !== values.customer_password ? 'Password tidak cocok' : null,
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setErrors({});
    
    let dataToSubmit = { ...values, customer_role: role };
    
    if (role === 'personal') {
      Object.keys(dataToSubmit).forEach(key => { 
        if (key.startsWith('company_')) { 
          delete dataToSubmit[key]; 
        } 
      });
    } else if (role === 'company') {
      Object.keys(dataToSubmit).forEach(key => { 
        if (key.startsWith('personal_')) { 
          delete dataToSubmit[key]; 
        } 
      });
    }

    const formData = new FormData();
    for (const key in dataToSubmit) {
      formData.append(key, dataToSubmit[key] ?? '');
    }

    try {
      await register(formData);
      toast.success('Registrasi berhasil! Kode OTP telah dikirim ke WhatsApp Anda.');
      navigate('/verify-otp', { 
        state: { 
          phone: values.customer_phone 
        } 
      });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
        toast.error('Data yang Anda masukkan tidak valid.');
      } else {
        toast.error('Registrasi gagal. Silakan coba lagi nanti.');
      }
    } finally {
      setLoading(false);
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
      <Container size={680} style={{ flex: 1 }}>
        <Box ta="center" mb={30}>
          <Title order={2} fw={700} c="#023E8A">
            Buat Akun Baru
          </Title>
          <Text c="dimmed" size="sm" mt={8}>
            Sudah punya akun?{' '}
            <Anchor component={Link} to="/login" size="sm" fw={600} c="#1C7EBA">
              Login disini
            </Anchor>
          </Text>
        </Box>

        <Paper withBorder shadow="sm" p={35} radius="lg">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <ErrorDisplay errors={errors} />

            <Box mb="xl">
              <Text fw={500} size="sm" mb="xs">
                Tipe Akun
              </Text>
              <SegmentedControl 
                value={role} 
                onChange={setRole}
                data={[
                  { label: 'Personal', value: 'personal' }, 
                  { label: 'Perusahaan', value: 'company' }
                ]} 
                fullWidth 
                size="md"
                color="blue"
              />
            </Box>

            <Title order={4} mb="md" c="#023E8A">
              Informasi Dasar
            </Title>
            
            <SimpleGrid cols={{ base: 1, sm: 2 }} mb="md">
              <TextInput 
                label="Nama Lengkap" 
                placeholder="Masukkan nama lengkap"
                leftSection={<IconUser size={16} />}
                {...form.getInputProps('customer_name')} 
                error={errors.customer_name?.[0]} 
                required 
              />
              <TextInput 
                label="Email" 
                type="email"
                placeholder="email@contoh.com"
                leftSection={<IconMail size={16} />}
                {...form.getInputProps('email')} 
                error={errors.email?.[0]} 
                required 
              />
            </SimpleGrid>

            <TextInput 
              label="Nomor Telepon WhatsApp" 
              description="Pastikan nomor aktif untuk menerima OTP"
              placeholder="+6281234567890"
              leftSection={<IconPhone size={16} />}
              mt="md" 
              {...form.getInputProps('customer_phone')} 
              error={errors.customer_phone?.[0]} 
              required 
            />

            <TextInput 
              label="Username" 
              placeholder="Pilih username unik"
              leftSection={<IconUser size={16} />}
              mt="md" 
              {...form.getInputProps('customer_username')} 
              error={errors.customer_username?.[0]} 
              required 
            />

            <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
              <PasswordInput 
                label="Password" 
                placeholder="Minimal 8 karakter"
                {...form.getInputProps('customer_password')} 
                error={errors.customer_password?.[0]} 
                required 
              />
              <PasswordInput 
                label="Konfirmasi Password" 
                placeholder="Ulangi password"
                {...form.getInputProps('customer_password_confirmation')} 
                error={errors.customer_password_confirmation?.[0]}
                required 
              />
            </SimpleGrid>

            {role === 'personal' && (
              <Box mt="xl">
                <Title order={4} mb="md" c="#023E8A">
                  Dokumen Personal
                </Title>
                <FileInput 
                  label="Upload KTP" 
                  placeholder="Pilih file KTP"
                  leftSection={<IconUpload size={16} />}
                  accept="image/*,.pdf"
                  description="Format: JPG, PNG, atau PDF (maks. 5MB)"
                  {...form.getInputProps('personal_file_ktp')} 
                  error={errors.personal_file_ktp?.[0]} 
                />
              </Box>
            )}

            {role === 'company' && (
              <Box mt="xl">
                <Title order={4} mb="md" c="#023E8A">
                  Detail Perusahaan
                </Title>
                
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                  <TextInput 
                    label="Nama Perusahaan" 
                    placeholder="Nama lengkap perusahaan"
                    leftSection={<IconBuilding size={16} />}
                    {...form.getInputProps('company_name')} 
                    error={errors.company_name?.[0]} 
                  />
                  <TextInput 
                    label="Jabatan Anda" 
                    placeholder="Contoh: Direktur, Manager"
                    {...form.getInputProps('company_role')} 
                    error={errors.company_role?.[0]} 
                  />
                  <TextInput 
                    label="Nomor NPWP" 
                    placeholder="Nomor NPWP perusahaan"
                    {...form.getInputProps('company_id_npwp')} 
                    error={errors.company_id_npwp?.[0]} 
                  />
                  <TextInput 
                    label="Telepon Perusahaan" 
                    placeholder="Nomor telepon resmi"
                    leftSection={<IconPhone size={16} />}
                    {...form.getInputProps('company_phone')} 
                    error={errors.company_phone?.[0]} 
                  />
                </SimpleGrid>

                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
                  <FileInput 
                    label="Upload NPWP" 
                    placeholder="Pilih file NPWP"
                    leftSection={<IconUpload size={16} />}
                    accept="image/*,.pdf"
                    description="Scan NPWP perusahaan"
                    {...form.getInputProps('company_file_npwp')} 
                    error={errors.company_file_npwp?.[0]} 
                  />
                  <FileInput 
                    label="Upload SKT" 
                    placeholder="Pilih file SKT"
                    leftSection={<IconUpload size={16} />}
                    accept="image/*,.pdf"
                    description="Surat Keterangan Terdaftar"
                    {...form.getInputProps('company_file_skt')} 
                    error={errors.company_file_skt?.[0]} 
                  />
                </SimpleGrid>
              </Box>
            )}

            <Button 
              fullWidth 
              mt="xl" 
              type="submit" 
              loading={loading}
              size="md"
              style={{
                background: 'linear-gradient(135deg, #023E8A 0%, #1C7EBA 100%)',
                border: 'none',
                height: '46px',
                fontSize: '16px',
                fontWeight: 600
              }}
            >
              {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
            </Button>
          </form>
        </Paper>

        <Text c="dimmed" size="xs" ta="center" mt="lg" mb="xl">
          Dengan mendaftar, Anda menyetujui syarat dan ketentuan yang berlaku.
        </Text>
      </Container>
    </Box>
  );
}