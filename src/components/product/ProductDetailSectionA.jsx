import React, { useState, useCallback } from 'react';
import styles from './ProductDetailSectionA.module.css';
import {
  Grid,
  Image,
  Title,
  Text,
  Box,
  Stack,
  Card,
  Group,
  Divider,
  Breadcrumbs,
  NumberInput,
  ActionIcon
} from '@mantine/core';
import { 
  IconShoppingCartPlus, 
  IconPlus, 
  IconMinus, 
  IconCheck,
  IconArrowRight,
  IconX
} from '@tabler/icons-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ProductDetailSectionA({
  product,
  breadcrumbItems,
  mainImage,
  galleryImages,
  onMainImageSelect,
  isLoading = false
}) {
  
  const [quantity, setQuantity] = useState(1);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(mainImage);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isPriceVisible = product?.show_price === true || product?.show_price === 1 || product?.show_price === "1";

  const handleQuantityChange = useCallback((value) => {
    const newQuantity = Math.max(1, Math.min(100, Number(value) || 1));
    setQuantity(newQuantity);
  }, []);

  const calculateTotalPrice = useCallback(() => {
    const price = Number(product?.product_price || product?.price || 0);
    return price * quantity;
  }, [product, quantity]);

  const getCurrentImageIndex = useCallback(() => {
    return galleryImages?.findIndex(img => img.url === mainImage) || 0;
  }, [galleryImages, mainImage]);

  const handleNextImage = useCallback(() => {
    const currentIndex = getCurrentImageIndex();
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    onMainImageSelect(galleryImages[nextIndex].url);
  }, [galleryImages, getCurrentImageIndex, onMainImageSelect]);

  const handlePreviousImage = useCallback(() => {
    const currentIndex = getCurrentImageIndex();
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    onMainImageSelect(galleryImages[prevIndex].url);
  }, [galleryImages, getCurrentImageIndex, onMainImageSelect]);

  const openImageModal = useCallback((imageUrl) => {
    setModalImage(imageUrl);
    setIsImageModalOpen(true);
  }, []);

  const closeImageModal = useCallback(() => {
    setIsImageModalOpen(false);
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    try {
      const result = addToCart(product, quantity);
      
      if (result.actionType === 'added' || result.actionType === 'updated') {
        toast.success(`${product.product_name} ditambahkan ke keranjang!`);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
      }
    } catch (error) {
      toast.error('Gagal menambahkan produk ke keranjang');
    } finally {
      setIsAddingToCart(false);
    }
  }, [product, quantity, addToCart]);

  const handleBuyNow = useCallback(async () => {
    if (!product) return;
    
    setIsBuyingNow(true);
    try {
      const result = addToCart(product, quantity);
      
      if (result.actionType === 'added' || result.actionType === 'updated') {
        toast.success(`Produk ditambahkan! Mengarahkan ke checkout...`);
        setTimeout(() => {
          navigate('/checkout');
        }, 1000);
      }
    } catch (error) {
      toast.error('Gagal memproses pembelian');
    } finally {
      setIsBuyingNow(false);
    }
  }, [product, quantity, addToCart, navigate]);

  const formatPrice = useCallback((price) => {
    return `Rp ${Number(price || 0).toLocaleString('id-ID')}`;
  }, []);

  const getProductPrice = useCallback(() => {
    return product?.product_price || product?.price || 0;
  }, [product]);

  const getOriginalPrice = useCallback(() => {
    return product?.original_price || null;
  }, [product]);

  if (!product && !isLoading) {
    return (
      <Box p="xl" ta="center">
        <Text c="dimmed">Produk tidak ditemukan.</Text>
      </Box>
    );
  }

  return (
    <>
      <Breadcrumbs className={styles.breadcrumbs}>{breadcrumbItems}</Breadcrumbs>

      <Grid gutter={{ base: 'lg', md: 'xl' }} className={styles.mainGrid}>
        <Grid.Col span={{ base: 12, md: 4.8 }} className={styles.leftColumn}>
          <Stack gap="md" className={styles.imageSection}>
            <Card withBorder radius="md" p={0} className={styles.imageCard}>
              {isLoading ? (
                <Box className={styles.imageLoading} />
              ) : (
                <Box className={styles.mainImageContainer}>
                  <Image
                    src={mainImage}
                    className={styles.squareImage}
                    fit="contain"
                    fallbackSrc="https://placehold.co/600x600/E0E0E0/BDBDBD?text=No+Image"
                    alt={product?.product_name || 'Product image'}
                    onClick={() => openImageModal(mainImage)}
                  />
                  
                  {galleryImages && galleryImages.length > 1 && (
                    <>
                      <button className={`${styles.navButton} ${styles.prevButton}`} onClick={handlePreviousImage}> &lt; </button>
                      <button className={`${styles.navButton} ${styles.nextButton}`} onClick={handleNextImage}> &gt; </button>
                    </>
                  )}
                  
                  {galleryImages && galleryImages.length > 1 && (
                    <Box className={styles.imageCounter}>
                      <Text size="sm" fw={600}>
                        {getCurrentImageIndex() + 1} / {galleryImages.length}
                      </Text>
                    </Box>
                  )}
                </Box>
              )}
            </Card>

            {galleryImages && galleryImages.length > 1 && (
              <Group gap="sm" wrap="wrap" justify="flex-start" className={styles.thumbnailGroup}>
                {galleryImages.map((img, index) => (
                  <Box
                    key={img.id}
                    className={`${styles.thumbnail} ${mainImage === img.url ? styles.activeThumbnail : ''}`}
                    onClick={() => onMainImageSelect(img.url)}
                  >
                    <Image
                      src={img.url}
                      className={styles.squareThumbnail}
                      fit="cover"
                      radius="sm"
                      alt={`Product thumbnail ${index + 1}`}
                    />
                  </Box>
                ))}
              </Group>
            )}
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 7.2 }} className={styles.rightColumn}>
          <Card className={styles.productInfoCard}>
            <Stack gap="lg" className={styles.productInfoContent}>
              
              <Box>
                <Title order={1} className={styles.productTitle}>
                  {product?.product_name || 'Loading...'}
                </Title>
                {product?.sku && (
                  <Text size="sm" c="dimmed" mt={4}>
                    SKU: {product.sku}
                  </Text>
                )}
              </Box>

              <Box>
                <Title order={4} mb="sm" className={styles.sectionTitle}>
                  Spesifikasi Produk
                </Title>
              </Box>

              <Box>
                <Group gap="lg">
                  <Text className={styles.beratUkuranLabel}>Berat</Text>
                  <Text className={styles.beratUkuranValue}>~{product?.product_weight || '0'}kg</Text>
                  <Text className={styles.beratUkuranLabel}>|</Text>
                  <Text className={styles.beratUkuranLabel}>Ukuran</Text>
                  <Text className={styles.beratUkuranValue}>{product?.product_size || 'N/A'}</Text>
                </Group>
              </Box>

              {isPriceVisible && (
                <Box className={styles.priceSection}>
                  <Group align="flex-end" gap="xs">
                    <Text fw={700} size="2.5rem" className={styles.hargaText}>
                      {formatPrice(getProductPrice())}
                    </Text>
                    <Text className={styles.perUnitText}>per unit</Text>
                  </Group>
                  <Box h={8} />
                  <Text className={styles.hargaInfo}>
                    *harga dapat berubah sewaktu-waktu setelah melakukan checkout anda akan diarahkan ke admin whatsapp
                  </Text>
                  {getOriginalPrice() && getOriginalPrice() > getProductPrice() && (
                    <Group gap="xs" align="center" mt={4}>
                      <Text className={styles.priceOriginal} size="sm">
                        {formatPrice(getOriginalPrice())}
                      </Text>
                      {product?.discount && (
                        <Text className={styles.priceDiscount} size="sm" fw={600}>
                          Hemat {product.discount}%
                        </Text>
                      )}
                    </Group>
                  )}
                </Box>
              )}

              <Divider my="sm" className={styles.quantityDivider} />

              <Box className={styles.quantitySubtotalSection}>
                <Stack gap="md">
                  <Group justify="space-between" align="center" className={styles.quantityRow}>
                    <Text className={styles.kuantitasLabel}>Kuantitas</Text>
                    <Group gap={5} wrap="nowrap" className={styles.quantityValueGroup}>
                      <ActionIcon 
                        size={42} 
                        variant="outline"
                        color="blue"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity === 1}
                        radius="md"
                      >
                        <IconMinus size={20} />
                      </ActionIcon>
                      <NumberInput
                        value={quantity}
                        onChange={handleQuantityChange}
                        min={1}
                        max={100}
                        hideControls
                        classNames={{ input: styles.quantityInput }}
                        w={60}
                        radius="md"
                        size="md"
                      />
                      <ActionIcon 
                        size={42} 
                        variant="outline"
                        color="blue"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= 100}
                        radius="md"
                      >
                        <IconPlus size={20} />
                      </ActionIcon>
                    </Group>
                  </Group>

                  {isPriceVisible && (
                    <Group justify="space-between" align="center" className={styles.subtotalRow}>
                      <Text className={styles.subtotalLabel}>Subtotal</Text>
                      <Title order={3} className={styles.subtotalValue}>
                        {formatPrice(calculateTotalPrice())}
                      </Title>
                    </Group>
                  )}
                </Stack>
              </Box>

              <Stack gap="sm">
                <Group grow wrap="nowrap">
                  <button
                    className={styles.addToCartButton}
                    onClick={handleAddToCart}
                    disabled={isLoading || isBuyingNow || isAddingToCart}
                  >
                    <span className={styles.addToCartContent}>
                      {addedToCart ? 'Ditambahkan' : 'Masukan Keranjang'}
                      {addedToCart ? (
                        <IconCheck size={20} className={styles.addToCartIcon} />
                      ) : (
                        <IconShoppingCartPlus size={20} className={styles.addToCartIcon} />
                      )}
                    </span>
                    <div className={styles.addToCartHoverEffect}></div>
                  </button>
                  
                  <button
                    className={styles.buyNowButton}
                    onClick={handleBuyNow}
                    disabled={isLoading || isAddingToCart || isBuyingNow}
                  >
                    <span className={styles.buttonContent}>
                      <span className={styles.buttonText}>Beli Sekarang</span>
                      <IconArrowRight size={20} className={styles.buttonIcon} />
                    </span>
                    <div className={styles.buyNowHoverEffect}></div>
                  </button>
                </Group>
              </Stack>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {isImageModalOpen && (
        <div className={styles.imageModal} onClick={closeImageModal}>
          <button className={styles.modalCloseButton} onClick={closeImageModal}>
            <IconX size={24} />
          </button>
          <div className={styles.modalImageContainer} onClick={(e) => e.stopPropagation()}>
            <Image
              src={modalImage}
              className={styles.modalImage}
              fit="contain"
              fallbackSrc="https://placehold.co/800x800/E0E0E0/BDBDBD?text=No+Image"
              alt={product?.product_name || 'Product image'}
            />
          </div>
        </div>
      )}
    </>
  );
}