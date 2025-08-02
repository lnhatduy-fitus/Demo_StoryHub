"use client";

import React, { useState } from 'react';
import styles from './login.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';

function Login() {

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (e) => {

    e.preventDefault();



    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      if (data.isAdmin){
        router.push('/admin');
        router.refresh();
      }else{
        router.push('/home');
        router.refresh();
      }
    } else {
      alert(data.message || "Login fail")
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

      <div className="mb-4" style={{ fontSize: '25px' }}>Đăng nhập</div>

      <form onSubmit={handleLogin}>
        <label htmlFor="username" className={styles['form-label']}>Tên đăng nhập</label>
        <input
          type="text"
          id="username"
          className={`form-control ${styles['form-control']}`}
          placeholder="Nhập tên đăng nhập"
          value={username} onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password" className={styles['form-label']}>Mật khẩu</label>
        <div className={`input-group ${styles['input-group']}`}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className={`form-control ${styles['form-control']}`}
            placeholder="Nhập mật khẩu"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="input-group-text"
            style={{ cursor: 'pointer', padding: 0 }}
            onClick={() => setShowPassword(!showPassword)}
          >
            <img
              src={showPassword ? '/hide_show icon/hide.png' : '/hide_show icon/show.png'}
              alt="Toggle password visibility"
              style={{ width: '30px', height: '30px', padding: '4px' }}
            />
          </span>
        </div>


        <button type="submit" className={`btn ${styles['btn-login']}`}>Đăng nhập</button>

        <div className={`mt-2 ${styles['extra-links']}`}>
        <a href="/register">Tạo tài khoản</a>
        <a href="#">Quên mật khẩu?</a>
        </div>
      </form>

      <div className={styles.divider}>OR</div>

      <button className={`btn btn-light ${styles['auth-btn']}`}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/1880px-Google_Favicon_2025.svg.png" alt="Google" />
        Continue with Google
      </button>
      <button className={`btn btn-light ${styles['auth-btn']}`}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
        Continue with Apple
      </button>
    </div>
  );
}

export default Login;