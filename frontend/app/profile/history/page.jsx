"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./history.module.css";

const initialHistory = [
  {
    id: 1,
    title: "One Piece",
    lastChapter: "Chapter 1085",
    lastRead: "02/07/2025",
    cover: "/onepiece.jpg",
    slug: "one-piece",
  },
  {
    id: 2,
    title: "Doraemon",
    lastChapter: "Chapter 150",
    lastRead: "01/07/2025",
    cover: "/doraemon.jpg",
    slug: "doraemon",
  },
  {
    id: 3,
    title: "Naruto",
    lastChapter: "Chapter 700",
    lastRead: "29/06/2025",
    cover: "/naruto.jpg",
    slug: "naruto",
  },
];

export default function HistoryPage() {
  const [history, setHistory] = useState(initialHistory);
  const router = useRouter();

  const handleDelete = (id) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  const handleContinueReading = (slug) => {
    router.push(`/truyen/${slug}`);
  };

  return (
    <div className={styles.profileInfo}>
      <h2 className={styles.readingTitle}>Lịch sử đọc</h2>
      <div className={styles.readingList}>
        {history.map((item) => (
          <div key={item.id} className={styles.readingItem}>
            <div className={styles.readingLeft}>
              <img
                src={item.cover}
                alt={item.title}
                className={styles.readingCover}
              />
              <div>
                <h4 className={styles.readingName}>{item.title}</h4>
                <p className={styles.readingMeta}>Chương cuối đọc: {item.lastChapter}</p>
                <p className={styles.readingMeta}>Lần xem gần nhất: {item.lastRead}</p>
              </div>
            </div>
            <div className={styles.readingActions}>
              <button
                onClick={() => handleContinueReading(item.slug)}
                className={styles.readingContinue}
              >
                Tiếp tục đọc
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className={styles.readingDelete}
              >
                Xoá lịch sử
              </button>
            </div>
          </div>
        ))}
        {history.length === 0 && (
          <p className={styles.readingEmpty}>Bạn chưa có lịch sử đọc nào.</p>
        )}
      </div>
    </div>
  );
}
