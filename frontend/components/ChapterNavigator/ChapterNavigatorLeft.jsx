'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ChapterNavigatorLeft.module.css'

export default function ChapterNavigatorLeft({ comicId, chapterId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePrevChapter = async () => {
    setLoading(true);
    let newChapterId = chapterId - 1;

    while (newChapterId >= 1) {
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
        console.error("Error fetching chapter:", err);
      }

      newChapterId--;
    }

    alert("Không còn chương trước!");
    setLoading(false);
  };

  return (
    
        <button className={styles.backButton} onClick={handlePrevChapter} disabled={loading}>
            <i className="fa-solid fa-chevron-left"></i>
        </button>

  );
}
