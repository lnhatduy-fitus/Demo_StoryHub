'use client';

import styles from './reading-err.module.css';
import Link from 'next/link';

export default function ErrorDisplay({
  title = 'Error',
  subtitle = '',
  message = 'Something went wrong.',
  icon = 'fa-solid fa-triangle-exclamation',
  showRefresh = true,
  homeHref = '/',
  customButtons = null,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.bug_icon}>
          <i className={`${icon} ${styles.icon}`}></i>
        </div>

        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        <h3 className={styles.reasonLabel}>Reason:</h3>
        <p className={styles.reason}>{message}</p>

        <div className={styles.buttonGroup}>
          {homeHref && (
            <Link href={homeHref} className={`${styles.btn} ${styles.homeBtn}`}>
              🏠 Return Home
            </Link>
          )}

          {showRefresh && (
            <button
              className={`${styles.btn} ${styles.refreshBtn}`}
              onClick={() => window.location.reload()}
            >
              🔄 Refresh
            </button>
          )}

          {customButtons}
        </div>
      </div>
    </div>
  );
}
