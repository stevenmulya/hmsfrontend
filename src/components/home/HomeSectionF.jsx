import React, { useState, useEffect, useRef } from 'react';
import apiClient from '../../api/apiClient';
import styles from './HomeSectionF.module.css';
import SectionTemplate from '../../components/section/SectionTemplate';

export default function HomeSectionF() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const fetchPartners = () => {
    setLoading(true);
    apiClient.get('/partners', { params: { limit: 10 } }) 
      .then(response => {
        setPartners(response.data.data || []);
      })
      .catch(error => {
        console.error(error);
        setPartners([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <SectionTemplate>
      <div 
        ref={sectionRef} 
        className={`${styles.sectionContent} ${isVisible ? styles.visible : ''}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.titleWrapper}>
            <div className={styles.titleCenter}>
              <div className={styles.line}></div>
              <div className={styles.titleWithIcon}>
                <svg className={styles.titleIcon} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#023E8A" strokeWidth="2">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
                  <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M17 10h2a2 2 0 0 1 2 2v1" />
                  <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
                </svg>
                <h2 className={styles.title}>Our Partners</h2>
              </div>
              <div className={styles.line}></div>
            </div>
          </div>

          <div className={styles.partnersContainer}>
            {loading && (
              <div className={styles.loadingOverlay}>
                <div className={styles.loadingSpinner}></div>
              </div>
            )}

            {!loading && partners.length > 0 && (
              <div className={styles.logoFitContainer}>
                {partners.map((partner, index) => (
                  <div 
                    key={partner.id} 
                    className={styles.partnerLogoWrapper}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      className={styles.partnerLogo}
                      onError={(e) => {
                        e.target.src = "https://placehold.co/180x100/E0E0E0/BDBDBD?text=Logo";
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {!loading && partners.length === 0 && (
              <div className={styles.emptyState}>
                No partners found.
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionTemplate>
  );
}