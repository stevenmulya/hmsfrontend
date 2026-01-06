import { useEffect, useState } from 'react';
import { Title, SimpleGrid, Container, Loader, Center, Button } from '@mantine/core';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';
import ProductCard from '../components/ProductCard';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState('/products');
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchProducts = (url, isInitialLoad = false) => {
    if (!url) return;

    if (isInitialLoad) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    apiClient.get(url)
      .then(res => {
        if (isInitialLoad) {
          // --- THE FIX IS HERE (for initial load) ---
          // Replace the old list with the new one instead of adding to it.
          setProducts(res.data.data);
        } else {
          // Keep adding for "Load More" button
          setProducts(prevProducts => [...prevProducts, ...res.data.data]);
        }
        setNextPageUrl(res.data.links.next);
      })
      .catch(() => toast.error("Gagal memuat produk."))
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  };

  // This useEffect now only runs ONCE when the component first mounts.
  useEffect(() => {
    fetchProducts(nextPageUrl, true);
  }, []); // The empty dependency array [] is key.

  if (loading) return <Center><Loader /></Center>;

  return (
    <Container my="xl">
      <Title order={2} ta="center" mb="xl">Katalog Produk Kami</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>

      {nextPageUrl && (
        <Center mt="xl">
          <Button onClick={() => fetchProducts(nextPageUrl)} loading={loadingMore}>
            Tampilkan Lebih Banyak
          </Button>
        </Center>
      )}
    </Container>
  );
}