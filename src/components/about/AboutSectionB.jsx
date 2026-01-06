// sections/about/AboutSectionB.jsx
import React from 'react';
import styles from './AboutSectionB.module.css';
import SectionTemplate from '../../components/section/SectionTemplate';

// Icon component
const MissionIcon = () => (
  <svg className={styles.icon} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
    <path d="M9 12l2 2l4 -4" />
    <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
  </svg>
);

export default function AboutSectionB() {
  return (
    <SectionTemplate>
      <div className={styles.sectionContent}>
        {/* Hero Image Section */}
        <div 
          className={styles.heroImage}
          style={{
            backgroundImage: `url('/AboutHeroTwo.jpg')`
          }}
        >
          {/* Kosong, hanya untuk background image */}
        </div>
        
        {/* Mission Box Section - dipisah dari image */}
        <div className={styles.missionContainer}>
          <div className={styles.missionBox}>
            <div className={styles.titleWrapper}>
              <div className={styles.titleContainer}>
                <MissionIcon />
                <h2 className={styles.missionTitle}>OUR MISSION</h2>
              </div>
              <div className={styles.dashContainer}>
                <div className={styles.goldDash}></div>
              </div>
            </div>
            <div className={styles.missionContent}>
              <div className={styles.missionList}>
                <div className={styles.missionItem}>
                  <div className={styles.missionNumber}>1.</div>
                  <p className={styles.missionText}>
                    Memenuhi kebutuhan pelanggan dengan selalu menyediakan Produk yang berkualitas Tinggi dan Anda.
                  </p>
                </div>
                <div className={styles.missionItem}>
                  <div className={styles.missionNumber}>2.</div>
                  <p className={styles.missionText}>
                    Memberikan layanan terbaik dengan memenuhi keinginan pelanggan guna menjaga hubungan baik.
                  </p>
                </div>
                <div className={styles.missionItem}>
                  <div className={styles.missionNumber}>3.</div>
                  <p className={styles.missionText}>
                    Meningkatkan kepercayaan pelanggan akan produk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionTemplate>
  );
}