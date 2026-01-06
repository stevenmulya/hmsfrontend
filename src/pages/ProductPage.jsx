import React from 'react';
import styles from './ProductPage.module.css';
import ProductSectionA from '../components/product/ProductSectionA';
import ProductSectionB from '../components/product/ProductSectionB';

export default function ProductPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.topSpacer}></div>
      <ProductSectionA />
      <ProductSectionB />
      <div className={styles.bottomSpacer}></div>
    </div>
  );
}