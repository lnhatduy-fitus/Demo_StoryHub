'use client';
import styles from './upload.module.css'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Upload() {

    const router = useRouter();
    const [userData, setUserData] = useState({
        stats: {
            hot: 0,
            likes: 0,
            comments: 0
        },
        comics: []
    });

    useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comic/uploaded`, {
          method: "GET",
          credentials: 'include',
          cache: 'default'
        });

        if (res.ok) {
          const data = await res.json();
          setUserData(prev => ({
            ...prev,
            comics: data || [],
          }));
        } else {
          alert("Fetch failed:", res.status);
        }
      } catch (err) {
        alert("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);


  
    return (
        <>

            <section className={styles.stats}>
                <div><strong>Độ hot</strong><p>{userData.stats.hot}</p></div>
                <div><strong>Số like</strong><p>{userData.stats.likes}</p></div>
                <div><strong>Bình luận</strong><p>{userData.stats.comments}</p></div>
            </section>

            <section className={styles.drafts}>
                <div className={styles.tabs}>
                    <span className={styles.active}>Truyện tranh của tôi ({userData.comics.length})</span>
                </div>
                {userData.comics.map((comic, idx) => (
                    <div className={styles.storyCard} key={idx}>
                        <h3>
                            <span
                                className={styles.comicTitle}
                                style={{ cursor: 'pointer', color: '#18080853' }}
                                onClick={() => router.push(`/upload/${comic.comic_id}/details`)}
                            >
                                {comic.title}
                            </span>
                            <span className={styles.reviewing}>{comic.status}</span>
                        </h3>
                        <p>Thời gian cập nhật mới: {comic.updatedAt || comic.updated_at}</p>
                        <p>Thời gian tạo: {comic.createdAt || comic.created_at}</p>
                    </div>
                ))}
                <button className={styles.createBtn} onClick={() => router.push("/upload/create")}>
                    <i className="fas fa-plus-circle"></i> Tạo truyện tranh
                </button>
            </section>

            <section className={styles.contract}>
                <p>Bạn muốn kiếm thêm nhiều thu nhập?</p>
                <button className={styles.contractBtn} onClick={() => router.push('/upload/contract')}>
                    <i className="fas fa-file-signature"></i> Xin ký hợp đồng
                </button>
            </section>

        </>
    )

}