"use client"; // Tambahkan jika menggunakan Next.js App Router

import React, { useEffect } from 'react';
import { Container, Box, Title, Text, Timeline, ThemeIcon, Stack } from '@mantine/core';
import styles from './HowToBuyPage.module.css'; // Buat file CSS baru
import {
  IconSearch,
  IconShoppingCartPlus,
  IconClipboardCheck,
  IconUserPlus,
  IconDeviceMobileMessage,
  IconBrandWhatsapp,
  IconUsers,
  IconWallet,
  IconTruckDelivery
} from '@tabler/icons-react';

// Ganti dengan gambar banner Anda
const BANNER_IMAGE = '/termsbanner.jpg'; // Menggunakan gambar yang sama, pastikan ada di public/

// Definisikan langkah-langkah
const tutorialSteps = [
  {
    title: "1. Search Product",
    description: "Cari dan temukan produk yang Anda butuhkan melalui search bar atau halaman produk.",
    icon: IconSearch
  },
  {
    title: "2. Masukan Keranjang",
    description: "Tentukan jumlah produk yang Anda inginkan dan klik tombol 'Masukan Keranjang'.",
    icon: IconShoppingCartPlus
  },
  {
    title: "3. Checkout",
    description: "Pergi ke halaman keranjang Anda (ikon cart di header), periksa kembali pesanan Anda, dan lanjutkan ke checkout.",
    icon: IconClipboardCheck
  },
  {
    title: "4. Buat Akun dan Isi Informasi Lengkap",
    description: "Daftarkan akun baru atau login. Pastikan Anda mengisi informasi pengiriman dan kontak dengan lengkap dan benar.",
    icon: IconUserPlus
  },
  {
    title: "5. Verifikasi Akun (OTP)",
    description: "Verifikasi akun Anda menggunakan kode OTP yang dikirimkan ke nomor handphone terdaftar Anda.",
    icon: IconDeviceMobileMessage
  },
  {
    title: "6. Pesanan di-direct ke WhatsApp",
    description: "Setelah checkout, pesanan Anda akan secara otomatis dibuatkan template-nya dan diarahkan ke WhatsApp Admin kami.",
    icon: IconBrandWhatsapp
  },
  {
    title: "7. Konfirmasi Stok dan Pengiriman",
    description: "Tim HMS akan menanggapi pesan WhatsApp Anda untuk mengkonfirmasi ketersediaan stok, total biaya, dan jadwal pengiriman.",
    icon: IconUsers
  },
  {
    title: "8. Melakukan Pembayaran",
    description: "Lakukan pembayaran sesuai instruksi dan total biaya yang diberikan oleh tim kami melalui WhatsApp.",
    icon: IconWallet
  },
  {
    title: "9. Menunggu Pengiriman",
    description: "Setelah pembayaran dikonfirmasi, pesanan Anda akan segera kami proses dan kirimkan ke alamat Anda.",
    icon: IconTruckDelivery
  }
];

export default function HowToBuyPage() {
  useEffect(() => {
    // Scroll to top saat komponen di-mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box>
      {/* Section A: Full Width Banner */}
      <Box 
        className={styles.bannerSection}
        style={{ backgroundImage: `url(${BANNER_IMAGE})` }}
      >
        <div className={styles.bannerOverlay}></div>
        <Container size="lg" className={styles.bannerContent}>
          <Title order={1} className={styles.bannerTitle}>
            Tutorial Pembelian
          </Title>
        </Container>
      </Box>

      {/* Section B: Content */}
      <Container size="lg" py="xl" className={styles.contentSection}>
        <Stack gap="xl">
          <Title order={2} ta="center" className={styles.contentTitle}>
            Langkah-Langkah Pemesanan
          </Title>

          {/* Timeline untuk langkah-langkah */}
          <Box maw={800} mx="auto"> {/* Batasi lebar timeline agar rapi */}
            <Timeline active={9} bulletSize={32} lineWidth={3} color="blue">
              {tutorialSteps.map((step, index) => (
                <Timeline.Item
                  key={index}
                  bullet={
                    <ThemeIcon size={32} radius="xl" color="blue" variant="light">
                      <step.icon size={18} />
                    </ThemeIcon>
                  }
                  title={step.title}
                  className={styles.timelineItem}
                >
                  <Text c="dimmed" size="sm" mt={4}>
                    {step.description}
                  </Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}