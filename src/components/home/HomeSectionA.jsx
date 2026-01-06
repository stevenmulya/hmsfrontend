import React, { useState, useEffect, useCallback } from 'react';
import styles from './HomeSectionA.module.css';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import PrimaryButton from '../Button/PrimaryButton'; 

const slidesData = [
  {
    image: 'homeheroA.jpg',
    alt: 'Banner 1',
  },
  {
    image: 'homeheroB.jpg',
    alt: 'Banner 2',
  },
  {
    image: 'homeheroC.jpg',
    alt: 'Banner 3',
  },
  {
    image: 'homeheroD.jpg',
    alt: 'Banner 4',
  },
  {
    image: 'homeheroE.jpg',
    alt: 'Banner 5',
  }
];

export default function HomeSectionA() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const totalSlides = slidesData.length;
  const autoPlayInterval = 6000;

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), autoPlayInterval * 0.5);
  };

  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        handleNext();
      }, autoPlayInterval);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoPlaying, handleNext, autoPlayInterval]);

  return (
    <section 
      className={styles.fullScreenWrapper}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className={styles.sliderContainer}>
        {slidesData.map((slide, index) => (
          <div 
            key={index} 
            className={`${styles.slide} ${index === activeIndex ? styles.activeSlide : ''}`}
          >
            <div className={styles.imageWrapper}>
              <img
                src={slide.image}
                alt={slide.alt}
                className={styles.slideImage}
              />
            </div>
            <div className={styles.imageOverlay}></div>
          </div>
        ))}
      </div>

      <div className={styles.diagonalOverlay}></div>

      <div className={styles.contentBox}>
        <div className={styles.revealWrapper}>
          <h1 className={styles.title1}>Welcome to</h1>
        </div>
        <div className={styles.revealWrapper}>
          <h2 className={styles.title2}>
            PT HUTAMA MAJU SUKSES
          </h2>
        </div>
        <div className={styles.revealWrapper}>
          <div className={styles.btnContainer}>
            <PrimaryButton to="/about">
              Learn More
            </PrimaryButton>
          </div>
        </div>
      </div>

      <button
        className={`${styles.navButton} ${styles.prevButton}`}
        onClick={handlePrev}
        aria-label="Previous Slide"
      >
        <IconChevronLeft size={24} />
      </button>
      
      <button
        className={`${styles.navButton} ${styles.nextButton}`}
        onClick={handleNext}
        aria-label="Next Slide"
      >
        <IconChevronRight size={24} />
      </button>

      <div className={styles.dotsContainer}>
        {slidesData.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}