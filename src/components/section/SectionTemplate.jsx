// components/Section/SectionTemplate.jsx
import React from 'react';
import styles from './SectionTemplate.module.css';

export default function SectionTemplate({ 
  children, 
  backgroundColor = '#ffffff',
  className = '',
  fullWidth = false
}) {
  return (
    <section 
      className={`${styles.section} ${className}`}
      style={{ backgroundColor }}
    >
      <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''}`}>
        {children}
      </div>
    </section>
  );
}