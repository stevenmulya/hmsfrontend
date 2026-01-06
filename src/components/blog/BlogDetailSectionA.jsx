"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogDetailSectionA.module.css';
import {
  Grid,
  Image,
  Title,
  Text,
  Box,
  Stack,
  Card,
  Group,
  Anchor
} from '@mantine/core';

const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  } catch (e) {
    return dateString;
  }
};

export default function BlogDetailSectionA({ blog, breadcrumbItems }) {
  const [mainImage, setMainImage] = useState(null);

  const galleryImages = useMemo(() => {
    if (!blog) return [];
    const images = [];
    if (blog.main_image_url) {
      images.push({ id: 'main', url: blog.main_image_url });
    }
    if (blog.images) { 
      blog.images.forEach(img => {
        if (img.url !== blog.main_image_url) {
          images.push({ id: img.id, url: img.url });
        }
      });
    }
    return images;
  }, [blog]);

  useEffect(() => {
    setMainImage(galleryImages[0]?.url || null);
  }, [galleryImages]);

  const descriptionHtml = blog?.content || blog?.description || "";
  const formattedDate = blog.created_date || formatDate(blog.created_at);
  const categoryName = blog.category?.name;
  const categorySlug = blog.category?.slug;

  return (
    <>
      <Grid 
        gutter={{ base: 'lg', md: 'xl' }} 
        mt="md"
      >
        <Grid.Col 
          span={{ base: 12, md: 5 }} 
          className={styles.fadeInUp}
        >
          <Stack gap="md">
            <Card withBorder radius="md" p={0} className={styles.mainImageCard}>
              <Image
                src={mainImage}
                className={styles.mainImage}
                fit="cover"
                fallbackSrc="https://placehold.co/600x450/E0E0E0/BDBDBD?text=No+Image"
              />
            </Card>
            {galleryImages.length > 1 && (
              <Group gap="sm" wrap="wrap">
                {galleryImages.map((img) => (
                  <Box
                    key={img.id}
                    className={`${styles.thumbnail} ${mainImage === img.url ? styles.activeThumbnail : ''}`}
                    onClick={() => setMainImage(img.url)}
                    tabIndex={0}
                  >
                    <Image
                      src={img.url}
                      height={60}
                      width={60}
                      fit="cover"
                      radius="sm"
                      fallbackSrc="https://placehold.co/70x70/E0E0E0/BDBDBD?text=..."
                    />
                  </Box>
                ))}
              </Group>
            )}
          </Stack>
        </Grid.Col>

        <Grid.Col 
          span={{ base: 12, md: 7 }} 
          className={styles.fadeInUp}
          style={{ animationDelay: '0.2s' }}
        >
          <Stack gap="md">
            
            <Group gap="xs" align="center">
              <Text size="sm" c="dimmed">
                {formattedDate}
              </Text>
              {categoryName && (
                <>
                  <Text c="dimmed" size="sm">|</Text>
                  <Text size="sm" c="blue.7">
                    Kategori:{' '}
                    <Anchor component={Link} to={`/blog?category=${categorySlug}`} className={styles.categoryLink} fw={700}>
                      {categoryName}
                    </Anchor>
                  </Text>
                </>
              )}
            </Group>
            
            <Title order={1} className={styles.blogTitle}>
              {blog.title}
            </Title>
            
            <div className={styles.contentSeparator}></div>

            {descriptionHtml && (
                <Box
                  className={`${styles.blogContentHtml} ${styles.contentBackground}`}
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
            )}
            
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
}