import { useCart } from '../context/CartContext';
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
  Divider,
  ActionIcon,
  NumberInput,
  Alert,
  Modal,
  Select,
  Loader
} from '@mantine/core';
import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { 
  IconShoppingCart, 
  IconArrowLeft, 
  IconSend, 
  IconTrash, 
  IconPlus, 
  IconMinus, 
  IconAlertCircle,
  IconPhone,
  IconBrandWhatsapp
} from '@tabler/icons-react';

export default function CheckoutPage() {
  const { 
    items, 
    clearCart, 
    getTotalPrice, 
    getTotalItems, 
    updateQuantity, 
    removeFromCart 
  } = useCart();
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [updatingItems, setUpdatingItems] = useState({});
  const [whatsappModalOpened, setWhatsappModalOpened] = useState(false);
  const [selectedWhatsapp, setSelectedWhatsapp] = useState('');
  const [whatsappContacts, setWhatsappContacts] = useState([]);
  const [loadingWhatsapp, setLoadingWhatsapp] = useState(false);
  const navigate = useNavigate();

  // Fetch WhatsApp contacts dari backend
  useEffect(() => {
    const fetchWhatsappContacts = async () => {
      setLoadingWhatsapp(true);
      try {
        const response = await apiClient.get('/socials');
        const socials = response.data.data || [];
        const whatsappData = socials.filter(s => 
          s.platform && s.platform.toLowerCase() === 'whatsapp'
        );
        
        // Format data untuk Select component
        const formattedContacts = whatsappData.map(contact => ({
          value: contact.url,
          label: contact.name || contact.url,
          raw: contact
        }));
        
        setWhatsappContacts(formattedContacts);
        
        // Auto-select pertama jika ada
        if (formattedContacts.length > 0 && !selectedWhatsapp) {
          setSelectedWhatsapp(formattedContacts[0].value);
        }
      } catch (error) {
        console.error('Error fetching WhatsApp contacts:', error);
        toast.error('Gagal memuat kontak WhatsApp');
      } finally {
        setLoadingWhatsapp(false);
      }
    };

    fetchWhatsappContacts();
  }, []);

  // Handler untuk update quantity
  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }

    setUpdatingItems(prev => ({ ...prev, [productId]: true }));
    
    try {
      updateQuantity(productId, newQuantity);
    } catch (error) {
      toast.error('Gagal memperbarui jumlah produk');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [productId]: false }));
    }
  };

  // Handler untuk hapus item
  const handleRemoveItem = (productId) => {
    const item = items.find(item => item.id === productId);
    if (item) {
      removeFromCart(productId);
      toast.success(`${item.product_name} dihapus dari keranjang`);
    }
  };

  // Handler untuk increment quantity
  const handleIncrement = (productId) => {
    const item = items.find(item => item.id === productId);
    if (item) {
      handleUpdateQuantity(productId, item.quantity + 1);
    }
  };

  // Handler untuk decrement quantity
  const handleDecrement = (productId) => {
    const item = items.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      handleUpdateQuantity(productId, item.quantity - 1);
    }
  };

  // Format nomor WhatsApp untuk display
  const formatWhatsappNumber = (url) => {
    if (!url) return '';
    
    // Jika sudah format wa.me
    if (url.includes('wa.me/')) {
      const number = url.split('wa.me/')[1];
      return `+${number}`;
    }
    
    // Jika format nomor biasa
    const cleaned = url.replace(/\D/g, '');
    if (cleaned.startsWith('62')) {
      return `+${cleaned}`;
    } else if (cleaned.startsWith('0')) {
      return `+62${cleaned.substring(1)}`;
    }
    
    return url;
  };

  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    const productList = items.map(item => 
      `• ${item.product_name} - ${item.quantity} pcs x Rp ${Number(item.product_price || item.price || 0).toLocaleString('id-ID')}`
    ).join('\n');
    
    const total = getTotalPrice().toLocaleString('id-ID');
    
    return `Halo, saya ingin meminta penawaran untuk produk berikut:\n\n${productList}\n\n*Total Estimasi:* Rp ${total}\n\n*Catatan:* ${notes || 'Tidak ada catatan tambahan'}\n\nTerima kasih.`;
  };

  // Handler untuk kirim ke WhatsApp
  const handleSendToWhatsApp = () => {
    if (!selectedWhatsapp) {
      toast.error('Silakan pilih kontak WhatsApp terlebih dahulu');
      return;
    }

    const message = encodeURIComponent(generateWhatsAppMessage());
    let whatsappUrl = '';

    // Handle different WhatsApp URL formats
    if (selectedWhatsapp.includes('wa.me/')) {
      whatsappUrl = `${selectedWhatsapp}?text=${message}`;
    } else {
      const cleanedNumber = selectedWhatsapp.replace(/\D/g, '');
      const formattedNumber = cleanedNumber.startsWith('0') ? '62' + cleanedNumber.substring(1) : cleanedNumber;
      whatsappUrl = `https://wa.me/${formattedNumber}?text=${message}`;
    }

    // Buka WhatsApp di tab baru
    window.open(whatsappUrl, '_blank');
    
    // Tutup modal dan redirect ke success page
    setWhatsappModalOpened(false);
    
    // Optional: Clear cart setelah kirim ke WhatsApp
    // clearCart();
    // navigate('/quotation-success');
    
    toast.success('Membuka WhatsApp...');
  };

  // Handler untuk submit quotation (original functionality)
  const handleSubmitQuotation = async () => {
    if (items.length === 0) {
      toast.error('Keranjang Anda kosong');
      return;
    }

    setLoading(true);
    const payload = {
      items: items.map(item => ({ 
        product_id: item.id, 
        quantity: item.quantity 
      })),
      notes: notes,
    };
    
    try {
      await apiClient.post('/quotations', payload);
      toast.success('Permintaan penawaran berhasil dikirim!');
      clearCart();
      navigate('/quotation-success');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.message || 'Gagal mengirim permintaan penawaran.');
    } finally {
      setLoading(false);
    }
  };

  // Handler untuk tombol utama - buka modal pilihan WhatsApp
  const handleMainSubmit = () => {
    if (items.length === 0) {
      toast.error('Keranjang Anda kosong');
      return;
    }
    setWhatsappModalOpened(true);
  };

  const rows = items.map(item => {
    const productPrice = Number(item.product_price || item.price || 0);
    const subtotal = productPrice * item.quantity;
    const isUpdating = updatingItems[item.id];

    return (
      <Table.Tr key={item.id} style={{ opacity: isUpdating ? 0.6 : 1 }}>
        <Table.Td>
          <Box>
            <Text fw={500} lineClamp={2}>
              {item.product_name}
            </Text>
            <Text size="sm" c="dimmed">
              Rp {productPrice.toLocaleString('id-ID')} / unit
            </Text>
          </Box>
        </Table.Td>
        
        <Table.Td>
          <Group gap="xs" justify="center" wrap="nowrap">
            <ActionIcon 
              variant="light" 
              color="blue" 
              size="sm"
              onClick={() => handleDecrement(item.id)}
              disabled={item.quantity <= 1 || isUpdating}
            >
              <IconMinus size={14} />
            </ActionIcon>
            
            <NumberInput
              value={item.quantity}
              onChange={(value) => handleUpdateQuantity(item.id, Number(value))}
              min={1}
              max={999}
              hideControls
              size="xs"
              w={60}
              disabled={isUpdating}
              styles={{
                input: {
                  textAlign: 'center',
                  fontWeight: 600
                }
              }}
            />
            
            <ActionIcon 
              variant="light" 
              color="blue" 
              size="sm"
              onClick={() => handleIncrement(item.id)}
              disabled={isUpdating}
            >
              <IconPlus size={14} />
            </ActionIcon>
          </Group>
        </Table.Td>
        
        <Table.Td>
          <Text fw={600} ta="right">
            Rp {subtotal.toLocaleString('id-ID')}
          </Text>
        </Table.Td>
        
        <Table.Td>
          <ActionIcon
            color="red"
            variant="light"
            size="sm"
            onClick={() => handleRemoveItem(item.id)}
            disabled={isUpdating}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });

  if (items.length === 0) {
    return (
      <Box 
        style={{ 
          minHeight: 'calc(100vh - 140px)',
          paddingTop: '100px',
          paddingBottom: '60px'
        }}
      >
        <Container size="md">
          <Paper withBorder p="xl" radius="lg" ta="center" shadow="sm">
            <Box mb="md">
              <IconShoppingCart size={48} color="#868e96" />
            </Box>
            <Title order={3} c="dark.4" mb="md">
              Keranjang Anda Kosong
            </Title>
            <Text c="dimmed" mb="xl">
              Sepertinya Anda belum menambahkan produk apapun ke keranjang.
            </Text>
            <Button 
              component={Link} 
              to="/products" 
              size="lg"
              leftSection={<IconArrowLeft size={18} />}
              style={{
                background: 'linear-gradient(135deg, #023E8A 0%, #1C7EBA 100%)',
                border: 'none'
              }}
            >
              Mulai Belanja
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <>
      <Box 
        style={{ 
          minHeight: 'calc(100vh - 140px)',
          paddingTop: '100px',
          paddingBottom: '60px'
        }}
      >
        <Container size="lg">
          {/* Header */}
          <Box mb="xl">
            <Group justify="space-between" align="flex-end">
              <div>
                <Title order={1} c="#023E8A" mb="xs">
                  Edit Permintaan Penawaran
                </Title>
                <Text c="dimmed">
                  Atur jumlah produk dan tambahkan catatan untuk permintaan penawaran Anda
                </Text>
              </div>
              <Badge size="lg" color="blue" variant="light">
                {getTotalItems()} items
              </Badge>
            </Group>
          </Box>

          <Stack gap="xl">
            {/* Info Alert */}
            <Alert 
              variant="light" 
              color="blue" 
              title="Edit Permintaan Penawaran"
              icon={<IconAlertCircle />}
            >
              Anda dapat mengubah jumlah produk sesuai kebutuhan. Tim kami akan menghubungi Anda untuk konfirmasi harga final.
            </Alert>

            {/* Products Table */}
            <Card withBorder shadow="sm" radius="lg" p={0}>
              <Box p="md" style={{ borderBottom: '1px solid #e9ecef' }}>
                <Title order={4}>Detail Produk</Title>
              </Box>
              <Table verticalSpacing="md" horizontalSpacing="lg">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Produk</Table.Th>
                    <Table.Th ta="center">Jumlah</Table.Th>
                    <Table.Th ta="right">Subtotal</Table.Th>
                    <Table.Th ta="center">Aksi</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </Card>

            {/* Order Summary */}
            <Card withBorder shadow="sm" radius="lg">
              <Title order={4} mb="md">Ringkasan Permintaan</Title>
              <Group justify="space-between" mb="sm">
                <Text c="dimmed">Total Items:</Text>
                <Text fw={600}>{getTotalItems()} items</Text>
              </Group>
              <Group justify="space-between">
                <Text c="dimmed">Estimasi Total:</Text>
                <Title order={3} c="#023E8A">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </Title>
              </Group>
              <Text size="sm" c="dimmed" mt="xs">
                * Harga final akan dikonfirmasi setelah penawaran disetujui oleh tim kami
              </Text>
            </Card>

            {/* Additional Notes */}
            <Card withBorder shadow="sm" radius="lg">
              <Title order={4} mb="md">Catatan Tambahan</Title>
              <Textarea 
                placeholder="Tuliskan catatan khusus, spesifikasi teknis, preferensi pengiriman, atau pertanyaan tambahan untuk permintaan penawaran Anda..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                minRows={4}
                size="md"
              />
              <Text size="sm" c="dimmed" mt="xs">
                Contoh: deadline pengiriman, spesifikasi material, lokasi proyek, dll.
              </Text>
            </Card>

            {/* Action Buttons */}
            <Group justify="space-between" mt="xl">
              <Button 
                variant="light" 
                color="gray"
                leftSection={<IconArrowLeft size={18} />}
                component={Link}
                to="/products"
                size="md"
              >
                Lanjutkan Belanja
              </Button>
              
              <Group>
                <Button 
                  variant="light" 
                  color="red"
                  onClick={clearCart}
                  size="md"
                  leftSection={<IconTrash size={18} />}
                >
                  Kosongkan Semua
                </Button>
                
                <Button 
                  size="lg"
                  onClick={handleMainSubmit}
                  loading={loading}
                  leftSection={<IconBrandWhatsapp size={18} />}
                  style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    border: 'none',
                    padding: '0 32px',
                    height: '48px',
                    fontSize: '16px',
                    fontWeight: 600
                  }}
                >
                  {loading ? 'Memproses...' : 'Kirim via WhatsApp'}
                </Button>
              </Group>
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* Modal Pilihan WhatsApp */}
      <Modal
        opened={whatsappModalOpened}
        onClose={() => setWhatsappModalOpened(false)}
        title={
          <Group gap="sm">
            <IconBrandWhatsapp size={24} color="#25D366" />
            <Text fw={600}>Pilih Kontak WhatsApp</Text>
          </Group>
        }
        size="md"
        centered
      >
        <Stack gap="lg">
          <Text size="sm" c="dimmed">
            Pilih kontak WhatsApp yang ingin Anda hubungi untuk mengirim permintaan penawaran:
          </Text>

          {loadingWhatsapp ? (
            <Group justify="center" py="xl">
              <Loader size="sm" />
              <Text>Memuat kontak WhatsApp...</Text>
            </Group>
          ) : (
            <Select
              label="Kontak WhatsApp"
              placeholder="Pilih kontak WhatsApp"
              value={selectedWhatsapp}
              onChange={setSelectedWhatsapp}
              data={whatsappContacts}
              leftSection={<IconPhone size={16} />}
              nothingFoundMessage="Tidak ada kontak WhatsApp tersedia"
              required
            />
          )}

          {selectedWhatsapp && (
            <Box p="md" style={{ 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <Text size="sm" fw={500}>
                Kontak yang dipilih:
              </Text>
              <Text size="sm" c="dimmed">
                {whatsappContacts.find(w => w.value === selectedWhatsapp)?.label}
              </Text>
              <Text size="xs" c="blue" mt={4}>
                {formatWhatsappNumber(selectedWhatsapp)}
              </Text>
            </Box>
          )}

          <Group justify="flex-end" mt="md">
            <Button 
              variant="light" 
              onClick={() => setWhatsappModalOpened(false)}
            >
              Batal
            </Button>
            <Button
              onClick={handleSendToWhatsApp}
              disabled={!selectedWhatsapp || loadingWhatsapp}
              leftSection={<IconBrandWhatsapp size={16} />}
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                border: 'none'
              }}
            >
              Buka WhatsApp
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}