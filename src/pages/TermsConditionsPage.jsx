"use client"; // Tambahkan jika menggunakan Next.js App Router

import React, { useEffect } from 'react';
import { Container, Box, Title, Text, Anchor, Stack, List } from '@mantine/core';
import { Link } from 'react-router-dom';
import styles from './TermsConditionsPage.module.css';

// 3. Menggunakan gambar termsbanner.jpg
const BANNER_IMAGE = '/termsbanner.jpg'; // Pastikan gambar ini ada di folder public/

export default function TermsConditionsPage() {
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
            Syarat & Ketentuan
          </Title>
        </Container>
      </Box>

      {/* Section B: Content */}
      <Container size="lg" py="xl" className={styles.contentSection}>
        <Text size="sm" mb="md">Selamat datang di www.hutamamajusukses.com.</Text>
        <Text size="sm" mb="md">
          Syarat & ketentuan yang ditetapkan di bawah ini mengatur pemakaian jasa yang ditawarkan oleh{' '}
          <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> terkait penggunaan situs{' '}
          <Text component="span" fw={700}>www.hutamamajusukses.com</Text>. Pembeli disarankan membaca dengan seksama karena dapat berdampak kepada hak dan kewajiban Pengguna di bawah hukum.
        </Text>
        <Text size="sm" mb="lg">
          Dengan mendaftar dan/atau menggunakan situs{' '}
          <Text component="span" fw={700}>www.hutamamajusukses.com</Text>, maka, pengguna dianggap telah membaca, mengerti, memahami dan menyetujui semua isi dalam Syarat & ketentuan. Syarat & ketentuan ini, merupakan bentuk kesepakatan yang dituangkan dalam sebuah perjanjian yang sah antara Pengguna dengan{' '}
          <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>. Jika pengguna tidak menyetujui salah satu, sebagian, atau seluruh isi Syarat & ketentuan, maka pengguna tidak diperkenankan menggunakan layanan di{' '}
          <Text component="span" fw={700}>www.hutamamajusukses.com</Text>.
        </Text>

        {/* Daftar Isi / Table of Contents */}
        <Box className={styles.tableOfContents} mb="xl">
          <Text size="md" fw={700} mb="sm">Daftar Isi:</Text>
          <List spacing="xs" size="sm" style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <List.Item><Anchor href="#definisi" component="a" c="blue">A. Definisi</Anchor></List.Item>
            <List.Item><Anchor href="#akun-password-keamanan" component="a" c="blue">B. Akun, Saldo Refund, Password dan Keamanan</Anchor></List.Item>
            <List.Item><Anchor href="#transaksi-pembelian" component="a" c="blue">C. Transaksi Pembelian</Anchor></List.Item>
            <List.Item><Anchor href="#transaksi-penjualan" component="a" c="blue">D. Transaksi Penjualan</Anchor></List.Item>
            <List.Item><Anchor href="#penataan-etalase" component="a" c="blue">E. Penataan Etalase</Anchor></List.Item>
            <List.Item><Anchor href="#harga" component="a" c="blue">F. Harga</Anchor></List.Item>
            <List.Item><Anchor href="#tarif-pengiriman" component="a" c="blue">G. Tarif Pengiriman</Anchor></List.Item>
            <List.Item><Anchor href="#kartu-kredit" component="a" c="blue">H. Kartu Kredit</Anchor></List.Item>
            <List.Item><Anchor href="#pengiriman-barang" component="a" c="blue">I. Pengiriman Barang</Anchor></List.Item>
            <List.Item><Anchor href="#penolakan-jaminan" component="a" c="blue">J. Penolakan Jaminan dan Batasan Tanggung Jawab</Anchor></List.Item>
            <List.Item><Anchor href="#ganti-rugi" component="a" c="blue">K. Ganti Rugi</Anchor></List.Item>
            <List.Item><Anchor href="#pilihan-hukum" component="a" c="blue">L. Pemilihan Hukum</Anchor></List.Item>
            <List.Item><Anchor href="#pembaharuan" component="a" c="blue">M. Pembaharuan</Anchor></List.Item>
          </List>
        </Box>

        {/* Detail Konten */}
        <Stack gap="xl">
          <Box id="definisi">
            <Title order={3} mb="sm">A. Definisi</Title>
            <List type="ordered" spacing="sm" size="sm">
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> adalah suatu perseroan terbatas yang menjalankan kegiatan usaha dibidang bahan material dan penyedia bahan material kontruksi memiliki web portal{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text>, yakni situs yang menyajikan informasi perusahaan serta sebagai media pencarian Barang material yang dijual oleh{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>.
              </List.Item>
              <List.Item>
                Situs <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> adalah{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text>.
              </List.Item>
              <List.Item>
                Syarat & ketentuan adalah perjanjian antara Pembeli dan{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> yang berisikan seperangkat peraturan yang mengatur hak, kewajiban, tanggung jawab pengguna dan{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>, serta tata cara penggunaan sistem layanan.
              </List.Item>
              <List.Item>
                Pengguna adalah pihak yang menggunakan layanan{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>, termasuk namun tidak terbatas pada pembeli, penjual maupun pihak lain yang sekedar berkunjung ke Situs{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text>.
              </List.Item>
              <List.Item>
                Pembeli adalah Pengguna terdaftar yang melakukan permintaan atas Barang yang dijual di Situs{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text>.
              </List.Item>
              <List.Item>
                Barang adalah benda yang berwujud / memiliki fisik Barang yang dapat diantar / memenuhi kriteria pengiriman oleh perusahaan jasa pengiriman Barang.
              </List.Item>
              <List.Item>
                Feed adalah fitur pada Situs{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text> yang menampilkan konten terkait Barang tertentu.
              </List.Item>
              <List.Item>
                Rekening Resmi{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> adalah rekening bersama yang disepakati oleh{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> dan para pengguna untuk proses transaksi jual beli di Situs{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text>.
              </List.Item>
            </List>
          </Box>

          <Box id="akun-password-keamanan">
            <Title order={3} mb="sm">B. Akun, Saldo Refund, Password dan Keamanan</Title>
            <List type="ordered" spacing="sm" size="sm">
              <List.Item>
                Pengguna dengan ini menyatakan bahwa pengguna adalah orang yang cakap dan mampu untuk mengikatkan dirinya dalam sebuah perjanjian yang sah menurut hukum.
              </List.Item>
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> tidak memungut biaya pendaftaran kepada Pengguna.
              </List.Item>
              <List.Item>
                Pengguna memahami bahwa 1 (satu) nomor telepon hanya dapat digunakan untuk mendaftar 1 (satu) akun Pengguna{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text>, kecuali bagi Pengguna yang telah memiliki beberapa akun dengan 1 (satu) nomor telepon sebelumnya.
              </List.Item>
              <List.Item>Pengguna yang telah mendaftar berhak bertindak sebagai: - Pembeli</List.Item>
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> memiliki kewenangan untuk menutup akun Pengguna baik sementara maupun permanen apabila didapati adanya tindakan kecurangan dalam bertransaksi, pelanggaran terhadap Syarat dan Ketentuan{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text>. Pengguna menyetujui bahwa{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> berhak melakukan tindakan lain yang diperlukan terkait hal tersebut.
              </List.Item>
              <List.Item>
                Pengguna dilarang untuk menciptakan dan/atau menggunakan perangkat, software, fitur dan/atau alat lainnya yang bertujuan untuk melakukan manipulasi pada sistem{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text>, termasuk namun tidak terbatas pada : (i) manipulasi data Toko; (ii) kegiatan perambanan (crawling/scraping); (iii) kegiatan otomatisasi dalam transaksi.
              </List.Item>
              <List.Item>
                Saldo Refund berasal dari pengembalian dana transaksi (refund) pembelian Barang, akan langsung ditransfer oleh{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> sesuai dengan rekening bank transfer akun Pengguna.
              </List.Item>
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> memiliki kewenangan untuk melakukan pembekuan Saldo Refund Pengguna apabila ditemukan / diduga adanya tindak kecurangan dalam bertransaksi dan/atau pelanggaran terhadap syarat dan ketentuan{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>.
              </List.Item>
              <List.Item>
                Pengguna bertanggung jawab secara pribadi untuk menjaga kerahasiaan akun dan password untuk semua aktivitas yang terjadi dalam akun Pengguna.
              </List.Item>
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> tidak akan meminta username, password maupun kode SMS verifikasi atau kode OTP milik akun Pengguna untuk alasan apapun, oleh karena itu{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> menghimbau Pengguna agar tidak memberikan data tersebut maupun data penting lainnya kepada pihak yang mengatasnamakan{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> atau pihak lain yang tidak dapat dijamin keamanannya.
              </List.Item>
              <List.Item>
                Pengguna setuju untuk memastikan bahwa Pengguna keluar dari akun di akhir setiap sesi dan memberitahu{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> jika ada penggunaan tanpa izin atas sandi atau akun Pengguna.
              </List.Item>
              <List.Item>
                Pengguna dengan ini menyatakan bahwa{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> tidak bertanggung jawab atas kerugian ataupun kendala yang timbul atas penyalahgunaan akun Pengguna yang diakibatkan oleh kelalaian Pengguna, termasuk namun tidak terbatas pada meminjamkan atau memberikan akses akun kepada pihak lain, mengakses link atau tautan yang diberikan oleh pihak lain, memberikan atau memperlihatkan kode verifikasi (OTP), password atau email kepada pihak lain, maupun kelalaian Pengguna lainnya yang mengakibatkan kerugian ataupun kendala pada akun Pengguna.
              </List.Item>
            </List>
          </Box>

          <Box id="transaksi-pembelian">
            <Title order={3} mb="sm">C. Transaksi Pembelian</Title>
            <List type="ordered" spacing="sm" size="sm">
              <List.Item>
                Pembeli wajib bertransaksi melalui prosedur transaksi yang telah ditetapkan oleh{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text>. Pembeli melakukan pembayaran dengan menggunakan metode pembayaran yang sebelumnya telah dipilih oleh Pembeli, dan kemudian transaksi jual beli pada system{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> telah selesai.
              </List.Item>
              <List.Item>Saat melakukan pembelian Barang, Pembeli menyetujui bahwa:</List.Item>
              <List.Item>
                Pembeli bertanggung jawab untuk membaca, memahami, dan menyetujui informasi/deskripsi keseluruhan Barang (termasuk didalamnya namun tidak terbatas pada warna, kualitas, fungsi, dan lainnya) sebelum membuat komitmen untuk membeli.
              </List.Item>
              <List.Item>
                Pembeli mengakui bahwa warna sebenarnya dari produk sebagaimana terlihat di situs www.hutamamajusukses.com tergantung pada monitor komputer Pembeli.{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> telah melakukan upaya terbaik untuk memastikan warna dalam foto-foto yang ditampilkan di Situs{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text> muncul seakurat mungkin, tetapi tidak dapat menjamin bahwa penampilan warna pada Situs{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text> akan akurat.
              </List.Item>
              <List.Item>
                Pengguna masuk ke dalam kontrak yang mengikat secara hukum untuk membeli Barang ketika Pengguna membeli suatu barang.
              </List.Item>
              <List.Item>
                Pembeli memahami dan menyetujui bahwa ketersediaan stok Barang merupakan tanggung jawab{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> yang menawarkan Barang tersebut. Terkait ketersediaan stok Barang dapat berubah sewaktu-waktu, sehingga dalam keadaan stok Barang kosong, maka{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> akan menolak order, dan pembayaran atas barang yang bersangkutan dikembalikan kepada Pembeli.
              </List.Item>
              <List.Item>
                PT Hutama Maju Sukses memiliki kewenangan sepenuhnya untuk menolak pembayaran tanpa pemberitahuan terlebih dahulu.
              </List.Item>
              <List.Item>
                Pembayaran oleh Pembeli wajib dilakukan segera (selambat-lambatnya dalam batas waktu 2 hari) setelah Pembeli melakukan check-out. Jika dalam batas waktu tersebut pembayaran atau konfirmasi pembayaran belum dilakukan oleh pembeli,{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> memiliki kewenangan untuk membatalkan transaksi dimaksud. Pengguna tidak berhak mengajukan klaim atau tuntutan atas pembatalan transaksi tersebut.
              </List.Item>
              <List.Item>
                Pembeli menyetujui untuk tidak memberitahukan atau menyerahkan bukti pembayaran dan/atau data pembayaran kepada pihak lain selain{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>. Dalam hal terjadi kerugian akibat pemberitahuan atau penyerahan bukti pembayaran dan/atau data pembayaran oleh Pembeli kepada pihak lain, maka hal tersebut akan menjadi tanggung jawab Pembeli.
              </List.Item>
              <List.Item>
                Pembeli wajib melakukan konfirmasi penerimaan Barang, setelah menerima kiriman Barang yang dibeli.{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> memberikan batas waktu 2 (dua) hari setelah pengiriman berstatus "terkirim" pada sistem{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>, untuk Pembeli melakukan konfirmasi penerimaan Barang. Jika dalam batas waktu tersebut tidak ada konfirmasi atau klaim dari pihak Pembeli, maka dengan demikian Pembeli menyatakan menyetujui dilakukannya konfirmasi penerimaan Barang secara otomatis oleh sistem{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text>.
              </List.Item>
              <List.Item>
                Setelah adanya konfirmasi penerimaan Barang atau konfirmasi penerimaan Barang otomatis, maka dana pihak Pembeli yang dikirimkan ke Rekening resmi{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> (transaksi dianggap selesai).
              </List.Item>
              <List.Item>
                Pembeli memahami dan menyetujui bahwa setiap masalah pengiriman Barang yang disebabkan keterlambatan pembayaran adalah merupakan tanggung jawab dari Pembeli.
              </List.Item>
              <List.Item>
                Pembeli memahami dan menyetujui bahwa masalah keterlambatan proses pembayaran dan biaya tambahan yang disebabkan oleh perbedaan bank yang Pembeli pergunakan dengan bank Rekening resmi{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> adalah tanggung jawab Pembeli secara pribadi.
              </List.Item>
              <List.Item>
                Pengembalian dana dari{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> kepada Pembeli hanya dapat dilakukan jika dalam keadaan-keadaan tertentu berikut ini:
                <List type="unordered" spacing="xs" size="sm" mt="xs">
                  <List.Item>Kelebihan pembayaran dari Pembeli atas harga Barang</List.Item>
                  <List.Item>Masalah pengiriman Barang telah teridentifikasi secara jelas yang mengakibatkan pesanan Barang tidak sampai.</List.Item>
                </List>
              </List.Item>
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> tidak bisa menyanggupi order karena kehabisan stok, perubahan ongkos kirim, maupun penyebab lainnya.
              </List.Item>
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> sudah menyanggupi pengiriman order Barang, tetapi setelah batas waktu yang ditentukan ternyata Penjual tidak mengirimkan Barang hingga batas waktu yang telah ditentukan.
              </List.Item>
              <List.Item>
                Apabila terjadi proses pengembalian dana, maka pengembalian akan dilakukan melalui rekening bank transfer akun Pengguna. Jika Pengguna menggunakan pilihan metode pembayaran kartu kredit maka pengembalian dana akan merujuk pada ketentuan bagian terkait Kartu Kredit.
              </List.Item>
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> berwenang mengambil keputusan atas permasalahan-permasalahan transaksi yang belum terselesaikan akibat tidak adanya kesepakatan penyelesaian, dengan melihat bukti-bukti yang ada. Keputusan{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> adalah keputusan akhir yang tidak dapat diganggu gugat dan mengikat pihak Pembeli untuk mematuhinya.
              </List.Item>
              <List.Item>
                Apabila Pembeli memilih menggunakan metode pembayaran transfer bank, maka total pembayaran akan ditambahkan kode unik untuk mempermudah proses verifikasi.
              </List.Item>
              <List.Item>
                Pembeli wajib melakukan pembayaran dengan nominal yang sesuai dengan jumlah tagihan beserta kode unik (apabila ada).{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> tidak bertanggungjawab atas kerugian yang dialami Pembeli apabila melakukan pembayaran yang tidak sesuai dengan jumlah tagihan yang tertera pada halaman pembayaran.{' '}
                {/* Typo '21.' dihapus */}
                <Text component="span" fw={700}>Pembeli</Text> memahami sepenuhnya dan menyetujui bahwa invoice yang diterbitkan adalah atas nama{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>.
              </List.Item>
            </List>
          </Box>

          <Box id="transaksi-penjualan">
            <Title order={3} mb="sm">D. Transaksi Penjualan</Title>
            <List type="ordered" spacing="sm" size="sm">
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> dilarang memanipulasi harga Barang dengan tujuan apapun.
              </List.Item>
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> dilarang melakukan penawaran / berdagang Barang terlarang sesuai dengan yang telah ditetapkan pada ketentuan jenis Barang.
              </List.Item>
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> wajib memberikan foto dan informasi produk dengan lengkap dan jelas sesuai dengan kondisi dan kualitas produk yang dijualnya.
              </List.Item>
              <List.Item>
                Dalam menggunakan Fasilitas "Judul Produk", "Foto Produk", "Catatan" dan "Deskripsi Produk", dilarang membuat peraturan bersifat klausula baku yang tidak memenuhi peraturan perundang-undangan yang berlaku di Indonesia, termasuk namun tidak terbatas pada (i) tidak menerima komplain, (ii) tidak menerima retur (penukaran barang), (iii) tidak menerima refund (pengembalian dana), (iv) barang tidak bergaransi, (v) pengalihan tanggung jawab (termasuk tidak terbatas pada penanggungan ongkos kirim), (vi) penyusutan nilai harga dan (vii) pengiriman barang acak secara sepihak.
              </List.Item>
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> wajib memberikan balasan untuk menerima atau menolak pesanan Barang pihak Pembeli dalam batas waktu 2 hari terhitung sejak adanya notifikasi pesanan Barang dari{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>. Jika dalam batas waktu tersebut tidak ada balasan dari maka secara otomatis pesanan akan dibatalkan.
              </List.Item>
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> diharapkan untuk memasukkan nomor resi pengiriman Barang atau AWB (air way bill) yang valid, yaitu:
                <List type="unordered" spacing="xs" size="sm" mt="xs">
                  <List.Item>Tanggal pembuatan resi pengiriman Barang tidak lebih dulu dari tanggal transaksi pembelian Barang;</List.Item>
                  <List.Item>Nomor resi pengiriman Barang harus dapat dilacak atau ditemukan pada web situs pelacakan atau sistem jasa ekspedisi rekanan PT Hutama Maju Sukses; dan/atau</List.Item>
                  <List.Item>Merupakan resi pengiriman Barang yang memang diperuntukkan untuk pembeli yang akan menerima paket tersebut (detail pengiriman harus sama).</List.Item>
                </List>
              </List.Item>
              <List.Item>
                Apabila{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> memasukkan nomor resi pengiriman Barang yang invalid atau tidak dapat terlacak, Penjual wajib memasukkan nomor resi pengiriman Barang yang valid dalam batas waktu 1 x 24 jam (tidak termasuk hari Sabtu/Minggu/libur Nasional) terhitung sejak adanya notifikasi nomor resi invalid atau tidak terlacak yang diberikan oleh PT Hutama Maju Sukses
              </List.Item>
              <List.Item>
                Pembeli memahami dan menyetujui bahwa kurir pengiriman tidak dapat diubah setelah melakukan konfirmasi pengiriman.
              </List.Item>
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> berwenang untuk membatalkan transaksi dan/atau menahan dana transaksi dalam hal:
                <List type="unordered" spacing="xs" size="sm" mt="xs">
                  <List.Item>(i) nomor resi kurir pengiriman Barang yang diberikan tidak sesuai dan/atau diduga tidak sesuai dengan transaksi yang terjadi di Situs{' '}
                    <Text component="span" fw={700}>www.hutamamajusukses.com</Text>;</List.Item>
                  <List.Item>(ii) Pengiriman Barang melalui jasa kurir/logistik selain dari yang disediakan dan terhubung dengan Situs{' '}
                    <Text component="span" fw={700}>www.hutamamajusukses.com</Text>;</List.Item>
                  <List.Item>(iii) jika nama produk dan deskripsi produk tidak sesuai/tidak jelas dengan produk yang dikirim;</List.Item>
                  <List.Item>(iv) jika ditemukan adanya manipulasi transaksi; dan/atau</List.Item>
                  <List.Item>(v) mencantumkan nomor resi pengiriman Barang yang telah digunakan (internal dropshipper)</List.Item>
                </List>
              </List.Item>
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> berwenang mengambil keputusan atas permasalahan-permasalahan transaksi yang belum terselesaikan akibat tidak adanya kesepakatan penyelesaian, baik antara Pembeli, dengan melihat bukti-bukti yang ada. Keputusan{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> adalah keputusan akhir yang tidak dapat diganggu gugat dan mengikat semua pihak untuk mematuhinya.
              </List.Item>
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> berwenang memotong kelebihan tarif pengiriman dari dana pembayaran pembeli dan mengembalikan selisih kelebihan tarif pengiriman kepada pembeli.
              </List.Item>
            </List>
          </Box>

          <Box id="penataan-etalase">
            <Title order={3} mb="sm">E. Penataan Etalase</Title>
            <List type="ordered" spacing="sm" size="sm">
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> dilarang memberikan data kontak pribadi dengan maksud untuk melakukan transaksi secara langsung kepada Pembeli / calon Pembeli.
              </List.Item>
              <List.Item>
                Penamaan Barang dan informasi produk harus dilakukan sesuai dengan informasi detail, spesifikasi, dan kondisi Barang, dengan demikian{' '}
                <Text component="span" fw={700}>PT Hutama Mau Sukses</Text> tidak diperkenankan untuk mencantumkan nama, deskripsi, gambar dan/atau kata yang tidak berkaitan dan/atau tidak sesuai dengan Barang tersebut.
              </List.Item>
              <List.Item>
                Penamaan Barang dan informasi produk harus sesuai dengan kondisi Barang yang ditampilkan dan{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> tidak diperkenankan mencantumkan nama dan informasi yang tidak sesuai dengan kondisi Barang.
              </List.Item>
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> wajib memisahkan tiap-tiap Barang yang memiliki ukuran dan harga yang berbeda.
              </List.Item>
            </List>
          </Box>

          <Box id="harga">
            <Title order={3} mb="sm">F. Harga</Title>
            <List type="ordered" spacing="sm" size="sm">
              <List.Item>
                Harga Barang yang terdapat dalam situs{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text> adalah harga yang ditetapkan. PT Hutama Maju Sukses dilarang memanipulasi harga barang dengan cara apapun.
              </List.Item>
              <List.Item>
                Pembeli memahami dan menyetujui bahwa kesalahan keterangan harga dan informasi lainnya yang disebabkan tidak terbaharuinya halaman situs{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text> dikarenakan browser/ISP yang dipakai Pembeli adalah tanggung jawab Pembeli.
              </List.Item>
              <List.Item>
                Dengan melakukan pemesanan melalui{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text>, pembeli menyetujui untuk membayar total biaya yang harus dibayarkan sebagaimana tertera dalam halaman pembayaran, yang terdiri dari harga barang, ongkos kirim, dan biaya-biaya lain yang mungkin timbul dan akan diuraikan secara tegas dalam halaman pembayaran.
              </List.Item>
              <List.Item>
                Situs <Text component="span" fw={700}>www.hutamamajusukses.com</Text> untuk saat ini hanya melayani transaksi jual beli Barang dalam mata uang Rupiah.
              </List.Item>
            </List>
          </Box>

          <Box id="tarif-pengiriman">
            <Title order={3} mb="sm">G. Tarif Pengiriman</Title>
            <List type="ordered" spacing="sm" size="sm">
              <List.Item>
                Pembeli memahami dan mengerti bahwa{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> telah melakukan usaha sebaik mungkin dalam memberikan informasi tarif pengiriman kepada Pembeli berdasarkan lokasi secara akurat, namun PT Hutama Maju Sukses tidak dapat menjamin keakuratan data tersebut dengan yang ada pada cabang setempat.
              </List.Item>
              <List.Item>
                Karena itu{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> menyarankan untuk mencatat terlebih dahulu tarif yang diberikan{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>, agar dapat dibandingkan dengan tarif yang dibebankan di cabang setempat. Apabila mendapati perbedaan, mohon sekiranya untuk menginformasikan kepada kami melalui menu contact us dengan memberikan data harga yang didapat beserta kota asal dan tujuan, agar dapat kami telusuri lebih lanjut.
              </List.Item>
            </List>
          </Box>

          <Box id="kartu-kredit">
            <Title order={3} mb="sm">H. Kartu Kredit</Title>
            <List type="ordered" spacing="sm" size="sm">
              <List.Item>
                Pengguna dapat memilih untuk mempergunakan pilihan metode pembayaran menggunakan kartu kredit untuk transaksi pembelian Barang dan produk digital melalui Situs{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text>
              </List.Item>
              <List.Item>Transaksi pembelian barang dengan menggunakan kartu kredit dapat dilakukan untuk transaksi pembelian.</List.Item>
              <List.Item>
                Transaksi pembelian barang dengan menggunakan kartu kredit wajib mengikuti syarat dan ketentuan yang diatur oleh{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> dan mempergunakan kurir/logistik yang disediakan dan terhubung dengan Situs{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text>
              </List.Item>
              <List.Item>
                Apabila terdapat transaksi pembelian barang dengan menggunakan kartu kredit yang melanggar ketentuan hukum dan/atau syarat ketentuan, maka{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> berwenang untuk:
                <List type="unordered" spacing="xs" size="sm" mt="xs">
                  <List.Item>a. menahan dana transaksi selama diperlukan oleh{' '}
                    <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>, pihak Bank, maupun mitra payment gateway terkait untuk melakukan investigasi yang diperlukan, sekurang-kurangnya 14 (empat belas) hari;</List.Item>
                  <List.Item>b. melakukan pemotongan dana sebesar 15% (lima belas persen) dari nilai transaksi, serta menarik kembali nilai subsidi sehubungan penggunaan kartu kredit.</List.Item>
                </List>
              </List.Item>
              <List.Item>
                Apabila transaksi pembelian tidak berhasil dan/atau dibatalkan, maka tagihan atas transaksi tersebut akan dibatalkan dan dana transaksi akan dikembalikan ke limit kartu kredit pembeli di tagihan berikutnya. Ketentuan pada ayat ini tidak berlaku untuk transaksi pembelian barang dengan menggunakan kartu kredit yang melanggar ketentuan hukum dan/atau syarat ketentuan{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>.
              </List.Item>
              <List.Item>
                Transaksi pembelian yang menggunakan metode pembayaran kartu kredit akan dikenakan biaya layanan sebesar 1,5% dari total biaya yang harus dibayarkan. Biaya layanan ini diberlakukan untuk tujuan pemeliharaan sistem dan peningkatan layanan dalam berbelanja.
              </List.Item>
              <List.Item>
                Transaksi pembelian yang menggunakan metode pembayaran cicilan kartu kredit akan dikenakan biaya layanan yang diberlakukan untuk tujuan pemeliharaan sistem dan peningkatan layanan dalam bertransaksi melalui{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text>, dengan rincian sebagai berikut:
                <List type="unordered" spacing="xs" size="sm" mt="xs">
                  <List.Item>i. Cicilan 3 (tiga) bulan sebesar 2.5% (dua koma lima persen)</List.Item>
                  <List.Item>ii. Cicilan 6 (enam) bulan sebesar 3.5% (tiga koma lima persen)</List.Item>
                  <List.Item>iii. Cicilan 12 (dua belas) bulan sebesar 6% (enam persen)</List.Item>
                  <List.Item>iv. Cicilan 18 (delapan belas) bulan sebesar 8% (delapan persen)</List.Item>
                  <List.Item>v. Cicilan 24 (dua puluh empat) bulan sebesar 10% (sepuluh persen)</List.Item>
                </List>
              </List.Item>
              <List.Item>
                Apabila seluruh transaksi dalam satu pembayaran yang menggunakan kartu kredit dibatalkan, maka biaya layanan tersebut akan dikembalikan ke limit kartu kredit Pengguna. Namun apabila hanya sebagian transaksi dalam satu pembayaran yang menggunakan kartu kredit dibatalkan, maka biaya layanan tersebut tidak akan ikut serta dikembalikan.
              </List.Item>
            </List>
          </Box>

          <Box id="pengiriman-barang">
            <Title order={3} mb="sm">I. Pengiriman Barang</Title>
            <List type="ordered" spacing="sm" size="sm">
              <List.Item>
                Pengiriman Barang dalam sistem{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text> wajib menggunakan jasa perusahaan{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> yang dipilih.
              </List.Item>
              <List.Item>
                Setiap ketentuan berkenaan dengan proses pengiriman Barang adalah wewenang sepenuhnya penyedia jasa layanan pengiriman Barang oleh{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>.
              </List.Item>
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> wajib memenuhi ketentuan yang ditetapkan oleh jasa layanan pengiriman barang tersebut dan bertanggung jawab atas setiap Barang yang dikirimkan.
              </List.Item>
              <List.Item>
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> memahami dan menyetujui bahwa setiap permasalahan yang terjadi pada saat proses pengiriman Barang oleh merupakan tanggung jawab penyedia jasa layanan pengiriman{' '}
                {/* --- PERBAIKAN TYPO fw={7D} --- */}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>.
              </List.Item>
              <List.Item>
                Dalam hal diperlukan untuk dilakukan proses pengembalian barang, diwajibkan untuk melakukan pengiriman barang langsung ke{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>.
              </List.Item>
              <List.Item>
                Dalam hal terjadi kendala dalam proses pengiriman berupa barang hilang, barang rusak, dan lain sebagainya, Pembeli dapat melaporkan ke pihak{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> paling lambat 3x24 jam sejak waktu pengiriman untuk dilakukan proses investigasi.
              </List.Item>
            </List>
          </Box>

          <Box id="penolakan-jaminan">
            <Title order={3} mb="sm">J. Penolakan Jaminan Dan Batasan Tanggung Jawab</Title>
            <Text size="sm" mb="md">
              <Text component="span" fw={700}>www.hutamamajusukses.com</Text> adalah portal web yang menyediakan layanan kepada Pembeli untuk dapat membeli barang di website{' '}
              <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>. Dengan demikian transaksi yang terjadi adalah transaksi antar Pembeli, sehingga Pembeli memahami bahwa batasan tanggung jawab{' '}
              <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> secara proporsional adalah sebagai penyedia barang portal web.{' '}
              <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> selalu berupaya untuk menjaga Layanan{' '}
              <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> yang aman, nyaman, dan berfungsi dengan baik, tapi kami tidak dapat menjamin operasi terus-menerus atau akses ke Layanan kami dapat selalu sempurna. Pengguna setuju bahwa Anda memanfaatkan Layanan{' '}
              <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> atas risiko Pengguna sendiri, dan layanan diberikan kepada Anda pada "SEBAGAIMANA ADANYA" dan "SEBAGAIMANA TERSEDIA". Sejauh diizinkan oleh hukum yang berlaku,{' '}
              <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> (termasuk Induk Perusahaan, direktur, dan karyawan) adalah tidak bertanggung jawab, dan Anda setuju untuk tidak menuntut{' '}
              <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> bertanggung jawab, atas segala kerusakan atau kerugian (termasuk namun tidak terbatas pada hilangnya uang, reputasi, keuntungan, atau kerugian tak berwujud lainnya) yang diakibatkan secara langsung atau tidak langsung dari :
            </Text>
            <List type="unordered" spacing="xs" size="sm" mb="md">
              <List.Item>Harga, Pengiriman atau petunjuk lain yang tersedia dalam layanan{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>.</List.Item>
              <List.Item>Keterlambatan atau gangguan dalam Layanan{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>.</List.Item>
              <List.Item>Kelalaian dan kerugian yang ditimbulkan.</List.Item>
              <List.Item>Pelanggaran Hak atas Kekayaan Intelektual.</List.Item>
              <List.Item>Pencemaran nama baik pihak lain.</List.Item>
              <List.Item>Setiap penyalahgunaan Barang yang sudah dibeli pihak Pembeli.</List.Item>
              <List.Item>Kerugian akibat pembayaran tidak resmi kepada pihak lain selain ke Rekening Resmi{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>, yang dengan cara apapun mengatas-namakan{' '}
                <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> ataupun kelalaian penulisan rekening dan/atau informasi lainnya dan/atau kelalaian pihak bank.</List.Item>
              <List.Item>Virus atau perangkat lunak berbahaya lainnya (bot, script, automation tool selain fitur Power Merchant, hacking tool) yang diperoleh dengan mengakses, atau menghubungkan ke layanan www.hutamamajusukses.com .</List.Item>
              <List.Item>Gangguan, bug, kesalahan atau ketidakakuratan apapun dalam Layanan{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text>.</List.Item>
              <List.Item>Kerusakan pada perangkat keras Anda dari penggunaan setiap Layanan{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text>.</List.Item>
              <List.Item>Isi, tindakan, atau tidak adanya tindakan dari pihak ketiga, termasuk terkait dengan Produk yang ada dalam situs{' '}
                <Text component="span" fw={700}>www.hutamamajusukses.com</Text> yang diduga palsu.</List.Item>
              <List.Item>Adanya tindakan peretasan yang dilakukan oleh pihak ketiga.</List.Item>
            </List>
          </Box>

          <Box id="ganti-rugi">
            <Title order={3} mb="sm">K. Ganti Rugi</Title>
            <Text size="sm">
              Pengguna akan melepaskan{' '}
              <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> dari tuntutan ganti rugi dan menjaga{' '}
              <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> (termasuk Induk Perusahaan, direktur, dan karyawan) dari setiap klaim atau tuntutan, termasuk biaya hukum yang wajar, yang dilakukan oleh pihak ketiga yang timbul dalam hal Anda melanggar Perjanjian ini, penggunaan Layanan{' '}
              <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> yang tidak semestinya dan/ atau pelanggaran Anda terhadap hukum atau hak-hak pihak ketiga.
            </Text>
          </Box>

          <Box id="pilihan-hukum">
            <Title order={3} mb="sm">L. Pemilihan Hukum</Title>
            <Text size="sm">
              Perjanjian ini akan diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia, tanpa memperhatikan pertentangan aturan hukum. Anda setuju bahwa tindakan hukum apapun atau sengketa yang mungkin timbul dari, berhubungan dengan, atau berada dalam cara apapun berhubungan dengan situs dan/atau Perjanjian ini akan diselesaikan secara eksklusif dalam yurisdiksi pengadilan Republik Indonesia.
            </Text>
          </Box>

          <Box id="pembaharuan">
            <Title order={3} mb="sm">M. Pembaharuan</Title>
            <Text size="sm">
              Syarat & ketentuan mungkin diubah dan/atau diperbaharui dari waktu ke waktu tanpa pemberitahuan sebelumnya.{' '}
              <Text component="span" fw={700}>PT Hutama Maju Sukses</Text> menyarankan agar Anda membaca secara seksama dan memeriksa halaman Syarat & ketentuan ini dari waktu ke waktu untuk mengetahui perubahan apapun. Dengan tetap mengakses dan menggunakan layanan{' '}
              <Text component="span" fw={700}>PT Hutama Maju Sukses</Text>, maka pengguna dianggap menyetujui perubahan-perubahan dalam Syarat & Ketentuan.
            </Text>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}