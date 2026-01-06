import React, { useEffect, useRef, useState } from 'react';
import styles from './HomeSectionB.module.css';
import { IconThumbUp } from '@tabler/icons-react';
import SectionTemplate from '../section/SectionTemplate';

export default function HomeSectionB() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.sectionWrapper} ref={sectionRef}>
      {/* ORNAMENT MOVED HERE: Outside SectionTemplate to touch screen edge */}
      <div className={`${styles.svgOrnamentWrapper} ${isVisible ? styles.visible : ''}`}>
        <svg className={styles.svgOrnament} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="thinFadeRed" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F11A29" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#F11A29" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#F11A29" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="thinFadeYellow" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEC909" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#FEC909" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FEC909" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="thinFadeBlue" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1C7EBA" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#1C7EBA" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#1C7EBA" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <path className={styles.ornamentPath} d="M400 120 C 280 160, 80 320, 20 400 L 35 400 C 90 330, 300 180, 400 145 Z" fill="url(#thinFadeBlue)" />
          <path className={styles.ornamentPath} d="M400 155 C 290 190, 100 340, 50 400 L 65 400 C 110 350, 310 210, 400 180 Z" fill="url(#thinFadeYellow)" />
          <path className={styles.ornamentPath} d="M400 190 C 300 220, 120 360, 80 400 L 95 400 C 130 370, 320 240, 400 215 Z" fill="url(#thinFadeRed)" />
        </svg>
      </div>

      <SectionTemplate>
        <div className={`${styles.sectionContent} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.titleWrapper}>
            <span className={styles.line}></span>
            <IconThumbUp size={32} className={styles.icon} />
            <h2 className={styles.title}>Why Choose Us?</h2>
            <span className={styles.line}></span>
          </div>
          
          <div className={styles.cardGrid}>
            <div className={styles.card} style={{ transitionDelay: '0.1s' }}>
              <img src="/CUSTOMER-SERVICE.png" alt="Customer Service" className={styles.cardImage} />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>CUSTOMER SERVICE</h3>
                <div className={styles.cardSeparator}></div> 
                <p className={styles.cardDescription}>
                  Our customer service is ready to help find solutions for your needs
                </p>
              </div>
            </div>

            <div className={styles.card} style={{ transitionDelay: '0.3s' }}>
              <img src="/SHIPMENT-CARGO.png" alt="Cargo Shipment" className={styles.cardImage} />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>CARGO SHIPMENT</h3>
                <div className={styles.cardSeparator}></div>
                <p className={styles.cardDescription}>
                  To fulfill large quantity shipments. We also provide delivery to various regions.
                </p>
              </div>
            </div>

            <div className={styles.card} style={{ transitionDelay: '0.5s' }}>
              <img src="/FAST-CHEAP-AND-GUARANTEED-DELIVERY.png" alt="Fast, Cheap, and Guaranteed Delivery" className={styles.cardImage} />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>FAST, CHEAP, AND GUARANTEED DELIVERY</h3>
                <div className={styles.cardSeparator}></div>
                <p className={styles.cardDescription}>
                  Faster delivery by using our company's private delivery service
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionTemplate>
    </div>
  );
}