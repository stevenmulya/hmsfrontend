import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedValue } from '@mantine/hooks';
import toast from 'react-hot-toast';
import { 
  IconSearch, 
  IconChevronDown, 
  IconChevronLeft, 
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCategory, 
  IconFilter,
  IconArrowsSort,
  IconCheck,
  IconX 
} from '@tabler/icons-react';
import apiClient from '../../api/apiClient';
import styles from './ProductSectionB.module.css';
import SectionTemplate from '../section/SectionTemplate';
import { useCart } from '../../context/CartContext';
import ProductCard from '../ProductCard/ProductCard';

const ITEMS_PER_PAGE = 12;

const sortOptions = [
  { value: 'latest', label: 'Terbaru' },
  { value: 'price_asc', label: 'Harga Terendah' },
  { value: 'price_desc', label: 'Harga Tertinggi' },
  { value: 'name_asc', label: 'Nama A-Z' },
  { value: 'name_desc', label: 'Nama Z-A' },
];

const capitalizeWords = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

const ProductSkeleton = () => (
  <div className={styles.gridContainer}>
    {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
      <div key={index} className={styles.skeletonCard}>
        <div className={`${styles.skeletonBlock} ${styles.skeletonImage}`} />
        <div className={styles.skeletonContent}>
          <div className={`${styles.skeletonBlock} ${styles.skeletonText}`} style={{ width: '80%' }} />
          <div className={`${styles.skeletonBlock} ${styles.skeletonText}`} style={{ width: '60%' }} />
        </div>
        <div className={`${styles.skeletonBlock} ${styles.skeletonButton}`} />
      </div>
    ))}
  </div>
);

const MobileFilterDrawer = ({ 
  opened, 
  initialTab,
  onClose, 
  categories, 
  selectedCategory, 
  selectedSubcategory, 
  sortBy,
  onCategorySelect, 
  onSubcategorySelect, 
  onSortSelect,
  onResetFilters,
  loadingCategories
}) => {
  const [activeTab, setActiveTab] = useState('filter');

  useEffect(() => {
    if (opened && initialTab) {
      setActiveTab(initialTab);
    }
  }, [opened, initialTab]);

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [opened]);

  if (!opened) return null;

  return (
    <div className={styles.drawerOverlay} onClick={onClose}>
      <div className={styles.drawerContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.drawerHeader}>
          <h3>Menu Produk</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <IconX size={24} />
          </button>
        </div>

        <div className={styles.drawerTabs}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'filter' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('filter')}
          >
            <IconFilter size={18} /> Filter
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'sort' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('sort')}
          >
            <IconArrowsSort size={18} /> Urutkan
          </button>
        </div>
        
        <div className={styles.drawerBody}>
          {activeTab === 'filter' ? (
            <>
              <div className={styles.filterHeaderAction}>
                <h4>Kategori</h4>
                <button onClick={() => { onResetFilters(); onClose(); }} className={styles.resetTextBtn}>
                  Reset
                </button>
              </div>

              {loadingCategories ? (
                <div className={styles.loadingText}>Memuat kategori...</div>
              ) : (
                <ul className={styles.mobileCategoryList}>
                  {categories.map((category) => (
                    <li key={category.slug} className={styles.mobileCategoryItem}>
                      <button 
                        className={`${styles.mobileCategoryBtn} ${selectedCategory === category.slug ? styles.active : ''}`}
                        onClick={() => onCategorySelect(category.slug)}
                      >
                        {capitalizeWords(category.name)}
                        <IconChevronDown size={16} className={selectedCategory === category.slug ? styles.rotateIcon : ''} />
                      </button>
                      
                      {selectedCategory === category.slug && (
                        <div className={styles.mobileSubcategoryList}>
                          <button
                            className={`${styles.mobileSubLink} ${!selectedSubcategory ? styles.activeSub : ''}`}
                            onClick={() => { onSubcategorySelect(null); onClose(); }}
                          >
                            Semua {capitalizeWords(category.name)}
                          </button>
                          {category.subcategories?.map((sub) => (
                            <button
                              key={sub.slug}
                              className={`${styles.mobileSubLink} ${selectedSubcategory === sub.slug ? styles.activeSub : ''}`}
                              onClick={() => { onSubcategorySelect(sub.slug); onClose(); }}
                            >
                              {capitalizeWords(sub.name)}
                            </button>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <div className={styles.sortSection}>
              <h4>Urutkan Berdasarkan</h4>
              <div className={styles.sortList}>
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`${styles.sortOptionBtn} ${sortBy === option.value ? styles.activeSort : ''}`}
                    onClick={() => { onSortSelect(option.value); onClose(); }}
                  >
                    {option.label}
                    {sortBy === option.value && <IconCheck size={18} />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ProductSectionB() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);
  const [categoryError, setCategoryError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const [activePage, setActivePage] = useState(!isNaN(initialPage) && initialPage > 0 ? initialPage : 1);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'latest');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(searchParams.get('subcategory') || null);

  const [debouncedSearch] = useDebouncedValue(search, 500);

  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [productsFrom, setProductsFrom] = useState(0);
  const [productsTo, setProductsTo] = useState(0);

  const [mobileFilterOpened, setMobileFilterOpened] = useState(false);
  const [mobileDrawerTab, setMobileDrawerTab] = useState('filter');
  
  const { addToCart } = useCart();
  const abortControllerRef = useRef(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = useCallback((product) => {
    try {
      const result = addToCart(product, 1);
      if (result.actionType === 'added') {
        toast.success(`${product.product_name} ditambahkan ke keranjang!`);
      } else if (result.actionType === 'updated') {
        toast.success(`Jumlah ${product.product_name} diperbarui di keranjang.`);
      }
    } catch (error) {
      toast.error('Gagal menambahkan produk ke keranjang');
    }
  }, [addToCart]);

  useEffect(() => {
    let isMounted = true;
    setLoadingCategories(true);
    setCategoryError(null);
    
    apiClient.get('/categories', { params: { include: 'subcategories' }})
      .then(response => {
        if (isMounted) setCategories(response.data.data || []);
      })
      .catch(err => {
        if (isMounted) {
          setCategoryError("Gagal memuat kategori.");
          setCategories([]);
        }
      })
      .finally(() => {
        if (isMounted) setLoadingCategories(false);
      });

    return () => { isMounted = false; };
  }, []);

  const fetchProducts = useCallback((params) => {
    let isMounted = true;
    setLoadingProducts(true);
    setError(null);
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    const validParams = { limit: ITEMS_PER_PAGE };
    if (params.page > 1) validParams.page = params.page;
    if (params.search) validParams.search = params.search;
    if (params.category_slug) validParams.category_slug = params.category_slug;
    if (params.subcategory_slug) validParams.subcategory_slug = params.subcategory_slug;
    if (params.sort && params.sort !== 'latest') validParams.sort = params.sort;

    apiClient.get('/products', { 
      params: validParams,
      signal: controller.signal
    })
      .then(response => {
        if (isMounted) {
          setProducts(response.data.data || []);
          const meta = response.data.meta || {};
          setTotalPages(meta.last_page || 1);
          setTotalProducts(meta.total || 0);
          setProductsFrom(meta.from || 0);
          setProductsTo(meta.to || 0);
          if (meta.current_page !== activePage) setActivePage(meta.current_page || 1);
        }
      })
      .catch(err => {
        if (err.name === 'CanceledError' || err.code === "ERR_CANCELED") return;
        if (isMounted) {
          setError("Gagal memuat produk.");
          setProducts([]);
        }
      })
      .finally(() => {
        if (isMounted && abortControllerRef.current === controller) {
          setLoadingProducts(false);
        }
      });
      
    return () => { isMounted = false; };
  }, [activePage]);

  useEffect(() => {
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const page = !isNaN(pageParam) && pageParam > 0 ? pageParam : 1;
    const searchVal = searchParams.get('search') || '';
    const category = searchParams.get('category') || null;
    const subcategory = searchParams.get('subcategory') || null;
    const sort = searchParams.get('sort') || 'latest';

    setActivePage(page);
    setSearch(searchVal);
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setSortBy(sort);

    fetchProducts({
      page,
      search: debouncedSearch || undefined,
      category_slug: category || undefined,
      subcategory_slug: subcategory || undefined,
      sort: sort !== 'latest' ? sort : undefined,
    });
  }, [debouncedSearch, searchParams, fetchProducts]);

  const updateSearchParams = useCallback((newParams, resetPage = true) => {
    const currentParams = new URLSearchParams(searchParams);
    for (const key in newParams) {
      if (newParams[key]) {
        currentParams.set(key, newParams[key]);
      } else {
        currentParams.delete(key);
      }
    }
    if (resetPage) currentParams.delete('page');
    setSearchParams(currentParams);
  }, [searchParams, setSearchParams]);

  const handleSearchChange = (e) => setSearch(e.target.value);
  
  useEffect(() => {
    if (debouncedSearch !== (searchParams.get('search') || '')) {
      updateSearchParams({ search: debouncedSearch }, true);
    }
  }, [debouncedSearch, searchParams, updateSearchParams]);

  const handleCategorySelect = (slug) => {
    const newSlug = selectedCategory === slug ? null : slug;
    setSelectedCategory(newSlug);
    setSelectedSubcategory(null);
    updateSearchParams({ category: newSlug, subcategory: null });
  };

  const handleSubcategorySelect = (e, slug) => {
    e.stopPropagation();
    const newSlug = selectedSubcategory === slug ? null : slug;
    setSelectedSubcategory(newSlug);
    updateSearchParams({ subcategory: newSlug });
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    updateSearchParams({ sort: val });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setActivePage(newPage);
      updateSearchParams({ page: newPage.toString() }, false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    updateSearchParams({ category: null, subcategory: null });
  };

  const openMobileDrawer = (tab) => {
    setMobileDrawerTab(tab);
    setMobileFilterOpened(true);
  };

  const currentCategoryName = useMemo(() => {
    if (selectedCategory) {
      const cat = categories.find(c => c.slug === selectedCategory);
      if (cat) {
        if (selectedSubcategory) {
          const sub = cat.subcategories?.find(s => s.slug === selectedSubcategory);
          return sub ? sub.name : null;
        }
        return cat.name;
      }
    }
    return null;
  }, [selectedCategory, selectedSubcategory, categories]);

  const activeFiltersCount = (selectedCategory ? 1 : 0) + (selectedSubcategory ? 1 : 0);

  const renderPagination = () => {
    if (totalProducts === 0) return null;
    let pages = [];
    const maxVisible = 5;
    let start = Math.max(1, activePage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageBtn} ${activePage === i ? styles.activePage : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return (
      <div className={styles.paginationWrapper}>
        <button className={styles.pageBtn} disabled={activePage === 1} onClick={() => handlePageChange(1)} title="Halaman Pertama">
          <IconChevronsLeft size={16} />
        </button>
        <button className={styles.pageBtn} disabled={activePage === 1} onClick={() => handlePageChange(activePage - 1)} title="Halaman Sebelumnya">
          <IconChevronLeft size={16} />
        </button>
        {pages}
        <button className={styles.pageBtn} disabled={activePage === totalPages} onClick={() => handlePageChange(activePage + 1)} title="Halaman Berikutnya">
          <IconChevronRight size={16} />
        </button>
        <button className={styles.pageBtn} disabled={activePage === totalPages} onClick={() => handlePageChange(totalPages)} title="Halaman Terakhir">
          <IconChevronsRight size={16} />
        </button>
      </div>
    );
  };

  return (
    <SectionTemplate>
      <div className={`${styles.container} ${isVisible ? styles.visible : ''}`} ref={sectionRef}>
        <div className={styles.searchWrapper}>
          <input 
            type="text" 
            placeholder="Cari produk..."
            value={search}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <IconSearch className={styles.searchIcon} size={20} />
        </div>

        <div className={styles.mobileControls}>
          <button 
            className={styles.mobileControlBtn} 
            onClick={() => openMobileDrawer('filter')}
          >
            <IconFilter size={18} />
            Filter
            {activeFiltersCount > 0 && <span className={styles.badge}>{activeFiltersCount}</span>}
          </button>
          <div className={styles.verticalDivider}></div>
          <button 
            className={styles.mobileControlBtn} 
            onClick={() => openMobileDrawer('sort')}
          >
            <IconArrowsSort size={18} />
            Urutkan
          </button>
        </div>

        <div className={styles.layoutGrid}>
          <aside className={`${styles.sidebar} ${isVisible ? styles.slideInLeft : ''}`}>
            <div className={styles.sidebarHeader}>
              <div className={styles.sidebarTitleGroup}>
                <IconCategory size={20} />
                <h4>Kategori Produk</h4>
              </div>
              <button onClick={handleResetFilters} className={styles.textBtn}>Reset</button>
            </div>
            <div className={styles.dashedLine}></div>

            {loadingCategories ? (
              <div className={styles.loadingText}>Memuat...</div>
            ) : categoryError ? (
              <div className={styles.errorText}>{categoryError}</div>
            ) : (
              <ul className={styles.categoryList}>
                {categories.length > 0 ? categories.map((cat) => (
                  <li key={cat.slug} className={styles.categoryItem}>
                    <button 
                      className={`${styles.categoryBtn} ${selectedCategory === cat.slug ? styles.active : ''}`}
                      onClick={() => handleCategorySelect(cat.slug)}
                    >
                      {capitalizeWords(cat.name)}
                    </button>
                    
                    {selectedCategory === cat.slug && (
                      <div className={styles.subcategoryList}>
                        <button 
                          className={`${styles.subBtn} ${!selectedSubcategory ? styles.activeSub : ''}`}
                          onClick={(e) => handleSubcategorySelect(e, null)}
                        >
                          Semua {capitalizeWords(cat.name)}
                        </button>
                        {cat.subcategories?.map((sub) => (
                          <button
                            key={sub.slug}
                            className={`${styles.subBtn} ${selectedSubcategory === sub.slug ? styles.activeSub : ''}`}
                            onClick={(e) => handleSubcategorySelect(e, sub.slug)}
                          >
                            {capitalizeWords(sub.name)}
                          </button>
                        ))}
                      </div>
                    )}
                  </li>
                )) : <div className={styles.dimmedText}>Tidak ada kategori.</div>}
              </ul>
            )}
          </aside>

          <main className={styles.mainContent}>
            <div className={styles.desktopHeader}>
              <div className={styles.resultCount}>
                {!loadingProducts && !error && totalProducts > 0 ? (
                  <>
                    Menampilkan {productsFrom}-{productsTo} dari {totalProducts} produk
                    {currentCategoryName && (
                      <> dengan kategori <strong>"{capitalizeWords(currentCategoryName)}"</strong></>
                    )}
                    {debouncedSearch && !currentCategoryName && (
                      <> untuk pencarian <strong>"{debouncedSearch}"</strong></>
                    )}
                  </>
                ) : null}
              </div>
              
              <div className={`${styles.selectWrapper} ${styles.desktopSort}`}>
                <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)} className={styles.sortSelect}>
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <IconChevronDown size={14} className={styles.selectIcon} />
              </div>
            </div>

            {loadingProducts ? (
              <ProductSkeleton />
            ) : error ? (
              <div className={styles.centerMessage} style={{color: 'red'}}>{error}</div>
            ) : products.length === 0 ? (
              <div className={styles.centerMessage}>
                {debouncedSearch || selectedCategory ? 'Tidak ada produk yang cocok.' : 'Belum ada produk.'}
              </div>
            ) : (
              <div className={styles.gridContainer}>
                {products.map((product, index) => (
                  <div key={product.id} className={isVisible ? styles.fadeInUp : ''} style={{ animationDelay: `${index * 0.05}s` }}>
                    <ProductCard 
                      product={product} 
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))}
              </div>
            )}

            {!loadingProducts && !error && renderPagination()}
          </main>
        </div>
      </div>

      <MobileFilterDrawer 
        opened={mobileFilterOpened}
        initialTab={mobileDrawerTab}
        onClose={() => setMobileFilterOpened(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        sortBy={sortBy}
        onCategorySelect={(slug) => {
            const newSlug = selectedCategory === slug ? null : slug;
            setSelectedCategory(newSlug);
            setSelectedSubcategory(null);
            updateSearchParams({ category: newSlug, subcategory: null });
        }}
        onSubcategorySelect={(slug) => {
            const newSlug = selectedSubcategory === slug ? null : slug;
            setSelectedSubcategory(newSlug);
            updateSearchParams({ subcategory: newSlug });
        }}
        onSortSelect={handleSortChange}
        onResetFilters={handleResetFilters}
        loadingCategories={loadingCategories}
      />
    </SectionTemplate>
  );
}