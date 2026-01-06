// sections/about/AboutSectionC.jsx
import React, { useRef, useEffect, useState } from 'react';
import styles from './AboutSectionC.module.css';
import SectionTemplate from '../../components/section/SectionTemplate';

// Icon component
const BuildingIcon = () => (
  <svg className={styles.icon} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
    <path d="M3 21l18 0" />
    <path d="M5 21v-14l7 -3v4" />
    <path d="M9 10l0 11" />
    <path d="M13 10l0 11" />
    <path d="M17 10l0 11" />
    <path d="M19 21l0 -10l-14 0l0 10" />
  </svg>
);

export default function AboutSectionC() {
  const contentRef = useRef(null);
  const imageColumnRef = useRef(null);
  const [imageHeight, setImageHeight] = useState(0);

  // Fungsi untuk menambahkan warna pada kata kunci dengan pengecualian
  const highlightKeywords = (text, paragraphNumber) => {
    // Kata kunci yang di-highlight
    const keywords = paragraphNumber <= 2 ? 
      ['pembangunan', 'konstruksi', 'tepat waktu', 'harga yang kompetitif'] :
      ['pembangunan', 'tepat waktu', 'harga yang kompetitif']; // Konstruksi di paragraf 3-4 tidak dihighlight
    
    return text.split(/(pembangunan|konstruksi|tepat waktu|harga yang kompetitif)/gi).map((part, index) => {
      const lowerPart = part.toLowerCase();
      if (keywords.some(keyword => lowerPart.includes(keyword))) {
        return <span key={index} className={styles.highlighted}>{part}</span>;
      }
      return part;
    });
  };

  useEffect(() => {
    const updateImageHeight = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.offsetHeight;
        // Tinggi setiap image = (tinggi konten - gap) / 2
        const calculatedHeight = (contentHeight - 30) / 2;
        setImageHeight(calculatedHeight);
        
        // Update height image column
        if (imageColumnRef.current) {
          imageColumnRef.current.style.height = `${contentHeight}px`;
        }
      }
    };

    // Gunakan setTimeout untuk memastikan DOM sudah di-render
    setTimeout(updateImageHeight, 100);
    window.addEventListener('resize', updateImageHeight);

    return () => {
      window.removeEventListener('resize', updateImageHeight);
    };
  }, []);

  return (
    <SectionTemplate>
      <div className={styles.sectionContent}>
        <div className={styles.container}>
          <div className={styles.gridLayout}>
            {/* Kiri: Dua Image Stack - 40% */}
            <div className={styles.imageColumn} ref={imageColumnRef}>
              <div 
                className={styles.imageContainer}
                style={{ height: `${imageHeight}px` }}
              >
                <div 
                  className={styles.imageTop}
                  style={{
                    backgroundImage: `url('/AboutHeroThree.jpg')`
                  }}
                />
              </div>
              <div 
                className={styles.imageContainer}
                style={{ height: `${imageHeight}px` }}
              >
                <div 
                  className={styles.imageBottom}
                  style={{
                    backgroundImage: `url('/AboutHeroFour.jpg')`
                  }}
                />
              </div>
            </div>

            {/* Kanan: Company Profile - 60% */}
            <div className={styles.contentColumn} ref={contentRef}>
              <div className={styles.contentWrapper}>
                <div className={styles.titleWrapper}>
                  <div className={styles.titleContainer}>
                    <BuildingIcon />
                    <h2 className={styles.profileTitle}>COMPANY PROFILE</h2>
                  </div>
                  <div className={styles.dashContainer}>
                    <div className={styles.goldDash}></div>
                  </div>
                </div>

                <div className={styles.descriptionContainer}>
                  <p className={styles.descriptionText}>
                    {highlightKeywords("Mengikuti perkembangan dunia bisnis saat ini yang semakin pesat dan kompetitif, PT.HUTAMA MAJU SUKSES fokus bergerak maju di bidang pengadaan material untuk pembangunan dan konstruksi.", 1)}
                  </p>
                  
                  <p className={styles.descriptionText}>
                    {highlightKeywords("Menunjang perusahaan-perusahaan sebagai rekanan dalam bidang pengadaan material konstruksi dan manufaktur, memberikan jasa pengiriman barang secara tepat waktu dan harga yang kompetitif.", 2)}
                  </p>
                  
                  <p className={styles.descriptionText}>
                    {highlightKeywords("Mengikuti perkembangan dunia bisnis saat ini yang semakin pesat dan kompetitif, PT.HUTAMA MAJU SUKSES fokus bergerak maju di bidang pengadaan material untuk pembangunan dan konstruksi.", 3)}
                  </p>
                  
                  <p className={styles.descriptionText}>
                    {highlightKeywords("Menunjang perusahaan-perusahaan sebagai rekanan dalam bidang pengadaan material konstruksi dan manufaktur, memberikan jasa pengiriman barang secara tepat waktu dan harga yang kompetitif.", 4)}
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