import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import styles from './HomeSectionE.module.css';
import SectionTemplate from '../../components/section/SectionTemplate';
import PrimaryButton from '../../components/Button/PrimaryButton';
import BlogCard from '../../components/BlogCard/BlogCard';

const NewsIcon = () => (
  <svg className={styles.titleIcon} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#023E8A" strokeWidth="2">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
    <path d="M8 8l4 0" />
    <path d="M8 12l4 0" />
    <path d="M8 16l4 0" />
  </svg>
);

export default function HomeSectionE() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const fetchLatestBlogs = () => {
    setLoading(true);
    apiClient.get('/blogs', {
      params: {
        sort: '-created_at',
        limit: 8 
      }
    })
      .then(response => {
        setBlogs(response.data.data || []);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
    fetchLatestBlogs();
  }, []);

  return (
    <SectionTemplate>
      <div 
        ref={sectionRef} 
        className={`${styles.sectionContent} ${isVisible ? styles.visible : ''}`}
      >
        <div className={styles.containerStandard}>
          <div className={styles.titleWrapper}>
            <div className={styles.titleLeft}>
              <NewsIcon />
              <div className={styles.titleContainer}>
                <div className={styles.titleSection}>
                  <h2 className={styles.title}>News & Events</h2>
                  <div className={styles.buttonLineContainer}>
                    <Link to="/blog" className={styles.seeAllButton}>
                      Lihat Semua Berita
                    </Link>
                    <div className={styles.buttonLine}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.blogsScrollWrapper}>
          {loading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.loadingSpinner}></div>
            </div>
          )}

          {!loading && blogs.length > 0 && (
            <div className={styles.scrollContainer}>
              {blogs.map((blog, index) => (
                <div 
                  key={blog.id} 
                  className={styles.blogItemWrapper}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <BlogCard
                    blog={blog}
                    className={styles.blogCardItem}
                  />
                </div>
              ))}
              <div className={styles.spacerEnd}></div>
            </div>
          )}

          {!loading && blogs.length === 0 && (
            <div className={styles.emptyStateContainer}>
              <div className={styles.emptyState}>
                Tidak ada berita atau acara ditemukan.
              </div>
            </div>
          )}
        </div>

        <div className={styles.containerStandard}>
          <div className={styles.notFoundSection}>
            <h3 className={styles.notFoundText}>Ingin melihat berita dan acara lainnya?</h3>
            <PrimaryButton to="/blog">
              Lihat Semua Berita & Acara
            </PrimaryButton>
          </div>
        </div>
      </div>
    </SectionTemplate>
  );
}