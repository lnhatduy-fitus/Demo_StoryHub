import React from 'react';
import styles from './login.module.css';

export const metadata = {
  title: 'MangaNest - Story Hub',
  description: 'Đọc manga online miễn phí',
}

export default function LoginLayout({ children }) {
  return (
    <div className={styles['login-page-wrapper']}>
      {children}
    </div>
  );
}