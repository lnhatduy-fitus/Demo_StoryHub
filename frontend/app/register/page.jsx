"use client";

import React, { useState } from 'react';
import styles from './register.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';

function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Reader'); // Thêm state cho vai trò

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, email, password, role })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Đăng ký thành công!");
      router.push('/login');
    } else {
      alert(data.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className={styles['login-container']}>
      <div
        className={styles.logo}
        style={{ marginBottom: '0px', cursor: 'pointer' }}
        onClick={() => router.push('/home')}
      >
        <img src="Story_Hub_White.png" height="150px" alt="Logo" />
      </div>

      <div className="mb-4" style={{ fontSize: '25px' }}>Đăng ký</div>

      <form onSubmit={handleRegister}>
        <label htmlFor="username" className={styles['form-label']}>Tên đăng nhập</label>
        <input
          type="text"
          id="username"
          className={`form-control ${styles['form-control']}`}
          placeholder="Nhập tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email" className={styles['form-label']}>Email</label>
        <input
          type="email"
          id="email"
          className={`form-control ${styles['form-control']}`}
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password" className={styles['form-label']}>Mật khẩu</label>
        <div className={`input-group ${styles['input-group']}`}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className={`form-control ${styles['form-control']}`}
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="input-group-text"
            style={{ cursor: 'pointer', padding: 0 }}
            onClick={() => setShowPassword(!showPassword)}
          >
            <img
              src={showPassword ? '/hide_show icon/hide.png' : '/hide_show icon/show.png'}
              alt="Ẩn/Hiện mật khẩu"
              style={{ width: '30px', height: '30px', padding: '4px' }}
            />
          </span>
        </div>

        <label htmlFor="confirmPassword" className={styles['form-label']}>Xác nhận mật khẩu</label>
        <div className={`input-group ${styles['input-group']}`}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            className={`form-control ${styles['form-control']}`}
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className="input-group-text"
            style={{ cursor: 'pointer', padding: 0 }}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <img
              src={showConfirmPassword ? '/hide_show icon/hide.png' : '/hide_show icon/show.png'}
              alt="Ẩn/Hiện mật khẩu xác nhận"
              style={{ width: '30px', height: '30px', padding: '4px' }}
            />
          </span>
        </div>

        <label htmlFor="role" className={styles['form-label']}>Chọn vai trò</label>
        <select
          id="role"
          className={`form-select ${styles['form-control']}`}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Reader">Người đọc (Reader)</option>
          <option value="Uploader">Tác giả (Author)</option>
        </select>


        <button type="submit" className={`btn ${styles['btn-login']}`}>Đăng ký</button>
      </form>
    </div>
  );
}

export default Register;
