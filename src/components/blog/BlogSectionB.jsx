"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import styles from './BlogSectionB.module.css';
import SectionTemplate from '../section/SectionTemplate';
import BlogCard from '../BlogCard/BlogCard';
import { 
  IconSearch, 
  IconChevronDown, 
  IconChevronLeft, 
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight
} from '@tabler/icons-react';

const sortOptions = [
  { value: 'latest', label: 'Terbaru' },
  { value: 'oldest', label: 'Terlama' },
  { value: 'name_asc', label: 'Judul A-Z' },
  { value: 'name_desc', label: 'Judul Z-A' },
];

const POSTS_PER_PAGE = 9;

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

export default function BlogSectionB() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorBlogs, setErrorBlogs] = useState(null);
  const [categoryError, setCategoryError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [activePage, setActivePage] = useState(parseInt(searchParams.get('page') || '1', 10));
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'latest');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || null);

  const debouncedSearch = useDebounce(search, 500);

  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [blogsFrom, setBlogsFrom] = useState(0);
  const [blogsTo, setBlogsTo] = useState(0);

  const sectionRef = useRef(null);

  useEffect(() => {
    setLoadingCategories(true);
    setCategoryError(null);
    apiClient.get('/blog-categories')
      .then(response => {
        setCategories(response.data.data || []);
      })
      .catch(err => {
        setCategoryError("Gagal memuat kategori.");
        setCategories([]);
      })
      .finally(() => {
        setLoadingCategories(false);
      });
  }, []);

  const fetchBlogs = (params) => {
    setLoadingBlogs(true);
    setErrorBlogs(null);
    
    const validParams = { limit: POSTS_PER_PAGE };
    if (params.page > 1) validParams.page = params.page;
    if (params.search) validParams.search = params.search;
    if (params.category_slug) validParams.category_slug = params.category_slug;
    if (params.sort && params.sort !== 'latest') validParams.sort = params.sort;
    
    if (params.sort === 'oldest') {
        validParams.sort = 'created_at,asc'; 
    } else if (params.sort === 'latest') {
        delete validParams.sort;
    }

    apiClient.get('/blogs', { params: validParams })
      .then(response => {
        setBlogs(response.data.data || []);
        const meta = response.data.meta || {};
        
        setTotalPages(meta.last_page || 1);
        setTotalBlogs(meta.total || 0);
        setBlogsFrom(meta.from || 0);
        setBlogsTo(meta.to || 0);
        
        const currentPageFromApi = meta.current_page || 1;
        if(currentPageFromApi !== activePage) {
           setActivePage(currentPageFromApi);
        }
      })
      .catch(err => {
        setErrorBlogs("Gagal memuat blog.");
        setBlogs([]);
        setTotalPages(1);
        setTotalBlogs(0);
        setActivePage(1);
      })
      .finally(() => {
        setLoadingBlogs(false);
      });
  };

  const updateSearchParams = (newParams, resetPage = true) => {
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
  };

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const searchVal = searchParams.get('search') || '';
    const category = searchParams.get('category') || null;
    const sort = searchParams.get('sort') || 'latest';

    setActivePage(page);
    setSearch(searchVal);
    setSelectedCategory(category);
    setSortBy(sort);

    fetchBlogs({
        page: page,
        search: searchVal || undefined,
        category_slug: category || undefined,
        sort: sort || undefined,
    });
  }, [searchParams]);

  useEffect(() => {
    if (debouncedSearch !== (searchParams.get('search') || '')) {
       updateSearchParams({ search: debouncedSearch }, true);
    }
  }, [debouncedSearch]);

  const handleSearchChange = (event) => {
     setSearch(event.currentTarget.value);
  };

  const handleCategoryChange = (slug) => {
     updateSearchParams({ category: slug === "all" ? null : slug }, true);
  };

   const handleSortChange = (e) => {
     const value = e.target.value;
     updateSearchParams({ sort: value || 'latest' }, true);
   };

  const handlePageChange = (newPage) => {
     if (newPage >= 1 && newPage <= totalPages) {
       updateSearchParams({ page: newPage.toString() }, false);
       window.scrollTo({ top: 0, behavior: 'smooth' });
     }
  };

  const blogCountDisplay = useMemo(() => {
    if (loadingBlogs) {
      return <div className={styles.loadingCount}></div>;
    }
    if (errorBlogs || (totalBlogs === 0 && !loadingBlogs)) {
      return <div className={styles.dimmedText}>Tidak ada post ditemukan</div>;
    }
    return (
      <div className={styles.dimmedText}>
        {`Menampilkan ${blogsFrom}-${blogsTo} dari ${totalBlogs} post`}
      </div>
    );
  }, [loadingBlogs, blogsFrom, blogsTo, totalBlogs, errorBlogs]);

  const renderPagination = () => {
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
    <SectionTemplate>
      <div className={styles.container} ref={sectionRef}>
        
        <div className={styles.searchWrapper}>
          <IconSearch className={styles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="Cari artikel..."
            value={search}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.sectionBlock}>
          <h4 className={styles.sectionTitle}>Kategori</h4>
          {loadingCategories ? (
            <div className={styles.skeletonCategory}></div>
          ) : categoryError ? (
            <div className={styles.errorText}>{categoryError}</div>
          ) : (
            <div className={styles.tabsWrapper}>
              <div className={styles.tabsList}>
                <button 
                  className={`${styles.tabBtn} ${!selectedCategory ? styles.activeTab : ''}`}
                  onClick={() => handleCategoryChange("all")}
                >
                  Semua Kategori
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

        <div className={styles.controlsWrapper}>
          {blogCountDisplay}
          
          <div className={styles.selectWrapper}>
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

        <div className={styles.gridContainerWrapper}>
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

        {!loadingBlogs && !errorBlogs && totalPages > 1 && renderPagination()}
      </div>
    </SectionTemplate>
  );
}