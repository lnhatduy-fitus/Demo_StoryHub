// 📄 ChapterNavigatorRight.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ChapterNavigatorRight.module.css';

export default function ChapterNavigatorRight({ comicId, chapterId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNextChapter = async () => {
    setLoading(true);
    let newChapterId = Number(chapterId) + 1;

    while (true) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chapter/images?comicId=${comicId}&chapterId=${newChapterId}`, {
          method: 'GET',
          credentials: 'include',
          cache: 'no-store'
        });

        if (res.ok) {
          router.push(`/reading/${newChapterId}`);
          return;
        }
      } catch (err) {
        console.error("Error fetching next chapter:", err);
      }

      newChapterId++;

      // Giới hạn kiểm tra 100 chương để tránh vòng lặp vô hạn
      if (newChapterId - chapterId > 1000) {
        alert("Không còn chương tiếp theo!");
        break;
      }
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleNextChapter}
      disabled={loading}
      className={styles.nextButton}
    >
      <i className="fa-solid fa-chevron-right"></i>
    </button>
  );
}
