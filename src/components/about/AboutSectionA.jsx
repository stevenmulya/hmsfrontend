// sections/about/AboutSectionA.jsx
import React from 'react';
import styles from './AboutSectionA.module.css';
import SectionTemplate from '../../components/section/SectionTemplate';

// Icon component
const TargetIcon = () => (
  <svg className={styles.icon} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export default function AboutSectionA() {
  return (
    <SectionTemplate>
      <div className={styles.sectionContent}>
        {/* Hero Image Section */}
        <div 
          className={styles.heroImage}
          style={{
            backgroundImage: `url('/AboutHeroOne.jpg')`
          }}
        >
          {/* Kosong, hanya untuk background image */}
        </div>
        
        {/* Vision Box Section - dipisah dari image */}
        <div className={styles.visionContainer}>
          <div className={styles.visionBox}>
            <div className={styles.titleWrapper}>
              <div className={styles.titleContainer}>
                <TargetIcon />
                <h2 className={styles.visionTitle}>OUR VISION</h2>
              </div>
              <div className={styles.dashContainer}>
                <div className={styles.goldDash}></div>
              </div>
            </div>
            <div className={styles.visionContent}>
              <p className={styles.visionText}>
                Memperluas usaha di bidang material konstruksi dan manufaktur 
                seperti besi, baja, logam lainnya. Menjalin kerjasama dengan 
                perusahaan lainnya yang bergerak di bidang yang sama serta 
                melakukan kompetisi secara sportif.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionTemplate>
  );
}