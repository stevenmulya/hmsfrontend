// components/ProductCard/ProductGridContainer.jsx
"use client";

import React from 'react';
import ProductCard from './ProductCard';
import styles from './ProductGridContainer.module.css';

export default function ProductGridContainer({ 
  products, 
  title, 
  showTitle = true,
  loading = false,
  error = null,
  columns = { base: 2, sm: 3, md: 5 },
  className = ''
}) {
  
  if (loading) {
    return (
      <div className={`${styles.container} ${className}`}>
        {showTitle && title && (
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{title}</h2>
          </div>
        )}
        
        <div className={styles.loadingGrid}>
          {[...Array(5)].map((_, index) => (
            <div key={index} className={styles.skeletonCard}>
              <div className={styles.skeletonImage}></div>
              <div className={styles.skeletonName}></div>
              <div className={styles.skeletonButton}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }
  
  if (!products || products.length === 0) {
    return null;
  }
  
  // Determine grid classes based on columns prop
  const gridClasses = `
    ${styles.productsGrid}
    ${columns.base === 1 ? styles.gridCols1 : ''}
    ${columns.base === 2 ? styles.gridCols2 : ''}
    ${columns.sm === 3 ? styles.gridColsSm3 : ''}
    ${columns.md === 5 ? styles.gridColsMd5 : ''}
  `;
  
  return (
    <div className={`${styles.container} ${className}`}>
      {showTitle && title && (
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>
      )}
      
      <div className={gridClasses}>
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            className={styles.gridItem}
          />
        ))}
      </div>
    </div>
  );
}