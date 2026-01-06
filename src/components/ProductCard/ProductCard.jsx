// components/ProductCard/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

// Komponen icon cart
const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
  </svg>
);

export default function ProductCard({ 
  product, 
  onAddToCart, 
  className = '' 
}) {
  const isOutOfStock = product.product_stock <= 0;
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart && !isOutOfStock) {
      onAddToCart(product);
    }
  };

  const handleImageError = (e) => {
    e.target.src = "https://placehold.co/300x160/E0E0E0/BDBDBD?text=No+Image";
    e.target.onerror = null;
  };

  return (
    <div className={`${styles.productCard} ${className}`}>
      {/* Image Container */}
      <Link 
        to={`/products/${product.slug || product.id}`} 
        className={styles.imageContainer}
        aria-label={`Lihat detail ${product.product_name}`}
      >
        <img
          src={product.product_mainimage_url}
          alt={product.product_name}
          className={styles.productImage}
          loading="lazy"
          onError={handleImageError}
        />
        {/* Stock overlay */}
        {isOutOfStock && (
          <div className={styles.stockOverlay}>
            <span>STOK HABIS</span>
          </div>
        )}
      </Link>

      {/* Product Name - 14px */}
      <Link 
        to={`/products/${product.slug || product.id}`} 
        className={styles.productNameLink}
      >
        <h3 className={styles.productName} title={product.product_name}>
          {product.product_name}
        </h3>
      </Link>

      {/* Add to Cart Button - 16px dengan icon cart */}
      <button
        onClick={handleAddToCart}
        className={styles.addToCartButton}
        disabled={isOutOfStock}
        aria-label={`Tambahkan ${product.product_name} ke keranjang`}
      >
        <CartIcon />
        <span>Tambahkan</span>
      </button>
    </div>
  );
}