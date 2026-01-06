import React from 'react';
import { Box, Title, Divider, List, Text, Stack, Group, Button, Card } from '@mantine/core'; 
import { Link } from 'react-router-dom'; 
import { IconCategory, IconTag, IconWeight, IconRulerMeasure, IconInfoCircle, IconFileDescription } from '@tabler/icons-react';
import styles from './ProductDetailSectionB.module.css';

export default function ProductDetailSectionB({ product }) {
  const mainDescription = product?.product_description || product?.content || product?.description;

  const additionalInfo = [
    "Harap tanyakan terlebih dahulu mengenai ongkos pengiriman, waktu pengiriman, dan ketersediaan stock barang sebelum bertransaksi.",
    "Cek kembali ukuran yang akan di pesan, karena barang yang sudah di pesan tidak dapat di retur.",
    "Penerbitan faktur PPN, info NPWP, dll hub. admin.",
    "Untuk ukuran dan price list Besi Assental S45C lainnya bisa langsung chat admin atau hubungi whatsapp official Hutama Maju Sukses.",
    "Menyediakan layanan/jasa pengiriman ke Jabodetabek.",
    "Kami juga melayani penjualan partai besar, pengiriman luar kota dan partai besar.",
    "Untuk pengiriman menggunakan armada perusahaan (engkel/double).",
    "Untuk informasi harga partai dan pengiriman luar kota/antar pulau, silahkan hubungi admin."
  ];

  // Fungsi untuk mengkapitalisasi setiap kata
  const capitalizeWords = (str) => {
    if (!str) return '';
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <Box mt="xl">
      {/* SEMUA DETAIL DAN INFORMASI DIGABUNG DALAM SATU CARD */}
      <Card withBorder radius="md" p="xl" className={styles.combinedCard}>
        {/* Detail Produk Section - SPESIFIKASI DIGABUNG DI SINI */}
        <Box mb="xl">
          {/* Header dengan Icon dan Garis Putus-Putus */}
          <Box className={styles.sectionHeader}>
            <Group gap="sm" className={styles.titleGroup}>
              <IconFileDescription size={24} className={styles.titleIcon} />
              <Title order={3} className={styles.sectionTitle}>
                Detail Produk
              </Title>
            </Group>
            <div className={styles.dashedLine}></div>
          </Box>
          
          {mainDescription && (
            <div 
              className={styles.productContentHtml} 
              dangerouslySetInnerHTML={{ __html: mainDescription }} 
            />
          )}

          {/* Spesifikasi Produk - TANPA LABEL TERPISAH, TANPA BOX */}
          <Stack gap="xs" mt="lg" className={styles.specList}>
            {product.subCategory?.category?.name && (
              <Group gap="sm" align="center" className={styles.specItem}>
                <IconCategory size={16} className={styles.specIcon} />
                <Text size="sm" fw={500} className={styles.specLabel}>Kategori</Text>
                <Text size="sm" c="dimmed" className={styles.specValue}>: {capitalizeWords(product.subCategory.category.name)}</Text>
              </Group>
            )}
            {product.subCategory?.name && (
              <Group gap="sm" align="center" className={styles.specItem}>
                <IconTag size={16} className={styles.specIcon} />
                <Text size="sm" fw={500} className={styles.specLabel}>Subkategori</Text>
                <Text size="sm" c="dimmed" className={styles.specValue}>: {capitalizeWords(product.subCategory.name)}</Text>
              </Group>
            )}
            {product.product_weight && (
              <Group gap="sm" align="center" className={styles.specItem}>
                <IconWeight size={16} className={styles.specIcon} />
                <Text size="sm" fw={500} className={styles.specLabel}>Berat</Text>
                <Text size="sm" c="dimmed" className={styles.specValue}>: {product.product_weight} kg</Text>
              </Group>
            )}
            {product.product_size && (
              <Group gap="sm" align="center" className={styles.specItem}>
                <IconRulerMeasure size={16} className={styles.specIcon} />
                <Text size="sm" fw={500} className={styles.specLabel}>Ukuran</Text>
                <Text size="sm" c="dimmed" className={styles.specValue}>: {product.product_size}</Text>
              </Group>
            )}
          </Stack>
        </Box>

        {/* Informasi Tambahan Section - TANPA BOX */}
        <Box>
          {/* Header dengan Icon dan Garis Putus-Putus */}
          <Box className={styles.sectionHeader}>
            <Group gap="sm" className={styles.titleGroup}>
              <IconInfoCircle size={24} className={styles.titleIcon} />
              <Title order={3} className={styles.sectionTitle}>
                Informasi Tambahan
              </Title>
            </Group>
            <div className={styles.dashedLine}></div>
          </Box>
          
          <List
            spacing="sm"
            size="sm"
            center
            type="ordered"
            className={styles.infoList}
          >
            {additionalInfo.map((info, index) => (
              <List.Item key={index} className={styles.listItem}>
                <Text component="span" size="sm" c="dimmed" className={styles.infoText}>{info}</Text>
              </List.Item>
            ))}
          </List>

          {/* Tombol Syarat & Ketentuan dan Tutorial Pembelian - TEXT ONLY */}
          <Group mt="lg" gap="md" className={styles.buttonGroup}>
            <Button
              component={Link}
              to="/terms-conditions"
              variant="subtle"
              color="blue"
              radius="md"
              className={styles.textButton}
            >
              Syarat dan Ketentuan
            </Button>
            <Button
              component={Link}
              to="/how-to-buy"
              variant="subtle"
              color="blue"
              radius="md"
              className={styles.textButton}
            >
              Tutorial Pembelian
            </Button>
          </Group>
        </Box>
      </Card>
    </Box>
  );
}