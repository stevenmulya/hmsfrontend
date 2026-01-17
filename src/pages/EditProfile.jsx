import { useEffect, useState } from 'react';
import { useAuth } from '../context/CustomerAuthContext';
import toast from 'react-hot-toast';
import { TextInput, Button, Paper, Title, Container, SimpleGrid, Group, Text, Textarea, Image, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import apiClient from '../api/apiClient';

export default function EditProfile() {
  const { customer, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState({});
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      customer_name: '', 
      customer_username: '', 
      customer_email: '',
      customer_phone: '',
      customer_address: '',
      company_name: '', 
      company_role: '', 
      company_id_npwp: '', 
      company_phone: '',
      personal_file_ktp: null, 
      company_file_npwp: null, 
      company_file_skt: null,
    },
    validate: {
      customer_email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email tidak valid'),
    },
  });

  useEffect(() => {
    if (customer) {
      form.setValues({
        customer_name: customer.customer_name || '',
        customer_username: customer.customer_username || '',
        customer_email: customer.email || '',
        customer_phone: customer.customer_phone || '',
        customer_address: customer.customer_address || '',
        company_name: customer.company_name || '',
        company_role: customer.company_role || '',
        company_id_npwp: customer.company_id_npwp || '',
        company_phone: customer.company_phone || '',
      });
    }
  }, [customer]);

  const handleFileChange = (file, fieldName) => {
    form.setFieldValue(fieldName, file);
    if (file && file.type.startsWith('image/')) {
      const previewUrl = URL.createObjectURL(file);
      setPreviews(prev => ({ ...prev, [fieldName]: previewUrl }));
    } else {
      setPreviews(prev => ({ ...prev, [fieldName]: null }));
    }
  };

  useEffect(() => {
    return () => {
      Object.values(previews).forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [previews]);

  const handleSubmit = async (values) => {
    setLoading(true);
    setErrors({});

    const cleanedNewPhone = String(values.customer_phone).replace(/\D/g, '');
    const cleanedOldPhone = String(customer.customer_phone).replace(/\D/g, '');

    if (cleanedNewPhone !== cleanedOldPhone) {
      try {
        await apiClient.post('/send-otp-update-phone', { 
          new_phone: cleanedNewPhone 
        });
        
        toast.success('Kode verifikasi dikirim ke nomor baru Anda');
        navigate('/verify-otp', { 
          state: { 
            phone: cleanedNewPhone, 
            isUpdatingPhone: true,
            pendingData: { ...values, customer_phone: cleanedNewPhone } 
          } 
        });
        return;
      } catch (error) {
        if (error.response?.status === 422) {
          setErrors(error.response.data.errors);
          toast.error(error.response.data.message || 'Nomor tidak valid');
        } else {
          toast.error('Gagal mengirim kode verifikasi.');
        }
        setLoading(false);
        return;
      }
    }

    const formData = new FormData();
    for (const key in values) {
      if (values[key] !== null && values[key] !== undefined) {
        formData.append(key, key === 'customer_phone' ? cleanedNewPhone : values[key]);
      }
    }

    try {
      await updateProfile(formData);
      toast.success('Profil berhasil diperbarui!');
      navigate('/profile');
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error('Data tidak valid.');
      } else {
        toast.error('Gagal memperbarui profil.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box pt={100} pb={100}>
      <Container size="lg">
        <Title ta="center">Edit Profil</Title>
        <Text ta="center" c="dimmed" mb="xl">Perbarui informasi akun Anda.</Text>
        
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Paper withBorder shadow="sm" p="xl" radius="md">
            <Title order={3} mb="lg">Informasi Akun</Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <TextInput label="Nama Lengkap" {...form.getInputProps('customer_name')} error={errors.customer_name?.[0]} />
              <TextInput label="Username" {...form.getInputProps('customer_username')} error={errors.customer_username?.[0]} />
              <TextInput label="Email" {...form.getInputProps('customer_email')} error={errors.customer_email?.[0]} />
              <TextInput label="Nomor Telepon" {...form.getInputProps('customer_phone')} error={errors.customer_phone?.[0]} />
            </SimpleGrid>
            <Textarea label="Alamat" mt="md" {...form.getInputProps('customer_address')} error={errors.customer_address?.[0]} />
          </Paper>
          
          {customer?.customer_role === 'personal' && (
            <Paper withBorder shadow="sm" p="xl" radius="md" mt="xl">
              <Title order={3} mb="lg">Dokumen Personal</Title>
              <FileUpload 
                label="File KTP"
                currentFileUrl={customer.personal_file_ktp_url}
                error={errors.personal_file_ktp?.[0]}
                onChange={(file) => handleFileChange(file, 'personal_file_ktp')}
              />
              {previews.personal_file_ktp && <Image src={previews.personal_file_ktp} mt="sm" radius="md" w={200} alt="Preview KTP" />}
            </Paper>
          )}
          
          {customer?.customer_role === 'company' && (
            <Paper withBorder shadow="sm" p="xl" radius="md" mt="xl">
              <Title order={3} mb="lg">Informasi & Dokumen Perusahaan</Title>
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <TextInput label="Nama Perusahaan" {...form.getInputProps('company_name')} error={errors.company_name?.[0]} />
                <TextInput label="Jabatan" {...form.getInputProps('company_role')} error={errors.company_role?.[0]} />
                <TextInput label="Nomor NPWP" {...form.getInputProps('company_id_npwp')} error={errors.company_id_npwp?.[0]} />
                <TextInput label="Telepon Perusahaan" {...form.getInputProps('company_phone')} error={errors.company_phone?.[0]} />
              </SimpleGrid>
              <SimpleGrid cols={{ base: 1, sm: 2 }} mt="lg">
                <FileUpload 
                  label="File NPWP" 
                  currentFileUrl={customer.company_file_npwp_url} 
                  error={errors.company_file_npwp?.[0]} 
                  onChange={(file) => handleFileChange(file, 'company_file_npwp')}
                />
                <FileUpload 
                  label="File SKT" 
                  currentFileUrl={customer.company_file_skt_url} 
                  error={errors.company_file_skt?.[0]} 
                  onChange={(file) => handleFileChange(file, 'company_file_skt')}
                />
              </SimpleGrid>
              <Group mt="sm">
                {previews.company_file_npwp && <Image src={previews.company_file_npwp} radius="md" w={200} alt="Preview NPWP" />}
                {previews.company_file_skt && <Image src={previews.company_file_skt} radius="md" w={200} alt="Preview SKT" />}
              </Group>
            </Paper>
          )}

          <Group justify="flex-end" mt="xl">
            <Button component={Link} to="/profile" variant="default">Batal</Button>
            <Button type="submit" loading={loading}>Simpan Perubahan</Button>
          </Group>
        </form>
      </Container>
    </Box>
  );
}