import React from 'react';
import styles from './AboutSectionA.module.css';
import SectionTemplate from '../../components/section/SectionTemplate';

const TargetIcon = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export default function AboutSectionA() {
  return (
    <SectionTemplate>
      <div className={styles.sectionContent}>
        <div 
          className={styles.heroImage}
          style={{
            backgroundImage: `url('/aboutpage-vision.jpg')`
          }}
        >
        </div>
        
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