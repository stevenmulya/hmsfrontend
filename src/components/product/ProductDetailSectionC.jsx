"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import styles from './ProductDetailSectionC.module.css';
import {
  Title,
  Box,
  Group,
  Button,
  SimpleGrid,
  Skeleton
} from '@mantine/core';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import ProductCard from '../../components/ProductCard/ProductCard';

const MAX_RELATED_PRODUCTS = 5;

export default function ProductDetailSectionC({ subcategorySlug, currentProductSlug }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Handler untuk Add to Cart di produk terkait
  const handleAddToCart = (product) => {
    if (!product) return;
    
    if (product.product_stock <= 0) {
      toast.error('Stok produk habis');
      return;
    }
    
    try {
      console.log('Adding to cart from related products:', product);
      const result = addToCart(product, 1);
      
      if (result.actionType === 'added') {
        toast.success(`${product.product_name} ditambahkan ke keranjang!`);
      } else if (result.actionType === 'updated') {
        toast.success(`Jumlah ${product.product_name} diperbarui di keranjang.`);
      }
    } catch (error) {
      console.error('Error adding to cart from related products:', error);
      toast.error('Gagal menambahkan produk ke keranjang');
    }
  };

  useEffect(() => {
    if (!subcategorySlug) {
      setLoading(false);
      return;
    }

    const fetchRelatedProducts = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/products', {
          params: {
            subcategory_slug: subcategorySlug,
            limit: MAX_RELATED_PRODUCTS + 1
          }
        });

        const allProducts = response.data.data || [];
        const filtered = allProducts
          .filter(p => p.slug !== currentProductSlug)
          .slice(0, MAX_RELATED_PRODUCTS);
          
        setRelatedProducts(filtered);
      } catch (error) {
        console.error("Error fetching related products:", error);
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [subcategorySlug, currentProductSlug]);

  // Skeleton Loading
  if (loading) {
    return (
      <Box mt="xl" className={styles.sectionContainer}>
        {/* Desktop: Title di kiri, button di kanan */}
        <Group justify="space-between" align="center" mb="md" className={styles.sectionHeader}>
          <Title order={3} className={styles.sectionTitle}>
            Produk-produk Terkait
          </Title>
          <Button
            component={Link}
            to="/products"
            variant="subtle"
            color="blue"
            className={styles.seeAllButtonDesktop}
          >
            Lihat Semua Produk
          </Button>
        </Group>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing="lg">
          {[...Array(5)].map((_, index) => (
            <div key={index} className={styles.skeletonCard}>
              <Skeleton height={160} mb="md" className={styles.skeletonImage} />
              <Skeleton height={20} width="80%" mb="xs" className={styles.skeletonName} />
              <Skeleton height={36} className={styles.skeletonButton} />
            </div>
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  // Return null jika tidak ada produk terkait
  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <Box as="section" mt="xl" className={styles.sectionContainer}>
      {/* Desktop: Title di kiri, button di kanan */}
      <Group justify="space-between" align="center" mb="md" className={styles.sectionHeader}>
        <Title order={3} className={styles.sectionTitle}>
          Produk-produk Terkait
        </Title>
        <Button
          component={Link}
          to="/products"
          variant="subtle"
          color="blue"
          className={styles.seeAllButtonDesktop}
        >
          Lihat Semua Produk
        </Button>
      </Group>

      {/* Products Grid */}
      <SimpleGrid
        cols={{ base: 2, sm: 3, md: 5 }}
        spacing="lg"
      >
        {relatedProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            className={styles.productCardItem}
            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
          />
        ))}
      </SimpleGrid>

      {/* Mobile See All Button - Hanya untuk mobile, di paling bawah */}
      <Box className={styles.mobileSeeAllButtonContainer}>
        <Button
          component={Link}
          to="/products"
          variant="subtle"
          color="blue"
          fullWidth
          className={styles.seeAllButtonMobile}
        >
          Lihat Semua Produk
        </Button>
      </Box>
    </Box>
  );
}