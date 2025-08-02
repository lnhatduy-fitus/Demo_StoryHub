'use client';
import styles from './reading-err.module.css';
import Link from 'next/link';

export default function ReadingErr({ mess }) {

    const { message } = mess;
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.bug_icon}>
                    <i className={`fa-solid fa-bug ${styles.icon}`}></i>
                </div>

                <h1 className={styles.title}>Loading Error</h1>
                <p className={styles.subtitle}>Something went wrong while loading.</p>

                <h3 className={styles.reasonLabel}>Reason:</h3>
                <p className={styles.reason}>{message}</p>
                <div className={styles.buttonGroup}>
                    <Link href="/home" className={`${styles.btn} ${styles.homeBtn}`}>
                        🏠 Return Home
                    </Link>
                    <button className={`${styles.btn} ${styles.refreshBtn}`} onClick={() => window.location.reload()}>
                        🔄 Refresh
                    </button>                    
                </div>
            </div>
        </div>
    );

}