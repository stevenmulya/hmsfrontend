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
  ScrollArea,
  Tooltip
} from '@mantine/core';
import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { IconPlus, IconMinus, IconTrash, IconShoppingCartOff } from '@tabler/icons-react';

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

  const isPriceHiddenInCart = items.some(item => {
    const sp = item.show_price;
    return sp === false || sp === 0 || sp === "0" || sp === "false" || sp === null || sp === undefined;
  });

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
    
    const totalDisplay = isPriceHiddenInCart ? 'Hubungi Admin' : `Rp ${getTotalPrice().toLocaleString('id-ID')}`;
    
    return `QUOTATION REQUEST [#${quotationId}]\n\n` +
            `Daftar Produk:\n${productList}\n\n` +
            `Total Estimasi: ${totalDisplay}\n\n` +
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
        <Paper withBorder p={40} radius="md" ta="center" shadow="sm">
          <IconShoppingCartOff size={50} color="gray" stroke={1.5} style={{ marginBottom: '20px' }} />
          <Title order={2} mb="xs">Keranjang Kosong</Title>
          <Text c="dimmed" mb="xl">Belum ada produk untuk diajukan penawaran.</Text>
          <Button component={Link} to="/products" fullWidth radius="md" color="blue" size="md">Lihat Katalog Produk</Button>
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
              <Group justify="space-between" mb="lg">
                <Stack gap={0}>
                  <Text fw={700} size="lg">Detail Pesanan</Text>
                  <Text size="xs" c="dimmed">Kelola item sebelum mengirim penawaran</Text>
                </Stack>
                <Group gap="xs">
                  <Badge variant="light" color="blue" size="lg" radius="sm">{getTotalItems()} Item</Badge>
                  <Tooltip label="Kosongkan Keranjang">
                    <ActionIcon variant="light" color="red" size="lg" onClick={clearCart}>
                      <IconTrash size={20} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Group>

              <ScrollArea h={400} offsetScrollbars>
                <Table verticalSpacing="md" highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Produk</Table.Th>
                      <Table.Th ta="center">Jumlah</Table.Th>
                      <Table.Th ta="right">Subtotal</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {items.map(item => {
                      const isItemPriceVisible = item.show_price === true || item.show_price === 1 || item.show_price === "1" || item.show_price === "true";
                      return (
                        <Table.Tr key={item.id}>
                          <Table.Td style={{ maxWidth: '200px' }}>
                            <Text fw={600} size="sm" lineClamp={2}>{item.product_name}</Text>
                            {isItemPriceVisible && (
                              <Text size="xs" c="dimmed">Rp {Number(item.product_price || item.price).toLocaleString('id-ID')}</Text>
                            )}
                          </Table.Td>
                          <Table.Td>
                            <Stack align="center" gap={5}>
                              <Group gap={5} wrap="nowrap">
                                <ActionIcon 
                                  variant="subtle" 
                                  color="gray"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <IconMinus size={14} />
                                </ActionIcon>
                                <NumberInput
                                  value={item.quantity}
                                  onChange={(val) => updateQuantity(item.id, val)}
                                  min={1}
                                  max={999}
                                  size="xs"
                                  w={45}
                                  hideControls
                                  styles={{ input: { textAlign: 'center', fontWeight: 600 } }}
                                />
                                <ActionIcon 
                                  variant="subtle" 
                                  color="blue"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <IconPlus size={14} />
                                </ActionIcon>
                              </Group>
                              <Text 
                                size="10px" 
                                c="red" 
                                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                onClick={() => removeFromCart(item.id)}
                              >
                                Hapus
                              </Text>
                            </Stack>
                          </Table.Td>
                          <Table.Td ta="right">
                            {isItemPriceVisible ? (
                              <Text fw={700} size="sm" c="blue.8">Rp {(Number(item.product_price || item.price) * item.quantity).toLocaleString('id-ID')}</Text>
                            ) : (
                              <Text fw={600} size="xs" c="blue" fs="italic">Hubungi Admin</Text>
                            )}
                          </Table.Td>
                        </Table.Tr>
                      );
                    })}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
              
              <Box pt="xl" mt="xl" style={{ borderTop: '2px dashed #eee' }}>
                <Group justify="space-between">
                  <Text fw={700} size="lg">Total Estimasi</Text>
                  {isPriceHiddenInCart ? (
                    <Badge size="xl" radius="sm" variant="filled" color="blue">Hubungi Admin</Badge>
                  ) : (
                    <Text fw={800} size="24px" c="#023E8A">Rp {getTotalPrice().toLocaleString('id-ID')}</Text>
                  )}
                </Group>
              </Box>
            </Card>

            <Alert icon={<IconPlus size={16}/>} title="Info Penawaran" color="blue" radius="md">
              <Text size="xs">Harga yang tertera adalah estimasi. Admin akan memberikan penawaran harga final beserta ongkos kirim melalui WhatsApp.</Text>
            </Alert>
          </Stack>

          <Stack gap="md">
            <Card withBorder p="xl" radius="md" shadow="sm">
              <Title order={4} mb="xl">Informasi Kontak & Pengiriman</Title>
              <Stack gap="lg">
                <TextInput 
                  label="Nama Penerima / Perusahaan" 
                  placeholder="Masukkan nama lengkap" 
                  value={customerName} 
                  onChange={(e) => setCustomerName(e.target.value)} 
                  required 
                  size="md"
                />
                <TextInput 
                  label="Nomor WhatsApp Aktif" 
                  placeholder="Contoh: 08123456789" 
                  value={customerPhone} 
                  onChange={(e) => setCustomerPhone(e.target.value)} 
                  required 
                  size="md"
                />
                <Textarea 
                  label="Alamat Pengiriman" 
                  placeholder="Jalan, No. Rumah, Kecamatan, Kota" 
                  value={customerAddress} 
                  onChange={(e) => setCustomerAddress(e.target.value)} 
                  required 
                  minRows={3}
                  size="md"
                />
                <Textarea 
                  label="Catatan Khusus (Opsional)" 
                  placeholder="Contoh: Kirim sebelum jam 3 sore" 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                  size="md"
                />
              </Stack>
            </Card>

            <Card radius="md" p="xl" withBorder shadow="sm" bg="#e7f5ff" style={{ border: '1px solid #74c0fc' }}>
              <Text size="sm" fw={700} mb="lg" c="blue.9">Langkah Terakhir:</Text>
              <Stack gap="sm">
                {whatsappContacts.length > 0 ? (
                  whatsappContacts.map((contact) => (
                    <Button 
                      key={contact.id} 
                      onClick={() => handleCheckout(contact.url)}
                      size="xl"
                      radius="md"
                      color="green"
                      fullWidth
                      leftSection={<IconTrash size={20} style={{ display: 'none' }} />} // Placeholder icon if needed
                    >
                      Kirim via {contact.name || 'WhatsApp Admin'}
                    </Button>
                  ))
                ) : (
                  <Button loading disabled fullWidth size="xl">Menghubungkan ke Admin...</Button>
                )}
                <Button 
                  variant="subtle" 
                  color="gray" 
                  component={Link} 
                  to="/products"
                  size="sm"
                >
                  Kembali ke Katalog
                </Button>
              </Stack>
            </Card>
          </Stack>

        </SimpleGrid>
      </Container>
    </Box>
  );
}