import { Container, Title, Text, Button, Paper, Box, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconCircleCheck, IconArrowLeft, IconShoppingCart } from '@tabler/icons-react';

export default function QuotationSuccessPage() {
  return (
    <Box 
      style={{ 
        minHeight: 'calc(100vh - 140px)',
        paddingTop: '100px',
        paddingBottom: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container size="sm">
        <Paper 
          withBorder 
          p="xl" 
          radius="lg" 
          shadow="sm"
          style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)'
          }}
        >
          {/* Success Icon */}
          <Box ta="center" mb="lg">
            <IconCircleCheck 
              size={80} 
              color="var(--mantine-color-green-6)" 
              style={{ 
                margin: 'auto',
                background: 'linear-gradient(135deg, #40c057 0%, #51cf66 100%)',
                borderRadius: '50%',
                padding: '12px',
                boxShadow: '0 4px 12px rgba(64, 192, 87, 0.3)'
              }} 
            />
          </Box>

          {/* Success Message */}
          <Box ta="center" mb="xl">
            <Title order={2} c="#023E8A" mb="md">
              Permintaan Berhasil Dikirim!
            </Title>
            <Text c="dimmed" size="lg" mb="sm">
              Terima kasih atas permintaan penawaran Anda.
            </Text>
            <Text c="dimmed" size="md">
              Tim kami akan segera menghubungi Anda melalui WhatsApp atau email 
              dalam 1x24 jam untuk memberikan penawaran terbaik.
            </Text>
          </Box>

          {/* Additional Information */}
          <Paper 
            withBorder 
            p="md" 
            radius="md" 
            mb="xl"
            style={{
              backgroundColor: '#f8f9fa',
              borderColor: '#e9ecef'
            }}
          >
            <Group justify="center" gap="xs">
              <Text size="sm" c="dimmed" ta="center">
                📞 <strong>Info:</strong> Pastikan nomor WhatsApp Anda aktif untuk menerima penawaran
              </Text>
            </Group>
          </Paper>

          {/* Action Buttons */}
          <Group justify="center" gap="md">
            <Button 
              variant="light" 
              color="gray"
              leftSection={<IconArrowLeft size={18} />}
              component={Link}
              to="/products"
              size="md"
            >
              Kembali Belanja
            </Button>
            
            <Button 
              size="md"
              leftSection={<IconShoppingCart size={18} />}
              component={Link}
              to="/products"
              style={{
                background: 'linear-gradient(135deg, #023E8A 0%, #1C7EBA 100%)',
                border: 'none',
                padding: '0 24px',
                height: '42px',
                fontSize: '15px',
                fontWeight: 600
              }}
            >
              Lihat Produk Lainnya
            </Button>
          </Group>

          {/* Contact Information */}
          <Text size="sm" c="dimmed" ta="center" mt="xl">
            Butuh bantuan cepat?{' '}
            <Text 
              component="a" 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              c="#1C7EBA" 
              fw={600}
              style={{ textDecoration: 'none' }}
            >
              Hubungi WhatsApp Kami
            </Text>
          </Text>
        </Paper>
      </Container>
    </Box>
  );
}