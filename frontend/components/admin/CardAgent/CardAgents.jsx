import React from 'react';
import styles from './CardAgents.module.css';

const pictureUsers = [
  'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  'https://i.pravatar.cc/150?u=a04258114e29026702d',
  'https://i.pravatar.cc/150?u=a048581f4e29026701d',
  'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
];

const CardAgents = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerBox}>
            <span className={styles.star}><i className="fa-solid fa-star"></i></span>
            <h3 className={styles.title}>Agents</h3>
          </div>
        </div>

        <p className={styles.description}>
          Meet your agenda and see their ranks to get the best results
        </p>

        <div className={styles.avatarGroup}>
          {pictureUsers.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Agent ${index}`}
              className={styles.avatar}
            />
          ))}
          <div className={styles.more}>+12</div>
        </div>
      </div>
    </div>
  );
};

export default CardAgents;
