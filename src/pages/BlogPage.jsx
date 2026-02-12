"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiClient from '../api/apiClient';
import styles from './BlogPage.module.css';
import SectionTemplate from '../components/section/SectionTemplate';
import BlogCard from '../components/BlogCard/BlogCard';
import { 
  IconNews, 
  IconSearch, 
  IconChevronDown, 
  IconChevronLeft, 
  IconChevronRight, 
  IconChevronsLeft, 
  IconChevronsRight,
  IconCategory
} from '@tabler/icons-react';

const sortOptions = [
  { value: 'latest', label: 'Terbaru' },
  { value: 'oldest', label: 'Terlama' },
  { value: 'name_asc', label: 'Judul A-Z' },
  { value: 'name_desc', label: 'Judul Z-A' },
];

const POSTS_PER_PAGE = 12;

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

const BlogSkeleton = () => (
  <div className={styles.skeletonCard}>
    <div className={`${styles.skeletonBlock} ${styles.skeletonImage}`}></div>
    <div className={styles.skeletonContent}>
      <div className={`${styles.skeletonBlock} ${styles.skeletonTitle}`}></div>
      <div className={`${styles.skeletonBlock} ${styles.skeletonDate}`}></div>
    </div>
  </div>
);

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorBlogs, setErrorBlogs] = useState(null);
  const [categoryError, setCategoryError] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const activePage = parseInt(searchParams.get('page') || '1', 10);
  const sortBy = searchParams.get('sort') || 'latest';
  const selectedCategory = searchParams.get('category') || null;

  const debouncedSearch = useDebounce(search, 500);

  const [totalPages, setTotalPages] = useState(1);
  const bannerImageUrl = 'blogpage-banner.png'; 
  const abortControllerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoadingCategories(true);
    setCategoryError(null);
    
    apiClient.get('/blog-categories')
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

  const fetchBlogs = useCallback((params) => {
    setLoadingBlogs(true);
    setErrorBlogs(null);
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    const validParams = { limit: POSTS_PER_PAGE };
    if (params.page > 1) validParams.page = params.page;
    if (params.search) validParams.search = params.search;
    if (params.category_slug) validParams.category_slug = params.category_slug;
    
    if (params.sort && params.sort !== 'latest') {
        if (params.sort === 'oldest') {
            validParams.sort = 'created_at,asc'; 
        } else if (params.sort === 'name_asc') {
            validParams.sort = 'title,asc'; 
        } else if (params.sort === 'name_desc') {
            validParams.sort = 'title,desc';
        } else {
             delete validParams.sort; 
        }
    }

    apiClient.get('/blogs', { 
      params: validParams,
      signal: controller.signal 
    })
      .then(response => {
        setBlogs(response.data.data || []);
        const meta = response.data.meta || {};
        setTotalPages(meta.last_page || 1);
      })
      .catch(err => {
        if (err.name === 'CanceledError' || err.code === "ERR_CANCELED") return;
        setErrorBlogs("Gagal memuat blog.");
        setBlogs([]);
        setTotalPages(1);
      })
      .finally(() => {
        if (abortControllerRef.current === controller) {
          setLoadingBlogs(false);
        }
      });
  }, []);

  const updateSearchParams = useCallback((newParams, resetPage = true) => {
    const currentParams = new URLSearchParams(searchParams);
    for (const key in newParams) {
      if (newParams[key] !== null && newParams[key] !== undefined && newParams[key] !== '') {
         currentParams.set(key, newParams[key]);
      } else {
        currentParams.delete(key);
      }
    }
    if (resetPage) {
        currentParams.delete('page');
    }
    setSearchParams(currentParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const searchVal = searchParams.get('search') || '';
    const category = searchParams.get('category') || null;
    const sort = searchParams.get('sort') || 'latest';

    setSearch(searchVal);

    fetchBlogs({
        page: page,
        search: searchVal || undefined,
        category_slug: category || undefined,
        sort: sort || undefined,
    });
  }, [searchParams, fetchBlogs]);

  useEffect(() => {
    if (debouncedSearch !== (searchParams.get('search') || '')) {
       updateSearchParams({ search: debouncedSearch }, true);
    }
  }, [debouncedSearch, searchParams, updateSearchParams]);

  const handleSearchChange = (event) => setSearch(event.currentTarget.value);

  const handleCategoryChange = (slug) => {
     updateSearchParams({ category: slug === "all" ? null : slug }, true);
     setIsCategoryOpen(false);
  };

   const handleSortChange = (e) => {
     const value = e.target.value;
     updateSearchParams({ sort: value || 'latest' }, true);
   };

  const handlePageChange = (newPage) => {
     if (newPage >= 1 && newPage <= totalPages) {
       updateSearchParams({ page: newPage.toString() }, false);
       window.scrollTo({ top: 400, behavior: 'smooth' });
     }
  };

  const activeCategoryName = categories.find(c => c.slug === selectedCategory)?.name || "All Categories";

  const renderPagination = () => {
    if (blogs.length === 0) return null; 

    const pages = [];
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
            <button 
                className={styles.pageBtn} 
                disabled={activePage === 1} 
                onClick={() => handlePageChange(1)}
                title="Halaman Pertama"
            >
                <IconChevronsLeft size={16} />
            </button>
            <button 
                className={styles.pageBtn} 
                disabled={activePage === 1} 
                onClick={() => handlePageChange(activePage - 1)}
                title="Halaman Sebelumnya"
            >
                <IconChevronLeft size={16} />
            </button>
            
            {pages}
            
            <button 
                className={styles.pageBtn} 
                disabled={activePage === totalPages} 
                onClick={() => handlePageChange(activePage + 1)}
                title="Halaman Berikutnya"
            >
                <IconChevronRight size={16} />
            </button>
            <button 
                className={styles.pageBtn} 
                disabled={activePage === totalPages} 
                onClick={() => handlePageChange(totalPages)}
                title="Halaman Terakhir"
            >
                <IconChevronsRight size={16} />
            </button>
        </div>
    );
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.bannerContainer}>
        <div 
          className={styles.bannerImage} 
          style={{ backgroundImage: `url(${bannerImageUrl})` }}
        >
          <div className={styles.bannerOverlay}></div>
          <div className={styles.bannerContent}>
            
            <div className={`${styles.titleGroup} ${styles.fadeInUp}`}>
              <IconNews size={48} className={styles.titleIcon} />
              <h1 className={styles.pageTitle}>News & Information</h1>
            </div>
            
            <p className={`${styles.pageSubtitle} ${styles.fadeInUp}`} style={{ animationDelay: '0.1s' }}>
              Temukan berita menarik & informatif dari PT Hutama Maju Sukses
            </p>
            
            <div className={`${styles.bannerSearchWrapper} ${styles.fadeInUp}`} style={{ animationDelay: '0.2s' }}>
              <IconSearch className={styles.bannerSearchIcon} size={18} />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={search}
                onChange={handleSearchChange}
                className={styles.bannerSearchInput}
              />
            </div>

          </div>
        </div>
      </div>
      
      <div className={styles.contentOverlap}>
        <SectionTemplate>
          <div className={styles.mainContainer}>
            
            <div className={`${styles.controlsSection} ${styles.fadeInUp}`} style={{ animationDelay: '0.3s' }}>
                
                <div className={styles.categoriesWrapper}>
                    {loadingCategories ? (
                        <div className={styles.skeletonTabsWrapper}>
                            <div className={styles.skeletonTab}></div>
                        </div>
                    ) : categoryError ? (
                        <span className={styles.errorText}>{categoryError}</span>
                    ) : (
                        <div className={styles.categoryDropdownContainer}>
                            <button 
                                className={styles.mobileCategoryBtn}
                                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <IconCategory size={18} />
                                    <span>{activeCategoryName}</span>
                                </div>
                                <IconChevronDown size={18} className={isCategoryOpen ? styles.rotateIcon : ''} />
                            </button>

                            <div className={`${styles.tabsList} ${isCategoryOpen ? styles.showMobileMenu : ''}`}>
                                <button 
                                    className={`${styles.tabBtn} ${!selectedCategory ? styles.activeTab : ''}`}
                                    onClick={() => handleCategoryChange("all")}
                                >
                                    All Categories
                                </button>
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        className={`${styles.tabBtn} ${selectedCategory === category.slug ? styles.activeTab : ''}`}
                                        onClick={() => handleCategoryChange(category.slug)}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.sortWrapper}>
                    <select 
                        value={sortBy} 
                        onChange={handleSortChange} 
                        className={styles.sortSelect}
                    >
                        {sortOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <IconChevronDown size={14} className={styles.selectIcon} />
                </div>
            </div>

            <div className={`${styles.gridSection} ${styles.fadeInUp}`} style={{ animationDelay: '0.4s' }}>
              
              {loadingBlogs && (
                <div className={styles.gridContainer}>
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <BlogSkeleton key={idx} />
                    ))}
                </div>
              )}

              {errorBlogs && !loadingBlogs && (
                <div className={styles.centerMessage}>
                  <p className={styles.errorText}>{errorBlogs}</p>
                </div>
              )}

              {!loadingBlogs && !errorBlogs && blogs.length > 0 && (
                <div className={styles.gridContainer}>
                  {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              )}

              {!loadingBlogs && !errorBlogs && blogs.length === 0 && (
                <div className={styles.centerMessage}>
                  <p className={styles.dimmedText}>
                    {debouncedSearch || selectedCategory ? 'Tidak ada post yang cocok.' : 'Belum ada post.'}
                  </p>
                </div>
              )}
            </div>

            {!loadingBlogs && !errorBlogs && (
              <div className={`${styles.paginationContainer} ${styles.fadeInUp}`} style={{ animationDelay: '0.5s' }}>
                  {renderPagination()}
              </div>
            )}

          </div>
        </SectionTemplate>
      </div>
    </div>
  );
}