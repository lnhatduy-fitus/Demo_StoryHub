import React from 'react';
import styles from './register.module.css'; 

export const metadata = {
  title: 'Đăng ký - MangaNest',
  description: 'Tạo tài khoản mới để đọc manga miễn phí',
};

export default function RegisterLayout({ children }) {
  return (
    <div className={styles['login-page-wrapper']}>
      {children}
    </div>
  );
}
