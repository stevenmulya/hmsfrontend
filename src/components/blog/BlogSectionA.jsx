import React from 'react';
import { Box, Title, Text, Group } from '@mantine/core';
import { IconNews } from '@tabler/icons-react';
import styles from './BlogSectionA.module.css';

export default function BlogSectionA({ imageUrl, title, description }) {
  return (
    <div className={styles.bannerContainer}>
      <div 
        className={styles.bannerImage} 
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* <div className={styles.overlay}></div> Dihapus */}
        <div className={styles.content}>
          <Group justify="center" gap="md" align="center" className={styles.fadeInUp}>
            <IconNews size={36} className={styles.titleIcon} />
            <Title order={1} className={styles.pageTitle}>
              {title}
            </Title>
          </Group>
          <Text className={`${styles.pageSubtitle} ${styles.fadeInUp}`} mt="sm" style={{ animationDelay: '0.2s' }}>
            {description}
          </Text>
        </div>
      </div>
    </div>
  );
}