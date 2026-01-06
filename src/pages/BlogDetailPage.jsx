"use client";

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../api/apiClient';
import {
  Container,
  LoadingOverlay,
  Center,
  Alert,
  Stack,
  Breadcrumbs,
  Anchor,
  Text
} from '@mantine/core';
import { IconAlertTriangle, IconHome } from '@tabler/icons-react';

// Import komponen section baru
import BlogDetailSectionA from '../components/blog/BlogDetailSectionA'; // Sesuaikan path
import BlogDetailSectionB from '../components/blog/BlogDetailSectionB'; // Sesuaikan path

export default function BlogDetailPage() {
  const { blogSlug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(null);
    setBlog(null);

    if (!blogSlug) {
      setError("Blog slug not found.");
      setLoading(false);
      return;
    }

    // Panggil endpoint /blogs/{slug}
    // Pastikan backend Anda memuat relasi 'category'
    apiClient.get(`/blogs/${blogSlug}`) 
      .then(response => {
        setBlog(response.data.data);
      })
      .catch(err => {
        console.error("Error fetching blog details:", err);
        setError(err.response?.status === 404 ? "Blog tidak ditemukan." : "Gagal memuat blog.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [blogSlug]);

  const breadcrumbItems = blog ? [
    { title: 'Home', href: '/' },
    { title: 'Blog', href: '/blog' },
    { title: blog.title, href: '#', noLink: true },
  ].map((item, index) => (
    item.noLink ? (
       <Text key={index} size="sm" c="dimmed" truncate="end">{item.title}</Text>
    ) : (
       <Anchor component={Link} to={item.href} key={index} size="sm">
         {item.title}
       </Anchor>
    )
  )) : [];

  if (loading) {
    return <Container py="xl" style={{ minHeight: '60vh' }}><LoadingOverlay visible={true} /></Container>;
  }

  if (error) {
    return (
      <Container py="xl" style={{ minHeight: '60vh' }} mt={60}>
        <Center>
          <Alert icon={<IconAlertTriangle size={18} />} title="Error" color="red" radius="md">
            {error} <Anchor component={Link} to="/blog">Kembali ke daftar blog.</Anchor>
          </Alert>
        </Center>
      </Container>
    );
  }

  if (!blog) {
    return <Container py="xl" mt={60}><Center><Text>Blog tidak tersedia.</Text></Center></Container>;
  }

  return (
    <Container size="lg" py="xl" mt={60}>
      <Stack gap="xl">
        {/* Section A: Konten Utama (Gambar Kiri, Teks Kanan) */}
        <BlogDetailSectionA
          blog={blog}
          breadcrumbItems={breadcrumbItems}
        />

        {/* Section B: Blog Terkait */}
        {/* Hanya tampilkan jika kategori ada */}
        {blog.category?.slug && (
          <BlogDetailSectionB
            currentBlogSlug={blog.slug}
            categorySlug={blog.category.slug}
          />
        )}
      </Stack>
    </Container>
  );
}