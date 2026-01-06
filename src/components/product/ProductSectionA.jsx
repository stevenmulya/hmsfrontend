import React from 'react';
import styles from './ProductSectionA.module.css';
import SectionTemplate from '../section/SectionTemplate';

export default function ProductSectionA(props) {
  const {
    title = "We Construct Your Success",
    subtitle = "Providing all kinds of construction services.",
    offerText = "Dapatkan Lebih Banyak Penawaran Menarik"
  } = props;

  const titleParts = title.split(" ");
  const lastWord = titleParts.pop();
  const firstPart = titleParts.join(" ");

  const offerParts = offerText.split(" ");
  const firstThreeWords = offerParts.slice(0, 3).join(" ");
  const lastTwoWords = offerParts.slice(3).join(" ");

  return (
    <SectionTemplate> 
      <div className={styles.bannerWrapper}>
        <div className={styles.blueBorder}></div>
        <div className={styles.yellowBorder}></div>
        
        <div className={styles.bannerContainer}>
          <div className={styles.textContent}>
            <h1 className={`${styles.bannerTitle} ${styles.animateFadeIn} ${styles.delay1}`} aria-label={title}>
              <span className={styles.allYellowText}>{firstPart}{" "}</span>
              <span className={`${styles.highlightWord} ${styles.allYellowText}`}>{lastWord}</span>
            </h1>
            <p className={`${styles.bannerSubtitle} ${styles.animateFadeIn} ${styles.delay2}`}>
              {subtitle}
            </p>
            
            <div className={`${styles.ornamentContainer} ${styles.animateFadeIn} ${styles.delay3}`}>
              <div className={styles.ornamentLine}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <span key={i} className={styles.slash}>/</span>
                ))}
              </div>
              <div className={styles.ornamentLine}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <span key={`row2-${i}`} className={styles.slash}>/</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className={`${styles.whiteTrapezoid} ${styles.animateSlideIn}`}>
          <div className={styles.yellowSlantBorder}></div>
          <div className={styles.trapezoidText}>
            <span className={styles.offerFirstPart}>{firstThreeWords}</span>{" "}
            <span className={styles.offerLastPart}>{lastTwoWords}</span>
            <span className={styles.exclamation}>!</span>
          </div>
        </div>
      </div>
    </SectionTemplate>
  );
}