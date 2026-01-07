import React from 'react';
import styles from './AboutPage.module.css';
import AboutSectionA from '../components/about/AboutSectionA';
import AboutSectionB from '../components/about/AboutSectionB';
import AboutSectionC from '../components/about/AboutSectionC';
import AboutSectionD from '../components/about/AboutSectionD';
import AboutSectionE from '../components/about/AboutSectionE';

export default function AboutPage() {
  return (
    <div className={styles.pageWrapper}>
      
      <div className={`${styles.ornament} ${styles.orbTopRight}`}></div>

      <svg className={`${styles.ornament} ${styles.dotsLeft}`} width="140" height="300" viewBox="0 0 140 300" fill="none">
        <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2.5" fill="#023E8A" fillOpacity="0.25" />
        </pattern>
        <rect width="140" height="300" fill="url(#dotPattern)" />
      </svg>

      <svg className={`${styles.ornament} ${styles.shapeRightMiddle}`} width="120" height="450" viewBox="0 0 120 450" fill="none">
        <path d="M120 0 C 20 120, 20 350, 120 450" stroke="#FFDF01" strokeWidth="6" fill="none" strokeOpacity="0.6" />
        <path d="M140 50 C 60 150, 60 300, 140 400" stroke="#023E8A" strokeWidth="3" fill="none" strokeOpacity="0.3" />
      </svg>

      <svg className={`${styles.ornament} ${styles.shapeBottomRight}`} width="350" height="350" viewBox="0 0 350 350" fill="none">
        <circle cx="350" cy="350" r="220" stroke="#1C7EBA" strokeWidth="50" strokeOpacity="0.1" />
        <circle cx="350" cy="350" r="150" stroke="#023E8A" strokeWidth="25" strokeOpacity="0.1" />
      </svg>

      <div className={styles.contentContainer}>
        <AboutSectionA />
        <AboutSectionB />
        <AboutSectionC />
        <AboutSectionD />
        <AboutSectionE />
      </div>
    </div>
  );
}