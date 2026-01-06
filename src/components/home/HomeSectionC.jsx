import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import styles from './HomeSectionC.module.css';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import ProductCard from '../../components/ProductCard/ProductCard';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SectionTemplate from '../../components/section/SectionTemplate';

const CubeIcon = () => (
  <svg className={styles.titleIcon} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

export default function HomeSectionC() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { addItem } = useCart();

  const handleAddToCart = (product) => {
    if (product.product_stock <= 0) {
      toast.error('Stok produk habis');
      return;
    }

    const { id, product_name, product_price, product_mainimage_url, product_stock } = product;

    const itemToAdd = {
      id: id,
      name: product_name,
      price: product_price,
      image: product_mainimage_url,
      stock: product_stock
    };

    try {
      addItem(itemToAdd, 1);
      toast.success(`${product_name} ditambahkan ke keranjang!`);
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast.error('Gagal menambahkan produk ke keranjang');
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      {
        threshold: 0.1, 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setError(null);

    apiClient.get('/products')
      .then(response => {
        if (!isMounted) return;
        
        const latestProducts = (response.data.data || []).slice(0, 10);
        setProducts(latestProducts);
      })
      .catch(error => {
        if (!isMounted) return;
        
        console.error("Error fetching products:", error);
        setError("Gagal memuat produk");
        toast.error("Gagal memuat produk");
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SectionTemplate>
      <div 
        ref={sectionRef} 
        className={`${styles.sectionContent} ${isVisible ? styles.visible : ''}`}
      >
        
        <div className={styles.titleWrapper}>
          <div className={styles.titleLeft}>
            <CubeIcon />
            <div className={styles.titleContainer}>
              <div className={styles.titleSection}>
                <h2 className={styles.title}>Produk Kami</h2>
                <div className={styles.buttonLineContainer}>
                  <Link to="/products" className={styles.seeAllButton}>
                    Lihat Semua Produk
                  </Link>
                  <div className={styles.buttonLine}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.productsContainer}>
          
          <div className={styles.gridOrnament}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#023E8A" stopOpacity="0.04" />
                   <stop offset="100%" stopColor="#1C7EBA" stopOpacity="0" />
                </linearGradient>
              </defs>
              <circle cx="5%" cy="70%" r="220" fill="url(#blobGradient)" />
            </svg>
          </div>

          {loading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.loadingSpinner}></div>
            </div>
          )}

          {!loading && error && (
            <div className={styles.errorState}>
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className={styles.retryButton}
              >
                Coba Lagi
              </button>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className={styles.productsGrid}>
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className={styles.gridItemWrapper}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    className={styles.productCardItem}
                  />
                </div>
              ))}
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className={styles.emptyState}>
              Belum ada produk yang tersedia.
            </div>
          )}
        </div>

        <div className={styles.notFoundSection}>
          <h3 className={styles.notFoundText}>Tidak menemukan produk yang Anda cari?</h3>
          <PrimaryButton to="/products">
            Lihat Semua Produk
          </PrimaryButton>
        </div>
      </div>
    </SectionTemplate>
  );
}