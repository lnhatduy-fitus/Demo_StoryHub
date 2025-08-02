import styles from './upload.module.css';
import Footer from '@/components/footer/footer';
import Link from "next/link";

async function getUser() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/profile`, {
            method: 'GET',
            credentials: 'include',
            cache: 'default'
        });

        if (res.ok) {
            return await res.json();
        }
        return null;

    } catch (err) {
        return null;
    }
}

export default async function UploadLayout({ children }) {

    const userData = await getUser() || {
        name: 'Guest',
        id: '000',
        avt: "../../default_user.jpg"
    }

    return (
        <>
            <div className={styles.container}>
                {/* SIDEBAR */}
                <aside className={styles.sidebar}>
                    <div className={styles.logo}>
                        <img src="/Story_Hub_White.png" alt="Logo" className={styles.logoImg} />
                    </div>
                    <Link href="/upload/create" className={styles.submitBtn}>
                        <i className="fas fa-paper-plane"></i> Gửi bản thảo
                    </Link>
                    <nav>
                        <ul className={styles.navList}>
                            <li className={styles.navItem}>
                                <Link href="/upload">
                                    <i className="fas fa-book"></i> Bản thảo của tôi
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link href="/upload">
                                    <i className="fas fa-info-circle"></i> Chi tiết
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link href="/uploading/comment">
                                    <i className="fas fa-comments"></i> Bình luận
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link href="/uploading/contract">
                                    <i className="fas fa-file-signature"></i> Ký hợp đồng
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* MAIN CONTENT */}
                <div className={styles.rightContent}>
                    <header className={styles.topbar}>
                        <p>
                            <Link href="/" className={styles.breadcrumbLink}>Trang chủ</Link> /{" "}
                            <Link href="/uploading/uploading_page1" className={styles.breadcrumbLink}>Bản thảo của tôi</Link>
                        </p>
                        <div className={styles["user-account"]}>
                            <img src={userData.avt} alt="avatar" className={styles["user-avatar"]} />
                            <Link href="/profile" className={styles["user-name"]}>
                                {userData.name}
                            </Link>
                            <span className={styles["user-id"]}>#{userData.id}</span>
                        </div>
                    </header>

                    <main className={styles.mainContent}>
                        {children}
                    </main>
                </div>
            </div>

            <Footer />
        </>
    )

}