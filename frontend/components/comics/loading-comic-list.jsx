import React from 'react';
import styles from './loading-comic-list.module.css';

const LoadingComicList = () => {
  const placeholders = Array.from({ length: 6 });

  return (
    <div className={styles.panel}>
      {placeholders.map((_, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.image} />
          <div className={styles.title} />
          <div className={styles.detail} />
        </div>
      ))}
    </div>
  );
};

export default LoadingComicList;
