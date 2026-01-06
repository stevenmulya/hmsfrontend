// --- Reusable Product Card Component ---
import { Card, Image, Text, Group, Badge } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './ProductCard.module.css'; // We'll create this CSS file next

export default function ProductCard({ product }) {
  return (
    <Card withBorder radius="md" p="md" component={Link} to={`/products/${product.slug}`} className={classes.card}>
      <Card.Section>
        <Image src={product.product_mainimage_url} alt={product.product_name} height={180} fallbackSrc="https://via.placeholder.com/300?text=No+Image" />
      </Card.Section>

      <Group justify="space-between" mt="lg">
        <Text fw={500} fz="lg">{product.product_name}</Text>
        <Badge variant="light">New</Badge>
      </Group>

      <Text fz="sm" c="dimmed" mt="sm">
        Rp {Number(product.product_price).toLocaleString('id-ID')}
      </Text>
    </Card>
  );
}