import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import styles from './HomeSectionD.module.css';
import { IconListCheck, IconCalendar } from '@tabler/icons-react';
import SectionTemplate from '../../components/section/SectionTemplate';

export default function HomeSectionD() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch (e) {
      return dateString;
    }
  };

  const fetchActivities = () => {
    setLoading(true);
    apiClient.get('/blogs', {
      params: {
        category_slug: 'activities',
        sort: '-created_at',
        limit: 10
      }
    })
      .then(response => {
        setActivities(response.data.data || []);
      })
      .catch(error => {
        console.error("Error fetching activities:", error.response || error.message || error);
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
    fetchActivities();
  }, []);

  const loopedActivities = [...activities, ...activities];

  return (
    <SectionTemplate>
      <div 
        ref={sectionRef} 
        className={`${styles.sectionContent} ${isVisible ? styles.visible : ''}`}
      >
        <div className={styles.titleWrapper}>
          <span className={styles.line}></span>
          <IconListCheck size={32} className={styles.icon} />
          <h2 className={styles.title}>
            Our Activities
          </h2>
          <span className={styles.line}></span>
        </div>

        <div className={styles.scrollBox}>
          {loading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.loadingSpinner}></div>
            </div>
          )}

          {!loading && activities.length > 0 && (
            <div className={styles.scrollContainer}>
              <div className={styles.scrollContent}>
                {loopedActivities.map((activity, index) => (
                  <Link
                    to={`/blogs/${activity.slug}`}
                    key={`${activity.id}-${index}`}
                    className={styles.cardLink}
                  >
                    <div className={styles.activityCard}>
                      <img
                        src={activity.main_image_url}
                        alt={activity.title}
                        className={styles.cardImage}
                        onError={(e) => {
                          e.target.src = "https://placehold.co/300x400/E0E0E0/BDBDBD?text=Activity";
                        }}
                      />
                      <div className={styles.cardOverlay}></div>
                      <div className={styles.textWrapper}>
                        <h3 className={styles.cardTitle}>
                          {activity.title}
                        </h3>
                        <div className={styles.cardDateWrapper}>
                          <IconCalendar size={14} stroke={1.5} />
                          <span>
                            {activity.created_date || formatDate(activity.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!loading && activities.length === 0 && (
            <div className={styles.emptyState}>
              Tidak ada aktivitas ditemukan.
            </div>
          )}
        </div>
      </div>
    </SectionTemplate>
  );
}