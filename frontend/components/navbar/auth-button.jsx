'use client';

import { useRouter } from 'next/navigation';
import styles from './auth-button.module.css';

const AuthButtons = ({ isLoggedIn }) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
    router.refresh();
  };

  const handleRegister = () => {
    router.push('/register');
    router.refresh();
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logout`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    });

    if (res.ok) {
      // router.push('/home');
      // router.push('login');
      router.refresh();
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <div className={styles.container}>
          <button className={styles.btn} onClick={handleLogout}>
            Log out
          </button> 
        </div>

      ) : (
        <div className={styles.container}>
          <button className={styles.btn} onClick={handleLogin}>
            Log in
          </button>
          <button className={styles.btn} onClick={handleRegister}>
            Register
          </button>
	 <button className={styles.btn} onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
    </>
  );
};

export default AuthButtons;
