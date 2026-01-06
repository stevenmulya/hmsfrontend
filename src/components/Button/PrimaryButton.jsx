// components/Button/PrimaryButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PrimaryButton.module.css';

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default function PrimaryButton({ 
  children, 
  to, 
  onClick, 
  type = 'button',
  fullWidth = false,
  className = '',
  ...props 
}) {
  const buttonClass = `${styles.primaryButton} ${fullWidth ? styles.fullWidth : ''} ${className}`;
  
  if (to) {
    return (
      <Link 
        to={to} 
        className={buttonClass}
        {...props}
      >
        <span>{children}</span>
        <ArrowIcon />
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
      {...props}
    >
      <span>{children}</span>
      <ArrowIcon />
    </button>
  );
}