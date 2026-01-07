import { useCart } from '../context/CartContext';
import { useAuth } from '../context/CustomerAuthContext';
import { 
  Container, 
  Title, 
  Paper, 
  Table, 
  Button, 
  Group, 
  Textarea, 
  Text, 
  Box,
  Card,
  Badge,
  Stack,
  ActionIcon,
  NumberInput,
  Alert,
  TextInput,
  Divider,
  LoadingOverlay,
  SimpleGrid,
  ScrollArea
} from '@mantine/core';
import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { 
    items, 
    clearCart, 
    getTotalPrice, 
    getTotalItems, 
    updateQuantity, 
    removeFromCart 
  } = useCart();

  const { customer } = useAuth();
  const navigate = useNavigate();
  
  const [notes, setNotes] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  
  const [whatsappContacts, setWhatsappContacts] = useState([]);
  const [loadingWhatsapp, setLoadingWhatsapp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (customer) {
      setCustomerName(customer.customer_name || '');
      setCustomerPhone(customer.customer_phone || customer.phone || '');
      setCustomerAddress(customer.customer_address || '');
    }
  }, [customer]);

  useEffect(() => {
    const fetchWhatsappContacts = async () => {
      setLoadingWhatsapp(true);
      try {
        const response = await apiClient.get('/socials');
        const socials = response.data.data || [];
        const whatsappData = socials.filter(s => 
          s.platform?.toLowerCase() === 'whatsapp'
        );
        setWhatsappContacts(whatsappData);
      } catch (error) {
        toast.error('Gagal memuat kontak Admin');
      } finally {
        setLoadingWhatsapp(false);
      }
    };
    fetchWhatsappContacts();
  }, []);

  const generateWhatsAppMessage = (quotationId) => {
    const productList = items.map(item => 
      `- ${item.product_name} (${item.quantity}x)`
    ).join('\n');
    
    const total = getTotalPrice().toLocaleString('id-ID');
    
    return `QUOTATION REQUEST [#${quotationId}]\n\n` +
           `Daftar Produk:\n${productList}\n\n` +
           `Total Estimasi: Rp ${total}\n\n` +
           `Data Pelanggan:\n` +
           `Nama: ${customerName}\n` +
           `No. HP: ${customerPhone}\n` +
           `Alamat: ${customerAddress}\n` +
           `Catatan: ${notes || '-'}\n\n` +
           `Mohon info ketersediaan stok dan harga final. Terima kasih.`;
  };

  const getFormattedWhatsappUrl = (urlOrNumber, message) => {
    if (!urlOrNumber) return '#';
    const encodedMessage = encodeURIComponent(message);
    let number = String(urlOrNumber).replace(/\D/g, '');
    if (!number) return '#';
    if (number.startsWith('0')) number = '62' + number.substring(1);
    else if (!number.startsWith('62')) number = '62' + number;
    return `https://wa.me/${number}?text=${encodedMessage}`;
  };

  const handleCheckout = async (contactUrl) => {
    if (items.length === 0) return;
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      toast.error('Lengkapi Nama, No. HP, dan Alamat');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        notes,
        items: items.map(item => ({ product_id: item.id, quantity: item.quantity }))
      };

      const response = await apiClient.post('/quotations', payload);
      const message = generateWhatsAppMessage(response.data.quotation_id);
      const finalUrl = getFormattedWhatsappUrl(contactUrl, message);

      if (finalUrl !== '#') {
        window.open(finalUrl, '_blank');
        toast.success('Permintaan Berhasil Dikirim');
        clearCart();
        navigate('/products');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan pada sistem');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <Container size="sm" py={120}>
        <Paper withBorder p={40} radius="md" ta="center">
          <Title order={2}>Keranjang Kosong</Title>
          <Text c="dimmed" mb="xl">Belum ada produk untuk diajukan penawaran.</Text>
          <Button component={Link} to="/products" fullWidth radius="md" color="blue">Lihat Katalog Produk</Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box bg="#f8f9fa" style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px' }}>
      <LoadingOverlay visible={isSubmitting} overlayProps={{ blur: 1 }} />
      <Container size="lg">
        <Title order={1} mb={30} fw={800} c="#023E8A" style={{ letterSpacing: '-1px' }}>Checkout Penawaran</Title>
        
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40}>
          
          <Stack gap="xl">
            <Card radius="md" p="lg" withBorder shadow="sm">
              <Group justify="space-between" mb="md">
                <Text fw={700} size="lg">Detail Pesanan</Text>
                <Badge variant="light" color="blue">{getTotalItems()} Item</Badge>
              </Group>
              <ScrollArea>
                <Table verticalSpacing="sm">
                  <Table.Tbody>
                    {items.map(item => (
                      <Table.Tr key={item.id}>
                        <Table.Td>
                          <Text fw={600} size="sm">{item.product_name}</Text>
                          <Text size="xs" c="dimmed">Rp {Number(item.product_price || item.price).toLocaleString('id-ID')}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Group gap={8} wrap="nowrap">
                            <ActionIcon variant="subtle" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</ActionIcon>
                            <Text fw={600} size="sm">{item.quantity}</Text>
                            <ActionIcon variant="subtle" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</ActionIcon>
                          </Group>
                        </Table.Td>
                        <Table.Td ta="right">
                          <Text fw={700} size="sm">Rp {(Number(item.product_price || item.price) * item.quantity).toLocaleString('id-ID')}</Text>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
              <Divider my="xl" />
              <Group justify="space-between">
                <Text fw={600}>Total Estimasi</Text>
                <Text fw={800} size="xl" c="#023E8A">Rp {getTotalPrice().toLocaleString('id-ID')}</Text>
              </Group>
            </Card>

            <Alert title="Informasi" color="blue" radius="md">
              <Text size="xs">Admin kami akan segera menghubungi Anda untuk detail biaya pengiriman dan ketersediaan stok terbaru setelah Anda menekan tombol hubungi admin.</Text>
            </Alert>
          </Stack>

          <Stack gap="md">
            <Card withBorder p="xl" radius="md" shadow="sm">
              <Title order={4} mb="xl">Data Pengiriman</Title>
              <Stack gap="lg">
                <TextInput 
                  label="Nama Lengkap" 
                  placeholder="Nama pengirim" 
                  value={customerName} 
                  onChange={(e) => setCustomerName(e.target.value)} 
                  required 
                />
                <TextInput 
                  label="Nomor WhatsApp" 
                  placeholder="08..." 
                  value={customerPhone} 
                  onChange={(e) => setCustomerPhone(e.target.value)} 
                  required 
                />
                <Textarea 
                  label="Alamat Lengkap" 
                  placeholder="Alamat tujuan pengiriman" 
                  value={customerAddress} 
                  onChange={(e) => setCustomerAddress(e.target.value)} 
                  required 
                  minRows={3}
                />
                <Textarea 
                  label="Catatan" 
                  placeholder="Pesan tambahan untuk admin" 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                />
              </Stack>
            </Card>

            <Card radius="md" p="xl" withBorder shadow="sm" bg="#e7f5ff">
              <Text size="sm" fw={700} mb="lg">Kirim via WhatsApp:</Text>
              <Stack gap="sm">
                {whatsappContacts.length > 0 ? (
                  whatsappContacts.map((contact) => (
                    <Button 
                      key={contact.id} 
                      onClick={() => handleCheckout(contact.url)}
                      size="lg"
                      radius="md"
                      color="green"
                      fullWidth
                    >
                      Kirim ke {contact.name || 'Admin'}
                    </Button>
                  ))
                ) : (
                  <Button loading disabled fullWidth size="lg">Memuat Kontak</Button>
                )}
                <Button 
                  variant="subtle" 
                  color="gray" 
                  component={Link} 
                  to="/products"
                >
                  Batal dan Kembali Belanja
                </Button>
              </Stack>
            </Card>
          </Stack>

        </SimpleGrid>
      </Container>
    </Box>
  );
}