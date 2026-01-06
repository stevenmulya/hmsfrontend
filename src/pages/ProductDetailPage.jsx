"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import {
  Container,
  LoadingOverlay,
  Center,
  Alert,
  Stack,
  Breadcrumbs,
  Anchor,
  Text,
  Divider // Pastikan Divider diimpor
} from '@mantine/core';
import { IconAlertTriangle, IconHome } from '@tabler/icons-react'; // IconHome masih diimpor, tapi tidak digunakan di breadcrumbs
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

import ProductDetailSectionA from '../components/product/ProductDetailSectionA';
import ProductDetailSectionB from '../components/product/ProductDetailSectionB';
import ProductDetailSectionC from '../components/product/ProductDetailSectionC';

export default function ProductDetailPage() {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setProduct(null);
    setMainImage(null);
    setQuantity(1);

    if (!productSlug) {
      setError("Product slug not found.");
      setLoading(false);
      return;
    }

    apiClient.get(`/products/${productSlug}`)
      .then(response => {
        const productData = response.data.data;
        setProduct(productData);
        setMainImage(productData.product_mainimage_url || productData.images?.[0]?.url || null);
      })
      .catch(err => {
        console.error("Error fetching product details:", err);
        setError(err.response?.status === 404 ? "Produk tidak ditemukan." : "Gagal memuat detail produk.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productSlug]);

  const galleryImages = useMemo(() => {
    if (!product) return [];
    const images = [];
    if (product.product_mainimage_url) {
      images.push({ id: 'main', url: product.product_mainimage_url });
    }
    if (product.images) {
      product.images.forEach(img => {
        if (img.url !== product.product_mainimage_url) {
          images.push({ id: img.id, url: img.url });
        }
      });
    }
    return images;
  }, [product]);

  const totalPrice = useMemo(() => {
    if (!product || !quantity) return 0;
    return (product.product_price * quantity);
  }, [product, quantity]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    toast.success(`${quantity} x ${product.product_name} ditambahkan ke keranjang!`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addItem(product, quantity);
    navigate('/checkout');
  };

  // --- PERUBAHAN 2: Breadcrumbs (Teks Saja) ---
  const breadcrumbItems = product ? [
    { title: 'Home', href: '/' }, // Mengganti IconHome dengan teks 'Home'
    { title: 'Products', href: '/products' },
    { title: product.product_name, href: '#', noLink: true },
  ].filter(Boolean)
   .map((item, index) => (
    item.noLink ? (
       <Text key={index} size="sm" c="dimmed">{item.title}</Text>
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
      <Container py="xl" style={{ minHeight: '60vh' }}>
        <Center>
          <Alert icon={<IconAlertTriangle size={18} />} title="Error" color="red" radius="md">
            {error} <Anchor component={Link} to="/products">Kembali ke daftar produk.</Anchor>
          </Alert>
        </Center>
      </Container>
    );
  }

  if (!product) {
    return <Container py="xl"><Center><Text>Produk tidak tersedia.</Text></Center></Container>;
  }

  return (
    // --- PERUBAHAN 1: Margin Atas Lebih Tinggi ---
    <Container size="lg" py="xl" mt={60}> {/* Menggunakan mt={60} */}
      <Stack gap="xl">
        {/* --- SECTION A --- */}
        <ProductDetailSectionA
          product={product}
          breadcrumbItems={breadcrumbItems}
          mainImage={mainImage}
          galleryImages={galleryImages} // Image list sudah dilempar sebagai prop
          quantity={quantity}
          totalPrice={totalPrice}
          onMainImageSelect={setMainImage}
          onQuantityChange={setQuantity}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />

        {/* --- SECTION B --- */}
        <ProductDetailSectionB
          product={product}
        />

        {product.subCategory?.slug && (
           <ProductDetailSectionC
            currentProductSlug={product.slug}
            subcategorySlug={product.subCategory.slug}
          />
        )}
      </Stack>
    </Container>
  );
}