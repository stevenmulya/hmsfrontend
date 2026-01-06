import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogCard.module.css';

const BlogCard = ({ 
  blog, 
  className = '', 
  style = {}
}) => {
  const {
    slug,
    title,
    main_image_url,
    created_date,
    created_at
  } = blog;

  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch (e) {
      return dateString;
    }
  };

  const displayDate = created_date || formatDate(created_at);

  return (
    <Link 
      to={`/blogs/${slug}`} 
      className={`${styles.cardLink} ${className}`}
      style={style}
    >
      <div className={styles.blogCard}>
        <div className={styles.cardImageContainer}>
          <img
            src={main_image_url}
            alt={title}
            className={styles.cardImage}
            onError={(e) => {
              e.target.src = "https://placehold.co/300x300/E0E0E0/BDBDBD?text=News";
            }}
          />
        </div>
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>
            {title}
          </h3>
          <p className={styles.cardDate}>
            {displayDate}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;