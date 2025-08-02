"use client";

import styles from "./favorite.module.css";
import Image from "next/image"; 

const favorites = [
  {
    id: 1,
    title: "One Piece",
    image: "/covers/onepiece.jpg",
  },
  {
    id: 2,
    title: "Naruto",
    image: "/covers/naruto.jpg",
  },
  {
    id: 3,
    title: "Attack on Titan",
    image: "/covers/aot.jpg",
  },
];

export default function FavoritesPage() {
  const handleDelete = (title) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa "${title}" khỏi danh sách yêu thích?`)) {
      alert(`Đã xóa "${title}" khỏi danh sách yêu thích!`);
    }
  };

  return (
    <div className={styles.profileInfo}>
      <div className={styles.header}>
        <h2>Manga yêu thích</h2>
      </div>
      <div className={styles.favoriteList}>
        {favorites.map((item) => (
          <div key={item.id} className={styles.favoriteItem}>
            <div className={styles.favoriteInfo}>
              <Image
                src={item.image}
                alt={item.title}
                width={60}
                height={90}
                className={styles.cover}
              />
              <span className={styles.title}>{item.title}</span>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(item.title)}
            >
              Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
