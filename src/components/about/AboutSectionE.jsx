// sections/about/AboutSectionE.jsx
import React, { useRef, useEffect, useState } from 'react';
import styles from './AboutSectionE.module.css';
import SectionTemplate from '../../components/section/SectionTemplate';

// Icon component untuk location
const LocationIcon = () => (
  <svg className={styles.icon} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Icon component untuk clock
const ClockIcon = () => (
  <svg className={styles.icon} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function AboutSectionE() {
  const contentRef = useRef(null);
  const imageContainerRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const updateHeights = () => {
      if (contentRef.current) {
        const height = contentRef.current.offsetHeight;
        setContentHeight(height);
        
        // Set tinggi image container sesuai dengan content height
        if (imageContainerRef.current) {
          imageContainerRef.current.style.height = `${height}px`;
        }
      }
    };

    // Update heights setelah render
    setTimeout(updateHeights, 100);
    window.addEventListener('resize', updateHeights);

    return () => {
      window.removeEventListener('resize', updateHeights);
    };
  }, []);

  return (
    <SectionTemplate>
      <div className={styles.sectionContent}>
        <div className={styles.container}>
          <div className={styles.gridLayout}>
            {/* Kiri: Gambar Map */}
            <div className={styles.imageColumn}>
              <div 
                className={styles.imageContainer} 
                ref={imageContainerRef}
                style={{ height: contentHeight > 0 ? `${contentHeight}px` : 'auto' }}
              >
                <img 
                  src="/AboutMap.png" 
                  alt="Company Location Map" 
                  className={styles.mapImage}
                />
              </div>
            </div>

            {/* Kanan: Location & Operational Hours */}
            <div className={styles.contentColumn} ref={contentRef}>
              <div className={styles.contentWrapper}>
                <div className={styles.titleWrapper}>
                  <h2 className={styles.title}>Location & Operational Hours</h2>
                  <div className={styles.goldDash}></div>
                </div>

                <div className={styles.infoContainer}>
                  {/* Location Section */}
                  <div className={styles.infoSection}>
                    <div className={styles.infoItem}>
                      <LocationIcon />
                      <div className={styles.infoContent}>
                        <p className={styles.addressText}>
                          Green Sedayu Bizzpark DM 16/77, Jl. Daan Mogot Km. 18, Jakarta Barat DKI Jakarta 11840
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Operational Hours Section */}
                  <div className={styles.infoSection}>
                    <div className={styles.infoItem}>
                      <ClockIcon />
                      <div className={styles.infoContent}>
                        <div className={styles.hoursWrapper}>
                          <div className={styles.hoursItem}>
                            <span className={styles.dayText}>Senin - Sabtu</span>
                            <span className={styles.hoursText}>09:00 - 18:00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionTemplate>
  );
}