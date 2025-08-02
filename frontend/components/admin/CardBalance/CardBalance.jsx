import React from 'react';
import styles from './CardBalance.module.css';

export const CardBalance = ({
    title,
    subtitle,
    amount,
    change,
    icon,
    dataItems = [],
    backgroundColor = '#2563eb',
}) => {
    return (
        <div className={styles.card} style={{ backgroundColor }}>
            <div className={styles.body}>
                <div className={styles.header}>
                    <div className={styles.icon}>{icon}</div>
                    <div className={styles.textGroup}>
                        <span className={styles.title}>{title}</span>
                        <span className={styles.subtitle}>{subtitle}</span>
                    </div>
                </div>

                <div className={styles.mainStats}>
                    <span className={styles.amount}>{amount}</span>
                    <span className={styles.change}>{change}</span>
                </div>

                <div className={styles.footer}>
                    {dataItems.map((item, idx) => (
                        <div key={idx} className={styles.dataItem}>
                            <span
                                className={styles.iconLabel}
                                style={{ color: item.iconColor || '#22c55e' }}
                            >
                                {item.icon}
                            </span>
                            <span className={styles.dataLabel}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
