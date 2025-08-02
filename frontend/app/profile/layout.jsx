import styles from "./profile.module.css";
import Link from "next/link";

export default function ProfileLayout({ children }) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Pd</div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <a
                href="/home"
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "inherit",
                  textDecoration: "none",
                  paddingLeft: 16,
                }}
              >
                <i
                  className="fa-solid fa-house"
                  style={{
                    color: "#ffffff",
                    fontSize: 24,
                    marginRight: 15,
                  }}
                ></i>
                Trang chủ
              </a>
            </li>
            <li>
              <a
                href="/profile"
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "inherit",
                  textDecoration: "none",
                  paddingLeft: 16,
                }}
              >
                <i
                  className="fa-solid fa-pen-to-square"
                  style={{
                    color: "#ffffff",
                    fontSize: 24,
                    marginRight: 15,
                  }}
                ></i>
                Chỉnh sửa
              </a>
            </li>
            <li>
            <Link
              href="/profile/reset"
              style={{
                display: "flex",
                color: "inherit",
                textDecoration: "none",
                paddingLeft: 16,
              }}
            >
              <i
                className="fa-solid fa-lock"
                style={{
                  color: "#ffffff",
                  fontSize: 24,
                  marginRight: 15,
                }}
              ></i>
              Đổi mật khẩu
            </Link>
          </li>
          <li>
            <Link
              href="/profile/history"
              style={{
                display: "flex",
                alignItems: "center",
                color: "inherit",
                textDecoration: "none",
                paddingLeft: 16,
              }}
            >
              <i
                className="fa-solid fa-clock-rotate-left"
                style={{
                  color: "#ffffff",
                  fontSize: 24,
                  marginRight: 15,
                }}
              ></i>
              Lịch sử
            </Link>
            </li>
            <li>
              <Link
                href="/profile/favorites"
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "inherit",
                  textDecoration: "none",
                  paddingLeft: 16,
                }}
              >
                <i
                  className="fa-solid fa-heart"
                  style={{
                    color: "#ffffff",
                    fontSize: 24,
                    marginRight: 15,
                  }}
                ></i>
                Yêu thích
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
