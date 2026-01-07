"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import styles from './BlogDetailSectionB.module.css';

const MAX_RELATED_POSTS = 4;

export default function BlogDetailSectionB({ categorySlug, currentBlogSlug }) {
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch (e) {
      return dateString;
    }
  };

  useEffect(() => {
    if (!categorySlug) {
      setLoading(false);
      return;
    }

    setLoading(true);
    apiClient.get('/blogs', {
      params: {
        category_slug: categorySlug,
        limit: MAX_RELATED_POSTS + 1
      }
    })
      .then(response => {
        const allBlogs = response.data.data || [];
        const filtered = allBlogs
          .filter(p => p.slug !== currentBlogSlug)
          .slice(0, MAX_RELATED_POSTS);
          
        setRelatedBlogs(filtered);
      })
      .catch(error => {
        console.error("Error fetching related blogs:", error);
        setRelatedBlogs([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categorySlug, currentBlogSlug]); 

  
  if (loading) {
     return (
        <div className={styles.sectionWrapper}>
          <div className={styles.titleWrapper}>
             <div className={styles.skeleton} style={{ height: 30, width: 200, marginBottom: '1rem' }}></div>
          </div>
           <div className={styles.blogGrid}>
              <div className={styles.skeleton} style={{ height: 280 }}></div>
              <div className={styles.skeleton} style={{ height: 280 }}></div>
              <div className={styles.skeleton} style={{ height: 280 }}></div>
              <div className={styles.skeleton} style={{ height: 280 }}></div>
           </div>
        </div>
     );
  }

  if (relatedBlogs.length === 0) {
    return null;
  }

  return (
    <section className={styles.sectionWrapper}>
      <div className={`${styles.titleWrapper} ${styles.fadeInUp}`}>
        <h3 className={styles.title}>
          Related News
        </h3>
        <span className={styles.line}></span>
      </div>

      <div
        className={`${styles.blogGrid} ${styles.fadeInUp}`}
        style={{ animationDelay: '0.2s' }} 
      >
        {relatedBlogs.map(blog => (
          <Link
            key={blog.id}
            to={`/blogs/${blog.slug}`}
            className={styles.relatedCard}
          >
            <div className={styles.cardImageWrapper}>
              <img
                src={blog.main_image_url}
                alt={blog.title}
                className={styles.cardImage} 
                onError={(e) => e.currentTarget.src = 'https://placehold.co/300x160/E0E0E0/BDBDBD?text=News'}
              />
            </div>
            
            <div className={styles.cardContent}>
               <div className={styles.cardTextWrapper}>
                 <h4 className={styles.cardTitle}>
                  {blog.title}
                 </h4>
               </div>
               <p className={styles.cardDate}>
                 {blog.created_date || formatDate(blog.created_at)}
               </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}